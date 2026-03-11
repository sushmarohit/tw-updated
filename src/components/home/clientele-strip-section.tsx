'use client';

import { useTranslation } from 'react-i18next';
import { ClienteleChipsStrip } from '@/components/shared/clientele-chips';

const CATEGORY_KEYS = ['processExcellence', 'fundraise', 'govtLiaison'] as const;

/** Homepage clientele strip: grouped chips by service line (Process Excellence, Fundraise, Govt. Liaison) — same grouping as About/Clientele page */
export function ClienteleStripSection() {
  const { t } = useTranslation(['home', 'about-clientele']);
  const clientele = t('about-clientele:clientele', { returnObjects: true }) as Record<string, string[]>;
  const categories = t('about-clientele:categories', { returnObjects: true }) as Record<string, string>;

  return (
    <section className="section-padding bg-white border-b border-gray-100">
      <div className="container-custom">
        <p className="text-center text-sm font-semibold uppercase tracking-wide text-gray-500 mb-6">
          {t('clienteleStrip.title')}
        </p>
        <div className="space-y-6">
          {CATEGORY_KEYS.map((key) => {
            const names = clientele[key];
            if (!names || !Array.isArray(names) || names.length === 0) return null;
            const categoryLabel = categories[key];
            return (
              <ClienteleChipsStrip
                key={key}
                names={names}
                categoryLabel={categoryLabel}
                className=""
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
