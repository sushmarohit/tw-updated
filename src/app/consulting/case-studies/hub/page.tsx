'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { PageSchema } from '@/components/seo/page-schema';

const INDUSTRY_SLUGS = ['banking', 'fintech', 'telecom', 'msme', 'ecommerce'] as const;

export default function CaseStudiesHubPage() {
  const { t } = useTranslation(['case-studies-hub', 'common']);

  return (
    <>
      <PageSchema breadcrumbNameMap={{ consulting: 'Consulting', 'case-studies': 'Case Studies', hub: 'Hub' }} />
      <div className="min-h-screen bg-gray-50">
        <section className="section-padding bg-gradient-to-br from-navy-500 to-teal-600 text-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="heading-hero mb-6 text-white">{t('case-studies-hub:title')}</h1>
              <p className="body-large text-gray-100 mb-8">{t('case-studies-hub:subtitle')}</p>
              <Button variant="primary" size="lg" asChild>
                <Link href="/consulting/booking">{t('common:bookDiscoveryCall')}</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {INDUSTRY_SLUGS.map((slug) => (
                <div key={slug} className="card">
                  <span className="inline-flex rounded-full bg-teal-50 text-teal-700 px-3 py-1 text-xs font-semibold mb-3">
                    {t('case-studies-hub:' + slug + '.industry')}
                  </span>
                  <h2 className="heading-h4 mb-3">{t('case-studies-hub:' + slug + '.title')}</h2>
                  <p className="body-small text-gray-500 mb-2">{t('case-studies-hub:' + slug + '.size')}</p>
                  <p className="body-default text-gray-700 mb-2">
                    <span className="font-semibold">{t('case-studies-hub:challenge')}</span>{' '}
                    {t('case-studies-hub:' + slug + '.challenge')}
                  </p>
                  <p className="body-default text-gray-600 mb-5">
                    <span className="font-semibold">{t('case-studies-hub:result')}</span>{' '}
                    {t('case-studies-hub:' + slug + '.result')}
                  </p>
                  <Button variant="outline" asChild>
                    <Link href={`/consulting/case-studies/${slug}`}>{t('case-studies-hub:readFullStory')}</Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-custom text-center">
            <h2 className="heading-h2 mb-4">{t('case-studies-hub:readyTitle')}</h2>
            <p className="body-large text-gray-600 mb-8">{t('case-studies-hub:readyDescription')}</p>
            <Button variant="primary" size="lg" asChild>
              <Link href="/consulting/booking">{t('case-studies-hub:getCustomAssessment')}</Link>
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}
