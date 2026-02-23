import type { Metadata } from 'next';

const BASE = process.env.NEXT_PUBLIC_APP_URL || 'https://twelfthkey.com';

export const metadata: Metadata = {
  title: 'Governance Maturity Assessment | TwelfthKey Consulting',
  description: 'Assess policy clarity, process reviews, automation, risk management, and accountability.',
  alternates: { canonical: `${BASE}/consulting/tools/governance-maturity` },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
