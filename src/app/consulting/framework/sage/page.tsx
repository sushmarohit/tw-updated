'use client';

import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Target, TrendingDown } from 'lucide-react';

export default function SageMethodologyPage() {
  const { t } = useTranslation(['framework-sage', 'common']);
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="section-padding bg-gradient-to-br from-navy-500 to-teal-600 text-white">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="heading-hero mb-6 text-white">{t('framework-sage:title')}</h1>
            <p className="body-large text-gray-100 mb-8">
              {t('framework-sage:subtitle')}
            </p>
            <Button variant="primary" size="lg" asChild>
              <Link href="/consulting/booking">{t('framework-sage:applyButton')}</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <h2 className="heading-h2 mb-8">{t('framework-sage:whenToUse')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {[
              t('framework-sage:useCase1'),
              t('framework-sage:useCase2'),
              t('framework-sage:useCase3'),
              t('framework-sage:useCase4'),
            ].map((item, i) => (
              <div key={i} className="card">
                <p className="body-default text-gray-700">{item}</p>
              </div>
            ))}
          </div>

          <div className="mb-12">
            <h2 className="heading-h2 mb-8">{t('framework-sage:keyFocus')}</h2>
            <div className="card bg-teal-50 border-2 border-teal-500">
              <p className="body-large text-gray-700 mb-4">
                {t('framework-sage:keyFocusDescription')}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  t('framework-sage:feature1'),
                  t('framework-sage:feature2'),
                  t('framework-sage:feature3'),
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <TrendingDown className="w-5 h-5 text-teal-500" />
                    <p className="body-default text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card bg-navy-500 text-white mb-12">
            <h2 className="heading-h2 mb-6">{t('framework-sage:expectedOutcomes')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                t('framework-sage:outcome1'),
                t('framework-sage:outcome2'),
                t('framework-sage:outcome3'),
                t('framework-sage:outcome4'),
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
          <h2 className="heading-h2 mb-4">{t('framework-sage:readyTitle')}</h2>
          <p className="body-large text-gray-600 mb-8">
            {t('framework-sage:readyDescription')}
          </p>
          <Button variant="primary" size="lg" asChild>
            <Link href="/consulting/booking">{t('common:bookDiscoveryCall')}</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
