'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

/** Map client names to their logo file in /public */
const LOGO_MAP: Record<string, string> = {
  'Solaraa':      '/solaraa.jpeg',
  'Anexx':        '/anexx.jpeg',
  'Asta by Avim': '/asta.jpeg',
  'Augrev':       '/augrev.jpeg',
  'Nirmiti Group':'/nirmiti.jpeg',
  'CAV Projects': '/CAV.jpeg',
};

/** Extra Tailwind classes applied to the <Image> for logos with excessive whitespace */
const LOGO_SCALE_MAP: Record<string, string> = {
  'CAV Projects': 'scale-[2.2]',
};

export interface ClienteleChipsStripProps {
  names: string[];
  categoryLabel?: string;
  max?: number;
  className?: string;
}

function LogoCard({ name }: { name: string }) {
  const logo = LOGO_MAP[name];
  if (!logo) {
    return (
      <span className="inline-flex items-center rounded-full bg-teal-50 text-teal-800 px-4 py-2 text-sm font-medium border border-teal-100 shrink-0">
        {name}
      </span>
    );
  }
  return (
    <div className="flex items-center justify-center bg-white rounded-xl border border-gray-200 shadow-sm p-4 w-36 h-36 shrink-0 overflow-hidden hover:shadow-md transition-shadow">
      <Image
        src={logo}
        alt={name}
        width={112}
        height={112}
        className={cn('object-contain w-full h-full', LOGO_SCALE_MAP[name])}
      />
    </div>
  );
}

export function ClienteleChipsStrip({ names, categoryLabel, max = 10, className }: ClienteleChipsStripProps) {
  const displayNames = names.slice(0, max);
  if (displayNames.length === 0) return null;

  // Duplicate items to create a seamless infinite loop (marquee trick)
  const marqueeItems = [...displayNames, ...displayNames];

  return (
    <div className={cn('', className)}>
      {categoryLabel && (
        <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">
          {categoryLabel}
        </h3>
      )}

      {/* Mobile + Tablet: auto-scrolling marquee carousel */}
      <div className="lg:hidden relative overflow-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        <div className="flex gap-4 animate-marquee w-max">
          {marqueeItems.map((name, i) => (
            <LogoCard key={`${name}-${i}`} name={name} />
          ))}
        </div>
      </div>

      {/* Desktop: static flex wrap grid */}
      <div className="hidden lg:flex flex-wrap justify-center gap-6">
        {displayNames.map((name) => (
          <LogoCard key={name} name={name} />
        ))}
      </div>
    </div>
  );
}
