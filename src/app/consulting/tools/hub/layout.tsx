import type { Metadata } from 'next';

const BASE = process.env.NEXT_PUBLIC_APP_URL || 'https://twelfthkey.com';

export const metadata: Metadata = {
  title: 'Tools & Calculators | TwelfthKey Consulting',
  description: 'Free operational health check, cost leakage estimator, break-even calculator, and more. Start your transformation.',
  alternates: { canonical: `${BASE}/consulting/tools/hub` },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
