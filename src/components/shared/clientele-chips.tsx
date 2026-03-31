'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

/** Map client names to their logo file in /public */
const LOGO_MAP: Record<string, string> = {
  'Solaraa':      '/solaraa.jpeg',
  'Xnexx':        '/xnexx.jpeg',
  'Asta by Avim': '/asta.jpeg',
  'Augrev':       '/augrev.jpeg',
  'Nirmiti Group':'/nirmiti.jpeg',
  'CAV Projects': '/CAV.jpeg',
};

export interface ClienteleChipsStripProps {
  /** Display names (e.g. company names). Rendered as logo cards or text chips. */
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
      <div className="flex flex-wrap justify-center gap-6">
        {displayNames.map((name) => {
          const logo = LOGO_MAP[name];
          return logo ? (
            <div
              key={name}
              className="flex items-center justify-center bg-white rounded-xl border border-gray-200 shadow-sm p-4 w-36 h-36 hover:shadow-md transition-shadow"
            >
              <Image
                src={logo}
                alt={name}
                width={112}
                height={112}
                className="object-contain w-full h-full"
              />
            </div>
          ) : (
            <span
              key={name}
              className="inline-flex items-center rounded-full bg-teal-50 text-teal-800 px-4 py-2 text-sm font-medium border border-teal-100"
            >
              {name}
            </span>
          );
        })}
      </div>
    </div>
  );
}
