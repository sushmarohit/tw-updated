import { NextRequest, NextResponse } from 'next/server';
import { calculateBurnoutRisk, type BurnoutRiskInput } from '@/lib/calculators/burnout-risk';
import { prisma } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { input, userInfo } = body;

    if (!input) {
      return NextResponse.json({ error: 'Invalid input provided' }, { status: 400 });
    }

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

