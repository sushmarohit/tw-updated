import type { Metadata } from 'next';

const BASE = process.env.NEXT_PUBLIC_APP_URL || 'https://twelfthkey.com';

export const metadata: Metadata = {
  title: 'Scale Readiness Assessment | TwelfthKey Consulting',
  description: 'Assess team readiness, SOP maturity, collaboration, KPI tracking, and scalability.',
  alternates: { canonical: `${BASE}/consulting/tools/scale-readiness` },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
