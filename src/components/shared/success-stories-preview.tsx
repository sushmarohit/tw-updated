'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/** Client keys matching about-clientele successStories (client field) */
export type SuccessStoryKey = 'Solaraa' | 'Anexx' | 'Asta by Avim' | 'Vasundhara Nirmiti Properties';

export interface SuccessStoriesPreviewProps {
  /** Client names to show (order preserved) */
  clients: SuccessStoryKey[];
  /** Mini cards (for service pages) or full cards (for homepage) */
  variant?: 'mini' | 'full';
  /** CTA link for "View all" / "Explore Success Stories" */
  viewAllHref?: string;
  /** CTA label */
  viewAllLabel?: string;
  /** Optional section title */
  title?: string;
  className?: string;
}

export function SuccessStoriesPreview({
  clients,
  variant = 'full',
  viewAllHref,
  viewAllLabel,
  title,
  className,
}: SuccessStoriesPreviewProps) {
  const { t } = useTranslation(['about-clientele', 'common']);
  const successStories = t('about-clientele:successStories', { returnObjects: true }) as Array<{
    client: string;
    headline: string;
    category: string;
    problem: string;
    whatWeDid: string;
    result: string;
  }>;
  if (!Array.isArray(successStories)) return null;

  const items = clients
    .map((name) => successStories.find((s) => s.client === name))
    .filter(Boolean) as typeof successStories;

  if (items.length === 0) return null;

  const problemLabel = t('about-clientele:labels.problem');
  const resultLabel = t('about-clientele:labels.result');

  return (
    <section className={cn('', className)}>
      {title && (
        <h2 className="heading-h2 mb-6">{title}</h2>
      )}
      <div className={variant === 'mini' ? 'grid grid-cols-1 md:grid-cols-3 gap-4' : 'grid grid-cols-1 md:grid-cols-3 gap-6'}>
        {items.map((story, idx) => (
          <div
            key={story.client}
            className={cn(
              'border border-gray-100 rounded-xl overflow-hidden bg-white',
              variant === 'mini' ? 'p-4' : 'card'
            )}
          >
            <h3 className="font-semibold text-navy-500 mb-1">
              {story.client} — {story.headline}
            </h3>
            {variant === 'full' && (
              <>
                <p className="text-xs font-semibold text-teal-600 mt-2 mb-1">{problemLabel}</p>
                <p className="body-small text-gray-600 mb-3 line-clamp-2">{story.problem}</p>
                <p className="text-xs font-semibold text-teal-600 mb-1">{resultLabel}</p>
                <p className="body-small text-gray-700">{story.result}</p>
              </>
            )}
            {variant === 'mini' && (
              <p className="body-small text-gray-600 mt-2 line-clamp-2">{story.result}</p>
            )}
          </div>
        ))}
      </div>
      {viewAllHref && viewAllLabel && (
        <div className="mt-6 text-center">
          <Button variant="outline" asChild>
            <Link href={viewAllHref}>{viewAllLabel}</Link>
          </Button>
        </div>
      )}
    </section>
  );
}
