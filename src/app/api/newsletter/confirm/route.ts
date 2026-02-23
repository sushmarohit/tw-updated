import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/db';
import { sendNewsletterWelcomeEmail } from '@/lib/integrations/nodemailer';

/**
 * GET /api/newsletter/confirm?token=xxx
 * Double opt-in: confirm subscription and send welcome email.
 */
export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token');
  if (!token || token.length < 32) {
    return NextResponse.redirect(
      new URL('/consulting/resources?newsletter=invalid', request.nextUrl.origin)
    );
  }

  try {
    const subscription = await prisma.newsletterSubscription.findFirst({
      where: { confirmToken: token, status: 'pending' },
    });

    if (!subscription) {
      return NextResponse.redirect(
        new URL('/consulting/resources?newsletter=already_confirmed_or_invalid', request.nextUrl.origin)
      );
    }

    const unsubscribeToken = crypto.randomBytes(32).toString('hex');
    await prisma.newsletterSubscription.update({
      where: { id: subscription.id },
      data: {
        status: 'confirmed',
        confirmToken: null,
        unsubscribeToken,
        confirmedAt: new Date(),
      },
    });

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://twelfthkey.com';
    const unsubscribeUrl = `${baseUrl}/api/newsletter/unsubscribe?token=${unsubscribeToken}`;
    sendNewsletterWelcomeEmail(subscription.email, unsubscribeUrl).catch((err) =>
      console.error('[Newsletter confirm] Welcome email error:', err)
    );

    return NextResponse.redirect(
      new URL('/consulting/resources?newsletter=confirmed', request.nextUrl.origin)
    );
  } catch (error) {
    console.error('[Newsletter confirm] Error:', error);
    return NextResponse.redirect(
      new URL('/consulting/resources?newsletter=error', request.nextUrl.origin)
    );
  }
}
