import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { sendContactFormEmail } from '@/lib/integrations/nodemailer';

const CONTACT_SERVICE_KEYS = [
  'businessOperationalAssessment',
  'operationalExcellenceFoundation',
  'governanceIntelligenceProgram',
  'analyticsVisualizationSuite',
  'enterpriseOpsCommandCenter',
  'fractionalCBO',
] as const;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, company, service, message } = body;

    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }
    if (!email || typeof email !== 'string' || !email.trim()) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }
    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const serviceValue =
      service && CONTACT_SERVICE_KEYS.includes(service as (typeof CONTACT_SERVICE_KEYS)[number])
        ? (service as string)
        : null;

    const contact = await prisma.contact.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone != null ? String(phone).trim() || null : null,
        company: company != null ? String(company).trim() || null : null,
        service: serviceValue,
        message: message.trim(),
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
