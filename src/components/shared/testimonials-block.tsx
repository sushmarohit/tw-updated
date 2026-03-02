'use client';

import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

export interface TestimonialsBlockProps {
  /** Indices into about-clientele testimonials array (0 = Augrev, 1 = Universal Education, 2 = CAV) */
  indices: number[];
  /** Layout: grid of cards (default) or inline */
  variant?: 'cards' | 'inline';
  className?: string;
}

export function TestimonialsBlock({ indices, variant = 'cards', className }: TestimonialsBlockProps) {
  const { t } = useTranslation('about-clientele');
  const testimonials = t('about-clientele:testimonials', { returnObjects: true }) as Array<{
    quote: string;
    author: string;
    category: string;
  }>;
  if (!Array.isArray(testimonials)) return null;

  const items = indices
    .map((i) => testimonials[i])
    .filter(Boolean);

  if (items.length === 0) return null;

  if (variant === 'inline') {
    return (
      <div className={cn('space-y-4', className)}>
        {items.map((item, idx) => (
          <div key={idx}>
            <blockquote className="body-default text-gray-700 italic">
              &ldquo;{item.quote}&rdquo;
            </blockquote>
            <p className="text-sm text-gray-500 mt-2">— {item.author}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6', className)}>
      {items.map((item, idx) => (
        <div key={idx} className="card bg-white border border-gray-100 flex flex-col">
          <blockquote className="body-default text-gray-700 italic mb-4 flex-1">
            &ldquo;{item.quote}&rdquo;
          </blockquote>
          <p className="text-sm text-gray-500 border-t border-gray-100 pt-4">— {item.author}</p>
        </div>
      ))}
    </div>
  );
}
