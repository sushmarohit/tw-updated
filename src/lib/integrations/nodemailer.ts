/**
 * Nodemailer Email Integration
 * Sends transactional emails (calculator reports, booking confirmations) with attachment support
 */

import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  cc?: string | string[];
  subject: string;
  html: string;
  text?: string;
  from?: string;
  fromName?: string;
  attachments?: Array<{
    filename: string;
    content?: Buffer | string;
    path?: string;
    contentType?: string;
  }>;
}

/**
 * Create nodemailer transporter
 * Supports SMTP, Gmail, and other email services
 */
function createTransporter() {
  // Check if using SMTP configuration
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT;
  const smtpUser = process.env.SMTP_USER;
  const smtpPassword = process.env.SMTP_PASSWORD;
  const smtpSecure = process.env.SMTP_SECURE === 'true';

  // Check if using Gmail OAuth2
  const gmailClientId = process.env.GMAIL_CLIENT_ID;
  const gmailClientSecret = process.env.GMAIL_CLIENT_SECRET;
  const gmailRefreshToken = process.env.GMAIL_REFRESH_TOKEN;
  const gmailUser = process.env.GMAIL_USER;

  // Check if using Gmail App Password
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

  if (smtpHost && smtpPort && smtpUser && smtpPassword) {
    // SMTP configuration
    console.log('[Nodemailer] Using SMTP configuration:', {
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      user: smtpUser,
      passwordSet: !!smtpPassword,
    });
    
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(smtpPort, 10),
      secure: smtpSecure, // true for 465, false for other ports
      auth: {
        user: smtpUser,
        pass: smtpPassword,
      },
      // Add connection timeout
      connectionTimeout: 10000, // 10 seconds
      greetingTimeout: 10000,
    });
    
    return transporter;
  }

  if (gmailUser && gmailAppPassword) {
    // Gmail with App Password
    console.log('[Nodemailer] Using Gmail App Password configuration');
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
    });
  }

  if (gmailClientId && gmailClientSecret && gmailRefreshToken && gmailUser) {
    // Gmail with OAuth2
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: gmailUser,
        clientId: gmailClientId,
        clientSecret: gmailClientSecret,
        refreshToken: gmailRefreshToken,
      },
    });
  }

  // Default: Use test account (for development)
  if (process.env.NODE_ENV === 'development') {
    console.warn('Nodemailer: Using test account. Configure SMTP or Gmail credentials for production.');
    return nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: 'test@ethereal.email',
        pass: 'test',
      },
    });
  }

  throw new Error(
    'Nodemailer configuration missing. Please set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD or Gmail credentials.'
  );
}

/**
 * Send email via Nodemailer
 */
export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    const transporter = createTransporter();

    // Verify transporter connection
    try {
      await transporter.verify();
      console.log('[Nodemailer] Transporter verified successfully');
    } catch (verifyError) {
      console.error('[Nodemailer] Transporter verification failed:', verifyError);
      throw new Error(`Email server connection failed: ${verifyError instanceof Error ? verifyError.message : 'Unknown error'}`);
    }

    const fromEmail = options.from || process.env.EMAIL_FROM || process.env.SMTP_USER || 'operations@twelfthkey.com';
    const fromName = options.fromName || process.env.EMAIL_FROM_NAME || 'TwelfthKey';

    const mailOptions = {
      from: options.fromName ? `"${fromName}" <${fromEmail}>` : fromEmail,
      to: options.to,
      cc: options.cc,
      subject: options.subject,
      html: options.html,
      text: options.text || options.html.replace(/<[^>]*>/g, ''), // Strip HTML for text version
      attachments: options.attachments,
    };

    // console.log('[Nodemailer] Sending email to:', options.to, options.cc ? `| CC: ${options.cc}` : '');
    const info = await transporter.sendMail(mailOptions);

    console.log('[Nodemailer] Email sent successfully:', info.messageId);
    
    if (process.env.NODE_ENV === 'development') {
      // Preview URL for Ethereal Email (development)
      try {
        const previewUrl = nodemailer.getTestMessageUrl(info);
        if (previewUrl) {
          console.log('[Nodemailer] Preview URL:', previewUrl);
        }
      } catch (error) {
        // getTestMessageUrl may not be available for all transports
      }
    }

    return true;
  } catch (error) {
    console.error('[Nodemailer] Email send error:', error);
    if (error instanceof Error) {
      console.error('[Nodemailer] Error details:', {
        message: error.message,
        stack: error.stack,
      });
    }
    return false;
  }
}

