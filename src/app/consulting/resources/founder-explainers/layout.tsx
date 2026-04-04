import type { Metadata } from 'next';

const BASE = process.env.NEXT_PUBLIC_APP_URL || 'https://twelfthkey.com';

export const metadata: Metadata = {
  title: 'Founder Explainers: Free Operations Videos for Business Owners | TwelfthKey',
  description:
    'Short, practical videos on operational excellence, governance, ROI, and dashboards — built for Indian MSME founders. Plain language, under 10 minutes each.',
  keywords: [
    'operations videos India',
    'MSME founder education',
    'operational excellence explained',
    'governance for founders',
  ],
  alternates: { canonical: `${BASE}/consulting/resources/founder-explainers` },
};

export default function FounderExplainersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
