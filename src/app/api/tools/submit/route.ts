import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { toolSubmissionBodySchema, firstValidationError } from '@/lib/api/calculator-schemas';
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
    const parseResult = toolSubmissionBodySchema.safeParse(raw);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: firstValidationError(parseResult.error) },
        { status: 400 }
      );
    }
    const { toolSlug, input, result, userInfo } = parseResult.data;

    await prisma.toolSubmission.create({
      data: {
        toolSlug,
        input: input as object,
        result: result as object,
        email: userInfo?.email ?? null,
        name: userInfo?.name ?? null,
        companyName: userInfo?.companyName ?? null,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Tool submission error:', error);
    return NextResponse.json(
      {
        error: 'Failed to save submission',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
