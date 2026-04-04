import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { sendResourceGateEmails } from '@/lib/integrations/nodemailer';
import { rateLimitResourceGate } from '@/lib/api/rate-limit';
import { RESOURCE_GATE_CHALLENGES, type ResourceGateChallengeValue } from '@/lib/resource-gate-challenges';
import {
  getResourceTemplateMeta,
  resolveResourceDownloadUrl,
  tryFetchGoogleSheetXlsx,
} from '@/lib/resource-downloads';

const challengeValues = RESOURCE_GATE_CHALLENGES.map((c) => c.value) as [ResourceGateChallengeValue, ...ResourceGateChallengeValue[]];

const bodySchema = z.object({
  firstName: z.string().min(1).max(200).transform((s) => s.trim()),
  email: z.string().min(1).email().max(320).transform((s) => s.trim().toLowerCase()),
  challenge: z.enum(challengeValues),
  templateCode: z.string().min(1).max(120),
  gateType: z.enum(['full_kit', 'section_download']),
  resourceType: z.string().min(1).max(80).default('business_case_kit'),
});

export async function POST(request: NextRequest) {
  try {
    const limit = rateLimitResourceGate(request);
    if (!limit.ok) {
      const retryAfter = Math.ceil((limit.resetAt - Date.now()) / 1000);
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429, headers: { 'Retry-After': String(retryAfter) } }
      );
    }

    const raw = await request.json();
    const parsed = bodySchema.safeParse(raw);
    if (!parsed.success) {
      const err = parsed.error.flatten().fieldErrors;
      const message =
        err.firstName?.[0] ?? err.email?.[0] ?? err.challenge?.[0] ?? err.templateCode?.[0] ?? 'Validation failed';
      return NextResponse.json({ error: message }, { status: 400 });
    }

    const { firstName, email, challenge, templateCode, gateType, resourceType } = parsed.data;
    const challengeLabel = RESOURCE_GATE_CHALLENGES.find((c) => c.value === challenge)?.label ?? challenge;
    const templateMeta = getResourceTemplateMeta(templateCode);
    const downloadUrl = resolveResourceDownloadUrl(templateCode);

    const xlsx =
      downloadUrl != null
        ? await tryFetchGoogleSheetXlsx(downloadUrl, templateMeta.attachmentFileBase)
        : null;

    const attachment =
      xlsx != null
        ? {
            filename: xlsx.filename,
            content: xlsx.buffer,
            contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          }
        : undefined;

    const message = [
      `[Resource gate — ${resourceType}]`,
      `Template: ${templateMeta.displayName} (${templateCode})`,
      `Gate type: ${gateType}`,
      `Primary challenge: ${challengeLabel}`,
      downloadUrl ? `Download URL: ${downloadUrl}` : 'Download URL: (not configured)',
    ].join('\n');

    await prisma.contact.create({
      data: {
        name: firstName,
        email,
        message,
      },
    });

    const adminEmail =
      process.env.CONTACT_EMAIL || process.env.EMAIL_FROM || process.env.SMTP_USER;
    if (adminEmail) {
      await sendResourceGateEmails(
        {
          firstName,
          email,
          challengeLabel,
          templateCode,
          gateType,
          resourceType,
          displayName: templateMeta.displayName,
          emailSubjectName: templateMeta.emailSubjectName,
          downloadUrl: downloadUrl ?? null,
          attachment,
        },
        { adminEmail, sendConfirmationToUser: true }
      );
    }


    return NextResponse.json({
      success: true,
      downloadUrl: downloadUrl ?? null,
    });
  } catch (error) {
    console.error('[Resource gate API] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit. Please try again.' },
      { status: 500 }
    );
  }
}
