import type { Metadata } from 'next';

const BASE = process.env.NEXT_PUBLIC_APP_URL || 'https://twelfthkey.com';

export const metadata: Metadata = {
  title: 'Operational Health Diagnostic | TwelfthKey Consulting',
  description: 'Assess your operations across PAR, AQ, CLS, LV, and MTTAR. Get a free diagnostic and actionable recommendations.',
  alternates: { canonical: `${BASE}/consulting/tools/health-check` },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
