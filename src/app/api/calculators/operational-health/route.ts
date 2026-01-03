import { NextRequest, NextResponse } from 'next/server';
import { calculateHealthScore, type UserAnswer } from '@/lib/calculators/operational-health';
import { prisma } from '@/lib/db';
import { upsertHubSpotContact } from '@/lib/integrations/hubspot';
import { sendCalculatorReportEmail } from '@/lib/integrations/sendgrid';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { answers, userInfo } = body;

    // Validate input
    if (!answers || !Array.isArray(answers) || answers.length === 0) {
      return NextResponse.json(
        { error: 'Invalid answers provided' },
        { status: 400 }
      );
    }

    // Calculate health score
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

    // Send email with report (async, don't wait)
    if (userInfo?.email && sessionId) {
      const reportUrl = `${process.env.NEXT_PUBLIC_APP_URL}/consulting/tools/health-check/report/${sessionId}`;
      sendCalculatorReportEmail(
        userInfo.email,
        'Operational Health Diagnostic',
        reportUrl,
        userInfo.name
      ).catch((error) => {
        console.error('Email send error:', error);
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

