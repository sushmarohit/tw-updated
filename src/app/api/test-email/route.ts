import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/integrations/nodemailer';

/**
 * Test email endpoint - helps debug email configuration
 * POST /api/test-email
 * Body: { to: "test@example.com" }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { to } = body;

    if (!to) {
      return NextResponse.json(
        { error: 'Email address (to) is required' },
        { status: 400 }
      );
    }

    // Check environment variables
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPassword = process.env.SMTP_PASSWORD;
    const smtpSecure = process.env.SMTP_SECURE;
    const gmailUser = process.env.GMAIL_USER;
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

    const configStatus = {
      smtp: {
        host: !!smtpHost,
        port: !!smtpPort,
        user: !!smtpUser,
        password: !!smtpPassword,
        secure: smtpSecure,
      },
      gmail: {
        user: !!gmailUser,
        appPassword: !!gmailAppPassword,
      },
    };

    console.log('[Test Email] Configuration status:', configStatus);

    // Send test email
    const emailSent = await sendEmail({
      to,
      subject: 'Test Email from TwelfthKey',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #1E3A5F;">Email Test Successful!</h2>
          <p>If you're reading this, your email configuration is working correctly.</p>
          <p><strong>Configuration used:</strong></p>
          <ul>
            <li>SMTP Host: ${smtpHost || 'Not set'}</li>
            <li>SMTP Port: ${smtpPort || 'Not set'}</li>
            <li>SMTP User: ${smtpUser || 'Not set'}</li>
            <li>Gmail User: ${gmailUser || 'Not set'}</li>
          </ul>
          <p style="color: #6B7280; font-size: 12px; margin-top: 20px;">
            This is a test email sent from your TwelfthKey application.
          </p>
        </div>
      `,
    });

    if (emailSent) {
      return NextResponse.json({
        success: true,
        message: 'Test email sent successfully!',
        config: configStatus,
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to send test email. Check server logs for details.',
          config: configStatus,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('[Test Email] Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to send test email',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
