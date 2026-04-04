import type { Metadata } from 'next';

const BASE = process.env.NEXT_PUBLIC_APP_URL || 'https://twelfthkey.com';
const canonical = `${BASE}/consulting/blog`;

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Insights on operational excellence, governance maturity, and leadership for growing Indian businesses and MSMEs.',
  keywords: [
    'operational excellence India',
    'governance maturity MSME',
    'fractional COO India',
    'process improvement startup',
    'operational consulting India',
  ],
  alternates: { canonical },
  openGraph: {
    title: 'Blog | TwelfthKey™ Consulting',
    description:
      'Practical insights on operations, governance, and scaling—without the jargon.',
    url: canonical,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | TwelfthKey™ Consulting',
    description:
      'Practical insights on operations, governance, and scaling—without the jargon.',
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
