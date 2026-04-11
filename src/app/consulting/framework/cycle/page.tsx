'use client';

import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { RefreshCw, Target, TrendingUp } from 'lucide-react';

export default function CycleMethodologyPage() {
  const { t } = useTranslation(['framework-cycle', 'common']);
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="section-padding bg-gradient-to-br from-navy-500 to-teal-600 text-white">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="heading-hero mb-6 text-white">{t('framework-cycle:title')}</h1>
            <p className="body-large text-gray-100 mb-8">
              {t('framework-cycle:subtitle')}
            </p>
            <Button variant="primary" size="lg" asChild>
              <Link href="/consulting/booking">{t('framework-cycle:applyButton')}</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <h2 className="heading-h2 mb-8">{t('framework-cycle:whenToUse')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {[
              t('framework-cycle:useCase1'),
              t('framework-cycle:useCase2'),
              t('framework-cycle:useCase3'),
              t('framework-cycle:useCase4'),
            ].map((item, i) => (
              <div key={i} className="card">
                <p className="body-default text-gray-700">{item}</p>
              </div>
            ))}
          </div>

          <h2 className="heading-h2 mb-8">{t('framework-cycle:fourPhases')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              {
                phase: t('framework-cycle:coordinate.phase'),
                desc: t('framework-cycle:coordinate.desc'),
                icon: Target,
              },
              {
                phase: t('framework-cycle:yield.phase'),
                desc: t('framework-cycle:yield.desc'),
                icon: TrendingUp,
              },
              {
                phase: t('framework-cycle:calibrate.phase'),
                desc: t('framework-cycle:calibrate.desc'),
                icon: RefreshCw,
              },
              {
                phase: t('framework-cycle:learn.phase'),
                desc: t('framework-cycle:learn.desc'),
                icon: RefreshCw,
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="card text-center">
                  <div className="w-16 h-16 bg-teal-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-teal-500" />
                  </div>
                  <h3 className="heading-h4 mb-2">{item.phase}</h3>
                  <p className="body-default text-gray-600">{item.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="mb-8">
            <h2 className="heading-h2 mb-8">{t('framework-cycle:keyOutcomes')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                t('framework-cycle:outcome1'),
                t('framework-cycle:outcome2'),
                t('framework-cycle:outcome3'),
                t('framework-cycle:outcome4'),
              ].map((outcome, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Target className="w-6 h-6 text-teal-500 flex-shrink-0 mt-1" />
                  <p className="body-default text-gray-700">{outcome}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card bg-navy-500 text-white mb-8">
            <h2 className="heading-h2 mb-6">{t('framework-cycle:caseStudy')}</h2>
            <div className="space-y-4">
              <div>
                <p className="body-default font-semibold mb-2">{t('framework-cycle:challenge')}</p>
                <p className="body-default text-gray-200">{t('framework-cycle:challengeText')}</p>
              </div>
              <div>
                <p className="body-default font-semibold mb-2">{t('framework-cycle:approach')}</p>
                <p className="body-default text-gray-200">{t('framework-cycle:approachText')}</p>
              </div>
              <div>
                <p className="body-default font-semibold mb-2">{t('framework-cycle:result')}</p>
                <p className="body-default text-gray-200">
                  {t('framework-cycle:resultText')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom text-center">
          <h2 className="heading-h2 mb-4">{t('framework-cycle:readyTitle')}</h2>
          <p className="body-large text-gray-600 mb-8">
            {t('framework-cycle:readyDescription')}
          </p>
          <Button variant="primary" size="lg" asChild>
            <Link href="/consulting/tools/health-check">{t('common:startFreeDiagnostic')}</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
