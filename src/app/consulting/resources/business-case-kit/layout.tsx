import type { Metadata } from 'next';

const BASE = process.env.NEXT_PUBLIC_APP_URL || 'https://twelfthkey.com';

export const metadata: Metadata = {
  title: 'Business Case Kit: ROI Templates & Case Studies | TwelfthKey',
  description:
    'Build a compelling business case for operational investments. CBA templates, ROI frameworks, impact measurement tools, and real case studies from TwelfthKey clients.',
  keywords: [
    'business case operational excellence',
    'ROI templates India',
    'cost benefit analysis MSME',
    'operational investment ROI',
  ],
  alternates: { canonical: `${BASE}/consulting/resources/business-case-kit` },
};

export default function BusinessCaseKitLayout({ children }: { children: React.ReactNode }) {
  return children;
}
