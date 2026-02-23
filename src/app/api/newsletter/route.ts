import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import crypto from 'crypto';
import { prisma } from '@/lib/db';
import { rateLimitNewsletter } from '@/lib/api/rate-limit';
import { sendNewsletterConfirmEmail } from '@/lib/integrations/nodemailer';

const subscribeBodySchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email')
    .max(320)
    .transform((s) => s.trim().toLowerCase()),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'You must consent to receive the newsletter.' }),
  }),
  source: z.string().max(50).optional().nullable(),
});

export async function POST(request: NextRequest) {
  try {
    const limit = rateLimitNewsletter(request);
    if (!limit.ok) {
      const retryAfter = Math.ceil((limit.resetAt - Date.now()) / 1000);
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429, headers: { 'Retry-After': String(retryAfter) } }
      );
    }

    const raw = await request.json();
    const parseResult = subscribeBodySchema.safeParse(raw);
    if (!parseResult.success) {
      const flat = parseResult.error.flatten().fieldErrors;
      const message =
        flat.email?.[0] ?? flat.consent?.[0] ?? parseResult.error.flatten().formErrors?.[0] ?? 'Validation failed';
      return NextResponse.json({ error: message }, { status: 400 });
    }

    const { email, consent, source } = parseResult.data;
    if (!consent) {
      return NextResponse.json({ error: 'Consent is required.' }, { status: 400 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://twelfthkey.com';
    const confirmToken = crypto.randomBytes(32).toString('hex');

    const existing = await prisma.newsletterSubscription.findUnique({ where: { email } });

    if (existing) {
      if (existing.status === 'confirmed') {
        return NextResponse.json(
          { success: true, message: 'You are already subscribed.' },
          { status: 200 }
        );
      }
      if (existing.status === 'unsubscribed') {
        return NextResponse.json(
          { error: 'This email was unsubscribed. Please contact us to re-subscribe.' },
          { status: 400 }
        );
      }
      // pending: update token and resend confirm
      await prisma.newsletterSubscription.update({
        where: { email },
        data: {
          confirmToken,
          consentedAt: new Date(),
          source: source ?? existing.source,
        },
      });
    } else {
      await prisma.newsletterSubscription.create({
        data: {
          email,
          status: 'pending',
          confirmToken,
          consentedAt: new Date(),
          source: source ?? null,
        },
      });
    }

    const confirmUrl = `${baseUrl}/api/newsletter/confirm?token=${confirmToken}`;
    const emailSent = await sendNewsletterConfirmEmail(email, confirmUrl);
    if (!emailSent) {
      console.error('[Newsletter API] Failed to send confirmation email to:', email);
    }

    return NextResponse.json({
      success: true,
      message: 'Please check your email to confirm your subscription.',
    });
  } catch (error) {
    console.error('[Newsletter API] Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to subscribe',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
