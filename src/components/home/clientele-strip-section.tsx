'use client';

import { useTranslation } from 'react-i18next';
import { ClienteleChipsStrip } from '@/components/shared/clientele-chips';

const CATEGORY_KEYS = ['processExcellence', 'fundraise', 'govtLiaison'] as const;

/** Homepage clientele strip: all logos in one flat row, no category headings */
export function ClienteleStripSection() {
  const { t } = useTranslation(['home', 'about-clientele']);
  const clientele = t('about-clientele:clientele', { returnObjects: true }) as Record<string, string[]>;

  const allNames = CATEGORY_KEYS.flatMap((key) => {
    const names = clientele[key];
    return Array.isArray(names) ? names : [];
  });

  return (
    <section className="section-padding bg-white border-b border-gray-100">
      <div className="container-custom">
        <p className="text-center text-sm font-semibold uppercase tracking-wide text-gray-500 mb-6">
          {t('clienteleStrip.title')}
        </p>
        <ClienteleChipsStrip names={allNames} />
      </div>
    </section>
  );
}
