import type { Metadata } from 'next';

const BASE = process.env.NEXT_PUBLIC_APP_URL || 'https://twelfthkey.com';

export const metadata: Metadata = {
  title: 'Cost Leakage Estimator | TwelfthKey Consulting',
  description: 'Quantify revenue lost to operational inefficiency. Estimate SLA breaches, rework, and process errors.',
  alternates: { canonical: `${BASE}/consulting/tools/cost-leakage` },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
