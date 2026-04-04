import type { Metadata } from 'next';

const BASE = process.env.NEXT_PUBLIC_APP_URL || 'https://twelfthkey.com';

export const metadata: Metadata = {
  title: 'ROI Guide: How to Calculate Operational Investment Returns | TwelfthKey',
  description:
    "Learn how to calculate the ROI of operational improvements for your MSME. TwelfthKey's Dual-Lens ROI framework explained step by step.",
  keywords: [
    'operational ROI calculation',
    'ROI operational excellence India',
    'business case operations MSME',
    'cost benefit analysis India',
  ],
  alternates: { canonical: `${BASE}/consulting/resources/roi-guide` },
};

export default function RoiGuideLayout({ children }: { children: React.ReactNode }) {
  return children;
}
