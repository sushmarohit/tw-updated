/**
 * PDF Report Generation Utility
 * Generates PDF reports for calculator results using jsPDF
 */

import jsPDF from 'jspdf';

interface PDFReportOptions {
  title: string;
  companyName?: string;
  userName?: string;
  date: string;
  content: {
    section: string;
    data: Array<{ label: string; value: string | number }>;
  }[];
  recommendations?: string[];
  footerText?: string;
}

/**
 * Generate PDF report
 */
export async function generatePDFReport(options: PDFReportOptions): Promise<Blob> {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let yPosition = 20;

  // Header
  doc.setFontSize(20);
  doc.setTextColor(30, 58, 95); // Navy color
  doc.text('TwelfthKey Consulting', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 10;

  doc.setFontSize(16);
  doc.text(options.title, pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 10;

  // Metadata
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  if (options.companyName) {
    doc.text(`Company: ${options.companyName}`, 20, yPosition);
    yPosition += 5;
  }
  if (options.userName) {
    doc.text(`Prepared for: ${options.userName}`, 20, yPosition);
    yPosition += 5;
  }
  doc.text(`Date: ${options.date}`, 20, yPosition);
  yPosition += 10;

  // Content sections
  options.content.forEach((section) => {
    // Check if we need a new page
    if (yPosition > pageHeight - 40) {
      doc.addPage();
      yPosition = 20;
    }

    // Section title
    doc.setFontSize(14);
    doc.setTextColor(30, 58, 95);
    doc.text(section.section, 20, yPosition);
    yPosition += 8;

    // Section data
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    section.data.forEach((item) => {
      if (yPosition > pageHeight - 30) {
        doc.addPage();
        yPosition = 20;
      }

      doc.text(`${item.label}:`, 25, yPosition);
      doc.setFont('helvetica', 'bold');
      doc.text(String(item.value), 80, yPosition);
      doc.setFont('helvetica', 'normal');
      yPosition += 6;
    });

    yPosition += 5;
  });

  // Recommendations
  if (options.recommendations && options.recommendations.length > 0) {
    if (yPosition > pageHeight - 40) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFontSize(14);
    doc.setTextColor(30, 58, 95);
    doc.text('Recommendations', 20, yPosition);
    yPosition += 8;

    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    options.recommendations.forEach((rec) => {
      if (yPosition > pageHeight - 30) {
        doc.addPage();
        yPosition = 20;
      }

      const lines = doc.splitTextToSize(`• ${rec}`, pageWidth - 50);
      doc.text(lines, 25, yPosition);
      yPosition += lines.length * 5 + 2;
    });
  }

  // Footer
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(
      options.footerText || '© 2025 TwelfthKey Consulting. All rights reserved.',
      pageWidth / 2,
      pageHeight - 10,
      { align: 'center' }
    );
    doc.text(
      `Page ${i} of ${totalPages}`,
      pageWidth - 20,
      pageHeight - 10,
      { align: 'right' }
    );
  }

  return doc.output('blob');
}

/**
 * Generate calculator-specific PDF report
 */
export async function generateCalculatorPDF(
  calculatorType: string,
  result: any,
  userInfo?: { name?: string; companyName?: string; email?: string }
): Promise<Blob> {
  const options: PDFReportOptions = {
    title: `${calculatorType} Report`,
    companyName: userInfo?.companyName,
    userName: userInfo?.name,
    date: new Date().toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    content: [],
    recommendations: result.recommendations || [],
  };

  // Add calculator-specific content
  if (calculatorType === 'Operational Health Diagnostic') {
    options.content.push({
      section: 'Overall Score',
      data: [{ label: 'Governance Maturity Score', value: `${result.overallScore}/100` }],
    });

    options.content.push({
      section: 'G2P Index Scores',
      data: result.indexScores.map((idx: any) => ({
        label: `${idx.index} (${idx.classification})`,
        value: `${idx.score}/100`,
      })),
    });
  } else if (calculatorType === 'Cost Leakage Estimator') {
    options.content.push({
      section: 'Cost Leakage Analysis',
      data: [
        { label: 'Monthly Leakage', value: `₹${result.monthlyLeakage.toLocaleString('en-IN')}` },
        { label: 'Annual Leakage', value: `₹${result.annualLeakage.toLocaleString('en-IN')}` },
        { label: 'Severity', value: result.severity },
      ],
    });

    options.content.push({
      section: 'Breakdown',
      data: [
        { label: 'SLA Breaches', value: `₹${result.breakdown.slaBreaches.toLocaleString('en-IN')}` },
        { label: 'Manual Rework', value: `₹${result.breakdown.manualRework.toLocaleString('en-IN')}` },
        { label: 'Process Errors', value: `₹${result.breakdown.processErrors.toLocaleString('en-IN')}` },
      ],
    });
  }

  return generatePDFReport(options);
}

/**
 * Download PDF report
 */
export async function downloadPDFReport(
  calculatorType: string,
  result: any,
  userInfo?: { name?: string; companyName?: string; email?: string }
): Promise<void> {
  const blob = await generateCalculatorPDF(calculatorType, result, userInfo);
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${calculatorType.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

