import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Check database connection
    const dbStatus = await checkDatabase();
    
    // Check environment variables
    const envStatus = {
      supabase: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hubspot: !!process.env.HUBSPOT_API_KEY,
      nodemailer:
        !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD) ||
        !!(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) ||
        !!(process.env.GMAIL_USER &&
          process.env.GMAIL_CLIENT_ID &&
          process.env.GMAIL_CLIENT_SECRET &&
          process.env.GMAIL_REFRESH_TOKEN),
      ga4: !!process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID,
    };

    return NextResponse.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      database: dbStatus,
      environment: envStatus,
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

async function checkDatabase() {
  try {
    // Try to connect to database
    const { prisma } = await import('@/lib/db');
    await prisma.$queryRaw`SELECT 1`;
    return 'connected';
  } catch (error) {
    return 'disconnected';
  }
}

