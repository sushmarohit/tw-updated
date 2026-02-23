import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { rateLimitBooking } from '@/lib/api/rate-limit';
import {
  sendBookingRequestNotification,
  sendBookingRequestReceivedConfirmation,
} from '@/lib/integrations/nodemailer';

const bookingBodySchema = z.object({
  name: z.string().min(1, 'Name is required').max(200).transform((s) => s.trim()),
  email: z.string().min(1, 'Email is required').email('Invalid email').max(320).transform((s) => s.trim().toLowerCase()),
  phone: z.string().max(50).optional().nullable().transform((v) => (v == null || v === '' ? undefined : String(v).trim())),
  company: z.string().max(200).optional().nullable().transform((v) => (v == null || v === '' ? undefined : String(v).trim())),
  preferred_date: z.string().max(100).optional().nullable().transform((v) => (v == null || v === '' ? undefined : String(v).trim())),
  preferred_time_slot: z.string().max(100).optional().nullable().transform((v) => (v == null || v === '' ? undefined : String(v).trim())),
  message: z.string().max(5000).optional().nullable().transform((v) => (v == null || v === '' ? undefined : String(v).trim())),
});

export async function POST(request: NextRequest) {
  try {
    const limit = rateLimitBooking(request);
    if (!limit.ok) {
      const retryAfter = Math.ceil((limit.resetAt - Date.now()) / 1000);
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429, headers: { 'Retry-After': String(retryAfter) } }
      );
    }

    const raw = await request.json();
    const parseResult = bookingBodySchema.safeParse(raw);
    if (!parseResult.success) {
      const flat = parseResult.error.flatten().fieldErrors;
      const message =
        flat.name?.[0] ?? flat.email?.[0] ?? parseResult.error.flatten().formErrors?.[0] ?? 'Validation failed';
      return NextResponse.json({ error: message }, { status: 400 });
    }

    const {
      name,
      email,
      phone,
      company,
      preferred_date,
      preferred_time_slot,
      message,
    } = parseResult.data;

    const booking = await prisma.bookingRequest.create({
      data: {
        name,
        email,
        phone: phone ?? null,
        company: company ?? null,
        preferredDate: preferred_date ?? null,
        preferredTimeSlot: preferred_time_slot ?? null,
        message: message ?? null,
        status: 'requested',
      },
    });

    const adminEmail =
      process.env.CONTACT_EMAIL ||
      process.env.EMAIL_FROM ||
      process.env.SMTP_USER;

    if (adminEmail) {
      await sendBookingRequestNotification(
        {
          name: booking.name,
          email: booking.email,
          phone: booking.phone ?? undefined,
          company: booking.company ?? undefined,
          preferredDate: booking.preferredDate ?? undefined,
          preferredTimeSlot: booking.preferredTimeSlot ?? undefined,
          message: booking.message ?? undefined,
        },
        adminEmail
      );
    }

    const sendConfirmationToUser = !!(
      process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASSWORD
    );
    if (sendConfirmationToUser) {
      const calendarLink = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_BOOKING_URL;
      sendBookingRequestReceivedConfirmation(email, name, calendarLink).catch((err) =>
        console.error('[Booking API] User confirmation email error:', err)
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Booking request submitted successfully',
      id: booking.id,
    });
  } catch (error) {
    console.error('[Booking API] Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to submit booking request',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
