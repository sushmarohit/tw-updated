import { NextRequest, NextResponse } from 'next/server';
import { calculateHealthScore, type UserAnswer } from '@/lib/calculators/operational-health';
import { prisma } from '@/lib/db';
import { upsertHubSpotContact } from '@/lib/integrations/hubspot';
import { sendCalculatorReportEmail } from '@/lib/integrations/nodemailer';
import { generateCalculatorPDFBuffer } from '@/lib/pdf-generator';
import { operationalHealthBodySchema, firstValidationError } from '@/lib/api/calculator-schemas';
import { rateLimitCalculator } from '@/lib/api/rate-limit';

export async function POST(request: NextRequest) {
  try {
    const limit = rateLimitCalculator(request);
    if (!limit.ok) {
      const retryAfter = Math.ceil((limit.resetAt - Date.now()) / 1000);
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429, headers: { 'Retry-After': String(retryAfter) } }
      );
    }
    const raw = await request.json();
    const parseResult = operationalHealthBodySchema.safeParse(raw);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: firstValidationError(parseResult.error) },
        { status: 400 }
      );
    }
    const { answers, userInfo } = parseResult.data;

    const result = calculateHealthScore(answers as UserAnswer[]);

    // Save to database
    let sessionId: string | null = null;
    let userId: string | null = null;

    try {
      // Create or find user
      if (userInfo?.email) {
        const user = await prisma.user.upsert({
          where: { email: userInfo.email },
          update: {
            name: userInfo.name || undefined,
            phone: userInfo.phone || undefined,
            companyName: userInfo.companyName || undefined,
            companySize: userInfo.companySize || undefined,
            industry: userInfo.industry || undefined,
          },
          create: {
            email: userInfo.email,
            name: userInfo.name || 'Anonymous',
            phone: userInfo.phone,
            companyName: userInfo.companyName,
            companySize: userInfo.companySize,
            industry: userInfo.industry,
          },
        });
        userId = user.id;
      }

      // Create assessment session
      const session = await prisma.assessmentSession.create({
        data: {
          userId: userId || undefined,
          calculatorType: 'operational_health',
          status: 'completed',
          overallScore: result.overallScore,
          completedAt: new Date(),
          sessionData: {
            answers,
            result,
          } as any,
        },
      });
      sessionId = session.id;

      // Save index scores
      await Promise.all(
        result.indexScores.map((indexScore) =>
          prisma.indexScore.create({
            data: {
              sessionId: session.id,
              g2pIndex: indexScore.index,
              score: indexScore.score,
              classification: indexScore.classification,
            },
          })
        )
      );

      // Save user responses
      await Promise.all(
        answers.map((answer: UserAnswer & { questionId: string }) =>
          prisma.userResponse.create({
            data: {
              sessionId: session.id,
              questionId: answer.questionId,
              score: answer.score,
            },
          })
        )
      );
    } catch (dbError) {
      console.error('Database error:', dbError);
      // Continue even if DB save fails
    }

    // Sync to HubSpot (async, don't wait)
    if (userInfo?.email) {
      upsertHubSpotContact({
        email: userInfo.email,
        firstName: userInfo.name?.split(' ')[0],
        lastName: userInfo.name?.split(' ').slice(1).join(' '),
        phone: userInfo.phone,
        company: userInfo.companyName,
      }).catch((error) => {
        console.error('HubSpot sync error:', error);
      });
    }

    // Send PDF report to user's email when they click "Get Full Report" (async, don't wait)
    if (userInfo?.email) {
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || '';
      const reportUrl = sessionId
        ? `${baseUrl}/consulting/tools/health-check/report/${sessionId}`
        : `${baseUrl}/consulting/tools/health-check`;

      generateCalculatorPDFBuffer('Operational Health Diagnostic', result, userInfo)
        .then((pdfBuffer) =>
          sendCalculatorReportEmail(
            userInfo.email!,
            'Operational Health Diagnostic',
            reportUrl,
            userInfo.name,
            pdfBuffer
          )
        )
        .catch((error) => {
          console.error('Operational health report email error:', error);
        });
    }

    return NextResponse.json({
      success: true,
      result,
      sessionId,
    });
  } catch (error) {
    console.error('Calculator API error:', error);
    return NextResponse.json(
      {
        error: 'Failed to process calculator results',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

