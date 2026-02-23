import type { Metadata } from 'next';
import { getServiceCategoryBySlug, getServiceDetailBySlug } from '@/lib/services-catalog';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://twelfthkey.com';

type Props = { params: { slug?: string[] }; children: React.ReactNode };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slugArray = params?.slug;
  const slugPath = Array.isArray(slugArray) ? slugArray.join('/') : slugArray || '';
  const first = Array.isArray(slugArray) ? slugArray[0] : slugArray;
  const category = slugArray?.length === 1 && first ? getServiceCategoryBySlug(first) : null;
  const detail = slugPath ? getServiceDetailBySlug(slugPath) : null;

  const title = detail?.title ?? category?.title ?? 'Services';
  const description = detail?.heroSubheadline ?? category?.description ?? 'TwelfthKey Consulting services for process excellence, fundraise, and franchise.';

  const canonical = `${BASE_URL}/consulting/services/${slugPath}`;
  return {
    title: `${title} | TwelfthKey Consulting`,
    description: description.slice(0, 160),
    alternates: { canonical },
    openGraph: {
      title: `${title} | TwelfthKey Consulting`,
      description: description.slice(0, 160),
      url: canonical,
    },
  };
}

export default function ServiceSlugLayout({ children }: Props) {
  return <>{children}</>;
}
