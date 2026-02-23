import type { Metadata } from 'next';

const BASE = process.env.NEXT_PUBLIC_APP_URL || 'https://twelfthkey.com';

export const metadata: Metadata = {
  title: 'Burnout Risk Assessment | TwelfthKey Consulting',
  description: 'Assess burnout risk from overtime, deadlines, engagement, absenteeism, and workload.',
  alternates: { canonical: `${BASE}/consulting/tools/burnout-risk` },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
