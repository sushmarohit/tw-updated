'use client';

import { useTranslation } from 'react-i18next';
import { ClienteleChipsStrip } from '@/components/shared/clientele-chips';

/** Homepage clientele strip: one row, 6–10 chips (Augrev, Universal Education, CAV Projects, Solaraa, Anexx, Asta by Avim, Vasundhara Nirmiti Properties) */
const HOMEPAGE_CHIP_NAMES = [
  'Augrev',
  'Universal Education',
  'CAV Projects',
  'Solaraa',
  'Anexx',
  'Asta by Avim',
  'Vasundhara Nirmiti Properties',
];

export function ClienteleStripSection() {
  const { t } = useTranslation('home');
  return (
    <section className="section-padding bg-white border-b border-gray-100">
      <div className="container-custom">
        <p className="text-center text-sm font-semibold uppercase tracking-wide text-gray-500 mb-4">
          {t('clienteleStrip.title')}
        </p>
        <ClienteleChipsStrip names={HOMEPAGE_CHIP_NAMES} max={10} />
      </div>
    </section>
  );
}
