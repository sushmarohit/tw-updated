'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const studyKeys = ['banking', 'fintech', 'telecom'] as const;
const hrefs = ['/consulting/case-studies/banking', '/consulting/case-studies/fintech', '/consulting/case-studies/telecom'] as const;

export function CaseStudyPreviewSection() {
  const { t } = useTranslation('home');

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-8">
          <h2 className="heading-h2 mb-4">{t('caseStudyPreview.title')}</h2>
          <p className="body-large text-gray-600 max-w-2xl mx-auto">
            {t('caseStudyPreview.subtitle')}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {studyKeys.map((key, index) => (
            <div key={key} className="card">
              <h3 className="heading-h4 mb-3">{t(`caseStudyPreview.${key}.title`)}</h3>
              <div className="mb-4">
                <p className="body-small font-semibold text-gray-700 mb-1">{t('caseStudyPreview.challenge')}</p>
                <p className="body-default text-gray-600 mb-3">{t(`caseStudyPreview.${key}.challenge`)}</p>
                <p className="body-small font-semibold text-gray-700 mb-1">{t('caseStudyPreview.result')}</p>
                <p className="body-default text-gray-600">{t(`caseStudyPreview.${key}.result`)}</p>
              </div>
              <Button variant="outline" asChild className="w-full">
                <Link href={hrefs[index]}>{t('caseStudyPreview.readFullStory')}</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

