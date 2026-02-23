import { NextRequest, NextResponse } from 'next/server';
import { calculateBreakEven, type BreakEvenInput } from '@/lib/calculators/breakeven';
import { prisma } from '@/lib/db';
import { generateCalculatorPDFBuffer } from '@/lib/pdf-generator';
import { sendCalculatorReportEmail } from '@/lib/integrations/nodemailer';
import { breakevenBodySchema, firstValidationError } from '@/lib/api/calculator-schemas';
import { rateLimitCalculator } from '@/lib/api/rate-limit';

export async function POST(request: NextRequest) {
  try {
    const limit = rateLimitCalculator(request);
    if (!limit.ok) {
      const retryAfter = Math.ceil((limit.resetAt - Date.now()) / 1000);
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429, headers: { 'Retry-After': String(retryAfter) } });
    }
    const raw = await request.json();
    const parseResult = breakevenBodySchema.safeParse(raw);
    if (!parseResult.success) {
      return NextResponse.json({ error: firstValidationError(parseResult.error) }, { status: 400 });
    }
    const { input, userInfo } = parseResult.data;

    const result = calculateBreakEven(input as BreakEvenInput);

    try {
      let userId: string | null = null;
      if (userInfo?.email) {
        const user = await prisma.user.upsert({
          where: { email: userInfo.email },
          update: {},
          create: { email: userInfo.email, name: userInfo.name || 'Anonymous' },
        });
        userId = user.id;
      }

      const session = await prisma.assessmentSession.create({
        data: {
          userId: userId || undefined,
          calculatorType: 'breakeven',
          status: 'completed',
          overallScore: result.netROI,
          completedAt: new Date(),
          sessionData: { input, result } as any,
        },
      });

      const sessionId = session.id;

      // Send email with report and PDF attachment (async, don't wait)
      if (userInfo?.email && sessionId) {
        const reportUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/consulting/tools/breakeven`;
        
        // Generate PDF and send via email
        generateCalculatorPDFBuffer('Break-Even Point Calculator', result, userInfo)
          .then((pdfBuffer) => {
            return sendCalculatorReportEmail(
              userInfo.email!,
              'Break-Even Point Calculator',
              reportUrl,
              userInfo.name,
              pdfBuffer
            );
          })
          .then((emailSent) => {
            if (emailSent) {
              console.log('[Breakeven] Email sent successfully to:', userInfo.email);
            } else {
              console.error('[Breakeven] Failed to send email to:', userInfo.email);
            }
          })
          .catch((error) => {
            console.error('[Breakeven] Email send error:', error);
          });
      }

      return NextResponse.json({ success: true, result, sessionId });
    } catch (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json({ success: true, result });
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process calculator', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

