import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

/**
 * GET /api/newsletter/unsubscribe?token=xxx
 * One-click unsubscribe (GDPR/DPDP: withdraw consent). Token is set when subscription is confirmed.
 */
export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token');
  if (!token || token.length < 32) {
    return NextResponse.redirect(
      new URL('/consulting/resources?newsletter=unsubscribed_invalid', request.nextUrl.origin)
    );
  }

  try {
    const subscription = await prisma.newsletterSubscription.findFirst({
      where: { unsubscribeToken: token, status: 'confirmed' },
    });

    if (!subscription) {
      return NextResponse.redirect(
        new URL('/consulting/resources?newsletter=unsubscribed_already', request.nextUrl.origin)
      );
    }

    await prisma.newsletterSubscription.update({
      where: { id: subscription.id },
      data: { status: 'unsubscribed', unsubscribeToken: null },
    });

    return NextResponse.redirect(
      new URL('/consulting/resources?newsletter=unsubscribed', request.nextUrl.origin)
    );
  } catch (error) {
    console.error('[Newsletter unsubscribe] Error:', error);
    return NextResponse.redirect(
      new URL('/consulting/resources?newsletter=unsubscribed_error', request.nextUrl.origin)
    );
  }
}
