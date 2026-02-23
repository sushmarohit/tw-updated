import type { Metadata } from 'next';

const BASE = process.env.NEXT_PUBLIC_APP_URL || 'https://twelfthkey.com';

export const metadata: Metadata = {
  title: 'ROI Calculator | TwelfthKey Consulting',
  description: 'Calculate ROI, payback period, and net benefit for your operational investments.',
  alternates: { canonical: `${BASE}/consulting/tools/roi` },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
