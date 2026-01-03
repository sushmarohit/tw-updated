'use client';

import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Target, TrendingUp } from 'lucide-react';

export default function PrismMethodologyPage() {
  const { t } = useTranslation(['framework-prism', 'common']);
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="section-padding bg-gradient-to-br from-navy-500 to-teal-600 text-white">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="heading-hero mb-6 text-white">{t('framework-prism:title')}</h1>
            <p className="body-large text-gray-100 mb-8">
              {t('framework-prism:subtitle')}
            </p>
            <Button variant="primary" size="lg" asChild>
              <Link href="/consulting/booking">{t('framework-prism:applyButton')}</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <h2 className="heading-h2 mb-8">{t('framework-prism:whenToUse')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {[
              t('framework-prism:useCase1'),
              t('framework-prism:useCase2'),
              t('framework-prism:useCase3'),
              t('framework-prism:useCase4'),
            ].map((item, i) => (
              <div key={i} className="card">
                <p className="body-default text-gray-700">{item}</p>
              </div>
            ))}
          </div>

          <div className="mb-12">
            <h2 className="heading-h2 mb-8">{t('framework-prism:keyFocus')}</h2>
            <div className="card bg-teal-50 border-2 border-teal-500">
              <p className="body-large text-gray-700 mb-4">
                {t('framework-prism:keyFocusDescription')}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  t('framework-prism:feature1'),
                  t('framework-prism:feature2'),
                  t('framework-prism:feature3'),
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-teal-500" />
                    <p className="body-default text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card bg-navy-500 text-white mb-12">
            <h2 className="heading-h2 mb-6">{t('framework-prism:expectedOutcomes')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                t('framework-prism:outcome1'),
                t('framework-prism:outcome2'),
                t('framework-prism:outcome3'),
                t('framework-prism:outcome4'),
              ].map((outcome, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Target className="w-6 h-6 text-gold-300 flex-shrink-0 mt-1" />
                  <p className="body-default text-gray-200">{outcome}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom text-center">
          <h2 className="heading-h2 mb-4">{t('framework-prism:readyTitle')}</h2>
          <p className="body-large text-gray-600 mb-8">
            {t('framework-prism:readyDescription')}
          </p>
          <Button variant="primary" size="lg" asChild>
            <Link href="/consulting/booking">{t('common:bookDiscoveryCall')}</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
