import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { sendContactFormEmail } from '@/lib/integrations/nodemailer';
import { rateLimitContact } from '@/lib/api/rate-limit';

const CONTACT_SERVICE_KEYS = [
  'businessOperationalAssessment',
  'operationalExcellenceFoundation',
  'governanceIntelligenceProgram',
  'analyticsVisualizationSuite',
  'enterpriseOpsCommandCenter',
  'fractionalCBO',
] as const;

const INTERESTED_IN_KEYS = [
  'process-excellence',
  'fundraise',
  'franchise',
  'tools',
  'general-inquiry',
] as const;

const HEARD_ABOUT_KEYS = [
  'search',
  'referral',
  'linkedin',
  'advertisement',
  'other',
] as const;

const contactBodySchema = z.object({
  name: z.string().min(1, 'Name is required').max(200).transform((s) => s.trim()),
  email: z.string().min(1, 'Email is required').email('Invalid email').max(320).transform((s) => s.trim().toLowerCase()),
  phone: z.string().max(50).optional().nullable().transform((v) => (v == null || v === '' ? undefined : String(v).trim())),
  company: z.string().max(200).optional().nullable().transform((v) => (v == null || v === '' ? undefined : String(v).trim())),
  service: z.enum(CONTACT_SERVICE_KEYS).optional().nullable(),
  interested_in: z.array(z.enum(INTERESTED_IN_KEYS)).optional().default([]),
  heard_about_us: z.enum(HEARD_ABOUT_KEYS).optional().nullable(),
  message: z.string().min(1, 'Message is required').max(10000).transform((s) => s.trim()),
});

export async function POST(request: NextRequest) {
  try {
    const limit = rateLimitContact(request);
    if (!limit.ok) {
      const retryAfter = Math.ceil((limit.resetAt - Date.now()) / 1000);
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429, headers: { 'Retry-After': String(retryAfter) } }
      );
    }
    const raw = await request.json();
    const parseResult = contactBodySchema.safeParse(raw);
    if (!parseResult.success) {
      const first = parseResult.error.flatten().fieldErrors;
      const message = first.name?.[0] ?? first.email?.[0] ?? first.message?.[0] ?? 'Validation failed';
      return NextResponse.json({ error: message }, { status: 400 });
    }
    const { name, email, phone, company, service, interested_in, heard_about_us, message } = parseResult.data;

    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        phone: phone ?? null,
        company: company ?? null,
        service: service ?? null,
        interestedIn: interested_in.length > 0 ? interested_in : null,
        heardAboutUs: heard_about_us ?? null,
        message,
      },
    });

    const adminEmail =
      process.env.CONTACT_EMAIL ||
      process.env.EMAIL_FROM ||
      process.env.SMTP_USER;
    if (adminEmail) {
      await sendContactFormEmail(
        {
          name: contact.name,
          email: contact.email,
          phone: contact.phone ?? undefined,
          company: contact.company ?? undefined,
          service: contact.service ?? undefined,
          interestedIn: (contact.interestedIn as string[] | null) ?? undefined,
          heardAboutUs: contact.heardAboutUs ?? undefined,
          message: contact.message,
        },
        { adminEmail, sendConfirmationToUser: true }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully',
    });
  } catch (error) {
    console.error('[Contact API] Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to submit contact form',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
