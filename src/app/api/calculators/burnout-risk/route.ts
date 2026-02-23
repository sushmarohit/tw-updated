import { NextRequest, NextResponse } from 'next/server';
import { calculateBurnoutRisk, type BurnoutRiskInput } from '@/lib/calculators/burnout-risk';
import { prisma } from '@/lib/db';
import { burnoutRiskBodySchema, firstValidationError } from '@/lib/api/calculator-schemas';
import { rateLimitCalculator } from '@/lib/api/rate-limit';

export async function POST(request: NextRequest) {
  try {
    const limit = rateLimitCalculator(request);
    if (!limit.ok) {
      const retryAfter = Math.ceil((limit.resetAt - Date.now()) / 1000);
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429, headers: { 'Retry-After': String(retryAfter) } });
    }
    const raw = await request.json();
    const parseResult = burnoutRiskBodySchema.safeParse(raw);
    if (!parseResult.success) {
      return NextResponse.json({ error: firstValidationError(parseResult.error) }, { status: 400 });
    }
    const { input, userInfo } = parseResult.data;

    const result = calculateBurnoutRisk(input as BurnoutRiskInput);

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

      await prisma.assessmentSession.create({
        data: {
          userId: userId || undefined,
          calculatorType: 'burnout_risk',
          status: 'completed',
          overallScore: result.riskScore,
          completedAt: new Date(),
          sessionData: { input, result } as any,
        },
      });

      return NextResponse.json({ success: true, result });
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