/**
 * Send calculator report email with PDF attachment
 */
export async function sendCalculatorReportEmail(
  to: string,
  calculatorType: string,
  reportUrl: string,
  userName?: string,
  pdfAttachment?: Buffer | string
): Promise<boolean> {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #1E3A5F;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #1E3A5F; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0;">TwelfthKey</h1>
          </div>
          <div style="background: #FAFAFA; padding: 30px; border-radius: 0 0 8px 8px;">
            <h2 style="color: #1E3A5F;">Your ${calculatorType} Report is Ready</h2>
            ${userName ? `<p>Hi ${userName},</p>` : '<p>Hi there,</p>'}
            <p>Thank you for using our ${calculatorType} calculator. Your personalized report is ready for download.</p>
            ${pdfAttachment ? '<p><strong>The PDF report is attached to this email.</strong></p>' : ''}
            <div style="text-align: center; margin: 30px 0;">
              <a href="${reportUrl}" style="background: #C7A566; color: white; padding: 12px 32px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">
                View Report Online
              </a>
            </div>
            <p style="color: #6B7280; font-size: 14px;">
              If you have any questions or would like to discuss your results, please don't hesitate to reach out.
            </p>
            <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 30px 0;">
            <p style="color: #6B7280; font-size: 12px; text-align: center;">
              © 2026 TwelfthKey. All rights reserved.
            </p>
          </div>
        </div>
      </body>
    </html>
  `;

  const attachments = pdfAttachment
    ? [
        {
          filename: `${calculatorType.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`,
          content: pdfAttachment,
          contentType: 'application/pdf',
        },
      ]
    : undefined;

  return sendEmail({
    to,
    subject: `Your ${calculatorType} Report - TwelfthKey`,
    html,
    attachments,
  });
}

/**
 * Send discovery call confirmation email
 */
export async function sendDiscoveryCallConfirmation(
  to: string,
  bookingDate: string,
  bookingTime: string,
  meetingLink?: string,
  userName?: string
): Promise<boolean> {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #1E3A5F;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #1E3A5F; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0;">TwelfthKey</h1>
          </div>
          <div style="background: #FAFAFA; padding: 30px; border-radius: 0 0 8px 8px;">
            <h2 style="color: #1E3A5F;">Discovery Call Confirmed</h2>
            ${userName ? `<p>Hi ${userName},</p>` : '<p>Hi there,</p>'}
            <p>Your discovery call has been scheduled:</p>
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #C7A566;">
              <p style="margin: 0;"><strong>Date:</strong> ${bookingDate}</p>
              <p style="margin: 5px 0;"><strong>Time:</strong> ${bookingTime}</p>
              ${meetingLink ? `<p style="margin: 5px 0;"><strong>Meeting Link:</strong> <a href="${meetingLink}">${meetingLink}</a></p>` : ''}
            </div>
            <p>We're excited to learn about your business and discuss how TwelfthKey can help you achieve operational excellence.</p>
            <p style="color: #6B7280; font-size: 14px;">
              If you need to reschedule, please let us know at least 24 hours in advance.
            </p>
            <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 30px 0;">
            <p style="color: #6B7280; font-size: 12px; text-align: center;">
              © 2026 TwelfthKey. All rights reserved.
            </p>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to,
    subject: 'Discovery Call Confirmed - TwelfthKey',
    html,
  });
}

export interface BookingRequestPayload {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  preferredDate?: string;
  preferredTimeSlot?: string;
  message?: string;
}

/**
 * Notify admin of a new discovery call / booking request (from POST /api/booking)
 */
export async function sendBookingRequestNotification(
  payload: BookingRequestPayload,
  adminEmail: string
): Promise<boolean> {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #1E3A5F;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #1E3A5F; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0;">New Discovery Call Request</h1>
          </div>
          <div style="background: #FAFAFA; padding: 30px; border-radius: 0 0 8px 8px;">
            <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
            ${payload.phone ? `<p><strong>Phone:</strong> ${escapeHtml(payload.phone)}</p>` : ''}
            ${payload.company ? `<p><strong>Company:</strong> ${escapeHtml(payload.company)}</p>` : ''}
            ${payload.preferredDate ? `<p><strong>Preferred date:</strong> ${escapeHtml(payload.preferredDate)}</p>` : ''}
            ${payload.preferredTimeSlot ? `<p><strong>Preferred time:</strong> ${escapeHtml(payload.preferredTimeSlot)}</p>` : ''}
            ${payload.message ? `<p><strong>Message:</strong></p><div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #C7A566; white-space: pre-wrap;">${escapeHtml(payload.message)}</div>` : ''}
            <p style="color: #6B7280; font-size: 12px; margin-top: 20px;">Submitted at ${new Date().toISOString()}</p>
          </div>
        </div>
      </body>
    </html>
  `;
  return sendEmail({
    to: adminEmail,
    subject: `Discovery call request: ${payload.name}`,
    html,
  });
}

/**
 * Send confirmation to user that we received their booking request (no calendar event yet)
 */
export async function sendBookingRequestReceivedConfirmation(
  to: string,
  userName: string,
  calendarLink?: string
): Promise<boolean> {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #1E3A5F;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #1E3A5F; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0;">TwelfthKey</h1>
          </div>
          <div style="background: #FAFAFA; padding: 30px; border-radius: 0 0 8px 8px;">
            <h2 style="color: #1E3A5F;">We received your discovery call request</h2>
            <p>Hi ${escapeHtml(userName)},</p>
            <p>Thank you for requesting a discovery call. We'll get back to you shortly to confirm a time.</p>
            ${calendarLink ? `<p>You can also pick a time directly here: <a href="${escapeHtml(calendarLink)}">Schedule your call</a>.</p>` : ''}
            <p style="color: #6B7280; font-size: 14px;">If you have any questions, just reply to this email.</p>
            <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 30px 0;">
            <p style="color: #6B7280; font-size: 12px; text-align: center;">© 2026 TwelfthKey. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
  return sendEmail({
    to,
    subject: 'Discovery call request received - TwelfthKey',
    html,
  });
}

/**
 * Send newsletter double opt-in confirmation email (click link to confirm subscription)
 */
export async function sendNewsletterConfirmEmail(to: string, confirmUrl: string): Promise<boolean> {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #1E3A5F;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #1E3A5F; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0;">TwelfthKey</h1>
          </div>
          <div style="background: #FAFAFA; padding: 30px; border-radius: 0 0 8px 8px;">
            <h2 style="color: #1E3A5F;">Confirm your subscription</h2>
            <p>Thanks for subscribing to our newsletter. Please confirm your email address by clicking the button below.</p>
            <p style="margin: 24px 0;">
              <a href="${escapeHtml(confirmUrl)}" style="display: inline-block; background: #1E3A5F; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px;">Confirm subscription</a>
            </p>
            <p style="color: #6B7280; font-size: 14px;">If you didn't request this, you can ignore this email.</p>
            <p style="color: #6B7280; font-size: 12px; margin-top: 24px;">This link expires in 7 days.</p>
            <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 30px 0;">
            <p style="color: #6B7280; font-size: 12px; text-align: center;">© 2026 TwelfthKey. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
  return sendEmail({
    to,
    subject: 'Confirm your newsletter subscription - TwelfthKey',
    html,
  });
}

/**
 * Send welcome email after newsletter subscription is confirmed.
 * @param unsubscribeUrl - One-click unsubscribe link (include in email for GDPR/DPDP).
 */
export async function sendNewsletterWelcomeEmail(to: string, unsubscribeUrl?: string): Promise<boolean> {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #1E3A5F;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #1E3A5F; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0;">TwelfthKey</h1>
          </div>
          <div style="background: #FAFAFA; padding: 30px; border-radius: 0 0 8px 8px;">
            <h2 style="color: #1E3A5F;">You're subscribed</h2>
            <p>Thanks for confirming. You'll receive our latest insights on operational excellence, governance, and practical tips for scaling your operations.</p>
            <p>We typically send one newsletter per month. You can unsubscribe at any time from the link in each email.</p>
            ${unsubscribeUrl ? `<p style="margin-top: 24px;"><a href="${escapeHtml(unsubscribeUrl)}" style="color: #6B7280; font-size: 14px;">Unsubscribe</a></p>` : ''}
            <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 30px 0;">
            <p style="color: #6B7280; font-size: 12px; text-align: center;">© 2026 TwelfthKey. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
  return sendEmail({
    to,
    subject: 'Welcome to TwelfthKey Newsletter',
    html,
  });
}

/**
 * Send email with file attachment
 */
export async function sendEmailWithAttachment(
  to: string,
  subject: string,
  html: string,
  attachment: {
    filename: string;
    content: Buffer | string;
    contentType?: string;
  },
  fromName?: string,
  cc?: string | string[]
): Promise<boolean> {
  return sendEmail({
    to,
    cc,
    subject,
    html,
    attachments: [attachment],
    fromName,
  });
}

export interface ResourceGateEmailPayload {
  firstName: string;
  email: string;
  challengeLabel: string;
  templateCode: string;
  gateType: 'full_kit' | 'section_download';
  resourceType: string;
  displayName: string;
  emailSubjectName: string;
  downloadUrl: string | null;
  /** Optional .xlsx when server could export a Google Sheet */
  attachment?: { filename: string; content: Buffer; contentType: string };
}

/**
 * Notify admin and confirm to user for a gated resource download (Business Case Kit, etc.).
 */
export async function sendResourceGateEmails(
  payload: ResourceGateEmailPayload,
  options: { adminEmail: string; sendConfirmationToUser?: boolean }
): Promise<boolean> {
  const { adminEmail, sendConfirmationToUser = true } = options;
  const linkBlock =
    payload.downloadUrl != null
      ? `<p><strong>Template link:</strong> <a href="${escapeHtml(payload.downloadUrl)}">${escapeHtml(payload.downloadUrl)}</a></p>`
      : '<p><strong>Template link:</strong> <em>Not configured — follow up manually.</em></p>';

  const adminHtml = `
    <!DOCTYPE html>
    <html>
      <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #1E3A5F;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #1E3A5F; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0;">Resource download request</h1>
          </div>
          <div style="background: #FAFAFA; padding: 30px; border-radius: 0 0 8px 8px;">
            <p><strong>Resource:</strong> ${escapeHtml(payload.resourceType)}</p>
            <p><strong>Template:</strong> ${escapeHtml(payload.displayName)} <code>(${escapeHtml(payload.templateCode)})</code></p>
            <p><strong>Gate:</strong> ${escapeHtml(payload.gateType)}</p>
            <p><strong>Name:</strong> ${escapeHtml(payload.firstName)}</p>
            <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
            <p><strong>Primary challenge:</strong> ${escapeHtml(payload.challengeLabel)}</p>
            ${linkBlock}
            <p style="color: #6B7280; font-size: 12px; margin-top: 20px;">Submitted at ${new Date().toISOString()}</p>
          </div>
        </div>
      </body>
    </html>
  `;

  const adminSent = await sendEmail({
    to: adminEmail,
    subject: `[Resource] ${payload.emailSubjectName} — ${payload.firstName}`,
    html: adminHtml,
  });

  if (!adminSent) return false;

  if (sendConfirmationToUser) {
    const hasLink = payload.downloadUrl != null;
    const userLinkSection = hasLink
      ? `<div style="text-align: center; margin: 28px 0;">
           <a href="${escapeHtml(payload.downloadUrl!)}" style="background: #0D9488; color: white; padding: 12px 28px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">
             Open your Google Sheet template
           </a>
         </div>
         <p style="color: #4B5563; font-size: 14px;">If the button does not work, copy this link: <br/><span style="word-break: break-all;">${escapeHtml(payload.downloadUrl!)}</span></p>`
      : `<p style="color: #4B5563;">We received your request for <strong>${escapeHtml(payload.emailSubjectName)}</strong>. Our team will send you the link shortly if it is not already attached.</p>`;

    const attachmentNote = payload.attachment
      ? '<p>We have also attached an Excel copy (.xlsx) of the template to this email when export was available.</p>'
      : '';

    const userHtml = `
      <!DOCTYPE html>
      <html>
        <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #1E3A5F;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: #1E3A5F; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0;">TwelfthKey</h1>
            </div>
            <div style="background: #FAFAFA; padding: 30px; border-radius: 0 0 8px 8px;">
              <h2 style="color: #1E3A5F;">Your template is ready</h2>
              <p>Hi ${escapeHtml(payload.firstName)},</p>
              <p>Thanks for telling us about your context. Here is what you requested:</p>
              <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #C7A566; margin: 16px 0;">
                <p style="margin: 0;"><strong>${escapeHtml(payload.displayName)}</strong></p>
                <p style="margin: 8px 0 0; color: #4B5563; font-size: 14px;">Primary challenge you selected: <strong>${escapeHtml(payload.challengeLabel)}</strong></p>
              </div>
              ${userLinkSection}
              ${attachmentNote}
              <p style="color: #6B7280; font-size: 14px;">If you would like help applying this to your business, reply to this email.</p>
              <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 30px 0;">
              <p style="color: #6B7280; font-size: 12px; text-align: center;">© 2026 TwelfthKey. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const userAttachments = payload.attachment
      ? [{ filename: payload.attachment.filename, content: payload.attachment.content, contentType: payload.attachment.contentType }]
      : undefined;

    await sendEmail({
      to: payload.email,
      subject: `Your ${payload.emailSubjectName} — TwelfthKey`,
      html: userHtml,
      attachments: userAttachments,
    });
  }

  return true;
}

