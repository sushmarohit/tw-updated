import { NextRequest, NextResponse } from 'next/server';
import { calculateCostLeakage, type CostLeakageInput } from '@/lib/calculators/cost-leakage';
import { prisma } from '@/lib/db';
import { upsertHubSpotContact } from '@/lib/integrations/hubspot';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { input, userInfo } = body;

    if (!input) {
      return NextResponse.json({ error: 'Invalid input provided' }, { status: 400 });
    }

    const result = calculateCostLeakage(input as CostLeakageInput);

    // Save to database
    try {
      let userId: string | null = null;
      if (userInfo?.email) {
        const user = await prisma.user.upsert({
          where: { email: userInfo.email },
          update: { name: userInfo.name || undefined },
          create: { email: userInfo.email, name: userInfo.name || 'Anonymous' },
        });
        userId = user.id;
      }

      const session = await prisma.assessmentSession.create({
        data: {
          userId: userId || undefined,
          calculatorType: 'cost_leakage',
          status: 'completed',
          overallScore: result.annualLeakage,
          completedAt: new Date(),
          sessionData: { input, result } as any,
        },
      });

      // Sync to HubSpot
      if (userInfo?.email) {
        upsertHubSpotContact({
          email: userInfo.email,
          firstName: userInfo.name?.split(' ')[0],
          company: userInfo.companyName,
        }).catch(console.error);
      }

      return NextResponse.json({ success: true, result, sessionId: session.id });
    } catch (dbError) {
      console.error('Database error:', dbError);
      // Return result even if DB save fails
      return NextResponse.json({ success: true, result });
    }
  } catch (error) {
    console.error('Calculator API error:', error);
    return NextResponse.json(
      { error: 'Failed to process calculator', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

