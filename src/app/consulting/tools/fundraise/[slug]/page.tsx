'use client';

import { useParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { BackToTools } from '@/components/shared/back-to-tools';

const SLUG_TO_KEY: Record<string, string> = {
  'runway-check': 'runwayCheck',
  'raise-amount': 'raiseAmount',
  dilution: 'dilution',
  readiness: 'readiness',
  'instrument-fit': 'instrumentFit',
};

export default function FundraiseToolPlaceholderPage() {
  const params = useParams();
  const slug = typeof params?.slug === 'string' ? params.slug : '';
  const { t } = useTranslation(['tools', 'common']);
  const key = SLUG_TO_KEY[slug];
  const name = key ? t(`tools:fundraise.${key}.name`) : slug;

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="section-padding">
        <div className="container-custom max-w-2xl mx-auto text-center">
          <BackToTools className="inline-flex items-center gap-2 text-gray-600 hover:text-teal-600 mb-6 mx-auto" />
          <h1 className="heading-h2 mb-4">{name}</h1>
          <p className="body-large text-gray-600 mb-6">
            {t('tools:comingSoon')}
          </p>
        </div>
      </section>
    </div>
  );
}
