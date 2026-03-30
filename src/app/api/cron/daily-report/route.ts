import { NextRequest, NextResponse } from 'next/server';
import * as XLSX from 'xlsx';
import { prisma } from '@/lib/db';
import { sendEmailWithAttachment } from '@/lib/integrations/nodemailer';

// const OPS_EMAIL = 'ops@twelfthkey.com';
const OPS_EMAIL = 'thakurrohit210302@gmail.com';

export async function GET(request: NextRequest) {
  // Validate cron secret to prevent unauthorized calls
  const secret = request.headers.get('x-cron-secret');
  if (!secret || secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000); // last 24 hours

    const [bookingRequests, contacts, users] = await Promise.all([
      prisma.bookingRequest.findMany({
        where: { createdAt: { gte: since } },
        orderBy: { createdAt: 'desc' },
        select: {
          name: true,
          email: true,
          phone: true,
          company: true,
          preferredDate: true,
          preferredTimeSlot: true,
          message: true,
          status: true,
          createdAt: true,
        },
      }),
      prisma.contact.findMany({
        where: { createdAt: { gte: since } },
        orderBy: { createdAt: 'desc' },
        select: {
          name: true,
          email: true,
          phone: true,
          company: true,
          service: true,
          subService: true,
          message: true,
          createdAt: true,
        },
      }),
      prisma.user.findMany({
        where: { createdAt: { gte: since } },
        orderBy: { createdAt: 'desc' },
        select: {
          name: true,
          email: true,
          phone: true,
          companyName: true,
          industry: true,
          role: true,
          createdAt: true,
        },
      }),
    ]);

    const totalLeads = bookingRequests.length + contacts.length + users.length;

    if (totalLeads === 0) {
      return NextResponse.json({
        success: true,
        message: 'No new leads in the last 24 hours. Email not sent.',
        counts: { bookingRequests: 0, contacts: 0, users: 0 },
      });
    }

    // --- Build Excel workbook ---
    const wb = XLSX.utils.book_new();

    // Sheet 1: Booking Requests
    const bookingRows = bookingRequests.map((r) => ({
      Name: r.name,
      Email: r.email,
      Phone: r.phone ?? '',
      Company: r.company ?? '',
      'Preferred Date': r.preferredDate ?? '',
      'Preferred Time Slot': r.preferredTimeSlot ?? '',
      Message: r.message ?? '',
      Status: r.status,
      'Submitted At': formatDate(r.createdAt),
    }));
    const wsBookings = XLSX.utils.json_to_sheet(
      bookingRows.length > 0 ? bookingRows : [emptyRow(['Name', 'Email', 'Phone', 'Company', 'Preferred Date', 'Preferred Time Slot', 'Message', 'Status', 'Submitted At'])]
    );
    autoWidth(wsBookings, bookingRows.length > 0 ? bookingRows : []);
    XLSX.utils.book_append_sheet(wb, wsBookings, 'Booking Requests');

    // Sheet 2: Contact Forms
    const contactRows = contacts.map((r) => ({
      Name: r.name,
      Email: r.email,
      Phone: r.phone ?? '',
      Company: r.company ?? '',
      Service: r.service ?? '',
      'Sub Service': r.subService ?? '',
      Message: r.message,
      'Submitted At': formatDate(r.createdAt),
    }));
    const wsContacts = XLSX.utils.json_to_sheet(
      contactRows.length > 0 ? contactRows : [emptyRow(['Name', 'Email', 'Phone', 'Company', 'Service', 'Sub Service', 'Message', 'Submitted At'])]
    );
    autoWidth(wsContacts, contactRows.length > 0 ? contactRows : []);
    XLSX.utils.book_append_sheet(wb, wsContacts, 'Contact Forms');

    // Sheet 3: Calculator Users
    const userRows = users.map((r) => ({
      Name: r.name,
      Email: r.email,
      Phone: r.phone ?? '',
      Company: r.companyName ?? '',
      Industry: r.industry ?? '',
      Role: r.role ?? '',
      'Signed Up At': formatDate(r.createdAt),
    }));
    const wsUsers = XLSX.utils.json_to_sheet(
      userRows.length > 0 ? userRows : [emptyRow(['Name', 'Email', 'Phone', 'Company', 'Industry', 'Role', 'Signed Up At'])]
    );
    autoWidth(wsUsers, userRows.length > 0 ? userRows : []);
    XLSX.utils.book_append_sheet(wb, wsUsers, 'Calculator Users');

    // Sheet 4: All Leads (merged summary)
    const allRows: Record<string, string>[] = [
      ...bookingRequests.map((r) => ({
        Source: 'Booking Request',
        Name: r.name,
        Email: r.email,
        Phone: r.phone ?? '',
        Company: r.company ?? '',
        'Preferred Date': r.preferredDate ?? '',
        'Preferred Time': r.preferredTimeSlot ?? '',
        Message: r.message ?? '',
        'Submitted At': formatDate(r.createdAt),
      })),
      ...contacts.map((r) => ({
        Source: 'Contact Form',
        Name: r.name,
        Email: r.email,
        Phone: r.phone ?? '',
        Company: r.company ?? '',
        'Preferred Date': '',
        'Preferred Time': '',
        Message: r.message,
        'Submitted At': formatDate(r.createdAt),
      })),
      ...users.map((r) => ({
        Source: 'Calculator User',
        Name: r.name,
        Email: r.email,
        Phone: r.phone ?? '',
        Company: r.companyName ?? '',
        'Preferred Date': '',
        'Preferred Time': '',
        Message: '',
        'Submitted At': formatDate(r.createdAt),
      })),
    ].sort((a, b) => new Date(b['Submitted At']).getTime() - new Date(a['Submitted At']).getTime());

    const wsAll = XLSX.utils.json_to_sheet(allRows);
    autoWidth(wsAll, allRows);
    XLSX.utils.book_append_sheet(wb, wsAll, 'All Leads');

    // Convert to Buffer
    const excelBuffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' }) as Buffer;

    const today = new Date().toISOString().split('T')[0]; // e.g. 2026-03-29
    const filename = `twelfthkey-leads-${today}.xlsx`;

    const sent = await sendEmailWithAttachment(
      OPS_EMAIL,
      `Daily Leads Report — ${today} (${totalLeads} new ${totalLeads === 1 ? 'lead' : 'leads'})`,
      buildEmailHtml(today, bookingRequests.length, contacts.length, users.length),
      { filename, content: excelBuffer, contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
      'TwelfthKey Reports'
    );

    if (!sent) {
      return NextResponse.json({ success: false, error: 'Email delivery failed' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: `Report sent to ${OPS_EMAIL}`,
      counts: {
        bookingRequests: bookingRequests.length,
        contacts: contacts.length,
        users: users.length,
        total: totalLeads,
      },
    });
  } catch (error) {
    console.error('[Daily Report Cron] Error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// --- Helpers ---

function formatDate(date: Date): string {
  return date.toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function emptyRow(headers: string[]): Record<string, string> {
  return Object.fromEntries(headers.map((h) => [h, '— no entries —']));
}

function autoWidth(ws: XLSX.WorkSheet, rows: Record<string, string>[]) {
  if (rows.length === 0) return;
  const keys = Object.keys(rows[0]);
  ws['!cols'] = keys.map((key) => ({
    wch: Math.min(
      60,
      Math.max(key.length + 2, ...rows.map((r) => (r[key] ?? '').toString().length + 2))
    ),
  }));
}

function buildEmailHtml(date: string, bookings: number, contacts: number, users: number): string {
  const total = bookings + contacts + users;
  return `
    <!DOCTYPE html>
    <html>
      <head><meta charset="utf-8"></head>
      <body style="font-family: Arial, sans-serif; color: #1E3A5F; line-height: 1.6;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #1E3A5F; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 20px;">Daily Leads Report — ${date}</h1>
          </div>
          <div style="background: #FAFAFA; padding: 30px; border-radius: 0 0 8px 8px;">
            <p>Hi Ops Team,</p>
            <p>Here is the daily leads summary for <strong>${date}</strong>. The full Excel report is attached.</p>
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <tr style="background: #1E3A5F; color: white;">
                <th style="padding: 10px; text-align: left; border-radius: 4px 0 0 4px;">Source</th>
                <th style="padding: 10px; text-align: center;">New Leads</th>
              </tr>
              <tr style="background: white;">
                <td style="padding: 10px; border-bottom: 1px solid #E5E7EB;">Booking Requests</td>
                <td style="padding: 10px; text-align: center; border-bottom: 1px solid #E5E7EB; font-weight: bold;">${bookings}</td>
              </tr>
              <tr style="background: #F9FAFB;">
                <td style="padding: 10px; border-bottom: 1px solid #E5E7EB;">Contact Forms</td>
                <td style="padding: 10px; text-align: center; border-bottom: 1px solid #E5E7EB; font-weight: bold;">${contacts}</td>
              </tr>
              <tr style="background: white;">
                <td style="padding: 10px; border-bottom: 2px solid #1E3A5F;">Calculator Users</td>
                <td style="padding: 10px; text-align: center; border-bottom: 2px solid #1E3A5F; font-weight: bold;">${users}</td>
              </tr>
              <tr style="background: #C7A566; color: white;">
                <td style="padding: 10px; font-weight: bold; border-radius: 0 0 0 4px;">Total</td>
                <td style="padding: 10px; text-align: center; font-weight: bold; border-radius: 0 0 4px 0;">${total}</td>
              </tr>
            </table>
            <p style="color: #6B7280; font-size: 13px;">This report covers the last 24 hours. All times are in IST.</p>
            <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 24px 0;">
            <p style="color: #9CA3AF; font-size: 12px; text-align: center;">© 2026 TwelfthKey. Automated daily report.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}
