'use client';

import { cn } from '@/lib/utils';

export interface ClienteleChipsStripProps {
  /** Display names (e.g. company names). Rendered as chips in one row. */
  names: string[];
  /** Optional category label above the chips */
  categoryLabel?: string;
  /** Max chips to show (default no limit). Use for homepage strip. */
  max?: number;
  className?: string;
}

export function ClienteleChipsStrip({ names, categoryLabel, max = 10, className }: ClienteleChipsStripProps) {
  const displayNames = names.slice(0, max);
  if (displayNames.length === 0) return null;

  return (
    <div className={cn('', className)}>
      {categoryLabel && (
        <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">
          {categoryLabel}
        </h3>
      )}
      <div className="flex flex-wrap justify-center gap-2">
        {displayNames.map((name) => (
          <span
            key={name}
            className="inline-flex items-center rounded-full bg-teal-50 text-teal-800 px-4 py-2 text-sm font-medium border border-teal-100"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
