import type { Metadata } from 'next';

const BASE = process.env.NEXT_PUBLIC_APP_URL || 'https://twelfthkey.com';

export const metadata: Metadata = {
  title: 'Break-Even Point Calculator | TwelfthKey Consulting',
  description: 'Calculate when your investments will pay off. Monthly savings, revenue increase, and ramp-up time.',
  alternates: { canonical: `${BASE}/consulting/tools/breakeven` },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