export interface ContactFormPayload {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  subService?: string;
  interestedIn?: string[];
  heardAboutUs?: string;
  message: string;
}

/**
 * Send contact form submission to admin (and optional confirmation to user)
 */
export async function sendContactFormEmail(
  payload: ContactFormPayload,
  options: {
    adminEmail: string;
    sendConfirmationToUser?: boolean;
    /** Attached to the user confirmation email only (e.g. gated playbook PDF). */
    userConfirmationAttachment?: { filename: string; content: Buffer; contentType: string };
  }
): Promise<boolean> {
  const { adminEmail, sendConfirmationToUser = true, userConfirmationAttachment } = options;

  const adminHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #1E3A5F;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #1E3A5F; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0;">New Contact Form Submission</h1>
          </div>
          <div style="background: #FAFAFA; padding: 30px; border-radius: 0 0 8px 8px;">
            <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
            ${payload.phone ? `<p><strong>Phone:</strong> ${escapeHtml(payload.phone)}</p>` : ''}
            ${payload.company ? `<p><strong>Company:</strong> ${escapeHtml(payload.company)}</p>` : ''}
            ${payload.service ? `<p><strong>Service:</strong> ${escapeHtml(payload.service)}</p>` : ''}
            ${payload.subService ? `<p><strong>Sub-service:</strong> ${escapeHtml(payload.subService)}</p>` : ''}
            ${payload.interestedIn?.length ? `<p><strong>Interested in:</strong> ${escapeHtml(payload.interestedIn.join(', '))}</p>` : ''}
            ${payload.heardAboutUs ? `<p><strong>How they heard about us:</strong> ${escapeHtml(payload.heardAboutUs)}</p>` : ''}
            <p><strong>Message:</strong></p>
            <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #C7A566; white-space: pre-wrap;">${escapeHtml(payload.message)}</div>
            ${
              userConfirmationAttachment
                ? '<p style="margin-top: 16px;"><strong>Playbook:</strong> The matching PDF was attached to the confirmation email sent to the submitter.</p>'
                : ''
            }
            <p style="color: #6B7280; font-size: 12px; margin-top: 20px;">Submitted at ${new Date().toISOString()}</p>
          </div>
        </div>
      </body>
    </html>
  `;

  const adminSent = await sendEmail({
    to: adminEmail,
    subject: `Contact form: ${payload.name}${payload.service ? ` - ${payload.service}` : ''}`,
    html: adminHtml,
  });

  if (!adminSent) return false;

  if (sendConfirmationToUser) {
    const playbookNote = userConfirmationAttachment
      ? '<p><strong>Your requested playbook (PDF) is attached to this email.</strong></p>'
      : '';
    const userHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #1E3A5F;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: #1E3A5F; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0;">TwelfthKey</h1>
            </div>
            <div style="background: #FAFAFA; padding: 30px; border-radius: 0 0 8px 8px;">
              <h2 style="color: #1E3A5F;">We received your message</h2>
              <p>Hi ${escapeHtml(payload.name)},</p>
              <p>Thank you for getting in touch. We have received your message and will get back to you as soon as possible.</p>
              ${playbookNote}
              <p style="color: #6B7280; font-size: 14px;">If you have any urgent questions, please reply to this email.</p>
              <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 30px 0;">
              <p style="color: #6B7280; font-size: 12px; text-align: center;">© 2026 TwelfthKey. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;
    await sendEmail({
      to: payload.email,
      subject: userConfirmationAttachment
        ? 'Your TwelfthKey playbook (attached) — we received your message'
        : 'We received your message - TwelfthKey',
      html: userHtml,
      attachments: userConfirmationAttachment
        ? [
            {
              filename: userConfirmationAttachment.filename,
              content: userConfirmationAttachment.content,
              contentType: userConfirmationAttachment.contentType,
            },
          ]
        : undefined,
    });
  }

  return true;
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (c) => map[c] ?? c);
}
