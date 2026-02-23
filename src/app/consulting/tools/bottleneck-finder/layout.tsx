import type { Metadata } from 'next';

const BASE = process.env.NEXT_PUBLIC_APP_URL || 'https://twelfthkey.com';

export const metadata: Metadata = {
  title: 'Bottleneck Finder | TwelfthKey Consulting',
  description: 'Identify decision and approval bottlenecks. Approval time, layers, delay frequency, and autonomy.',
  alternates: { canonical: `${BASE}/consulting/tools/bottleneck-finder` },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
