'use client';

import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Hexagon, RefreshCw, Target } from 'lucide-react';

export default function ParseMethodologyPage() {
  const { t } = useTranslation(['framework-parse', 'common']);
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="section-padding bg-gradient-to-br from-navy-500 to-teal-600 text-white">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="heading-hero mb-6 text-white">{t('framework-parse:title')}</h1>
            <p className="body-large text-gray-100 mb-8">
              {t('framework-parse:subtitle')}
            </p>
            <Button variant="primary" size="lg" asChild>
              <Link href="/consulting/booking">{t('framework-parse:applyButton')}</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <h2 className="heading-h2 mb-8">{t('framework-parse:whenToUse')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {[
              t('framework-parse:useCase1'),
              t('framework-parse:useCase2'),
              t('framework-parse:useCase3'),
              t('framework-parse:useCase4'),
            ].map((item, i) => (
              <div key={i} className="card">
                <p className="body-default text-gray-700">{item}</p>
              </div>
            ))}
          </div>

          <div className="mb-12">
            <h2 className="heading-h2 mb-8">{t('framework-parse:framework')}</h2>
            <div className="space-y-6">
              {[
                {
                  letter: t('framework-parse:plan.letter'),
                  word: t('framework-parse:plan.word'),
                  desc: t('framework-parse:plan.desc'),
                  icon: Target,
                },
                {
                  letter: t('framework-parse:align.letter'),
                  word: t('framework-parse:align.word'),
                  desc: t('framework-parse:align.desc'),
                  icon: RefreshCw,
                },
                {
                  letter: t('framework-parse:reset.letter'),
                  word: t('framework-parse:reset.word'),
                  desc: t('framework-parse:reset.desc'),
                  icon: Hexagon,
                },
                {
                  letter: t('framework-parse:execute.letter'),
                  word: t('framework-parse:execute.word'),
                  desc: t('framework-parse:execute.desc'),
                  icon: Target,
                },
                {
                  letter: t('framework-parse:evolve.letter'),
                  word: t('framework-parse:evolve.word'),
                  desc: t('framework-parse:evolve.desc'),
                  icon: RefreshCw,
                },
              ].map((item, i) => {
                return (
                  <div key={i} className="card">
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-3xl font-bold text-teal-500">{item.letter}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="heading-h4 mb-2">{item.word}</h3>
                        <p className="body-default text-gray-600">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="card bg-navy-500 text-white mb-12">
            <h2 className="heading-h2 mb-6">{t('framework-parse:keyMetric')}</h2>
            <p className="body-large text-gray-200">
              {t('framework-parse:keyMetricDescription')}
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom text-center">
          <h2 className="heading-h2 mb-4">{t('framework-parse:readyTitle')}</h2>
          <p className="body-large text-gray-600 mb-8">
            {t('framework-parse:readyDescription')}
          </p>
          <Button variant="primary" size="lg" asChild>
            <Link href="/consulting/booking">{t('common:bookDiscoveryCall')}</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
