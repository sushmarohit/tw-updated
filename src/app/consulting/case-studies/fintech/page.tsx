'use client';

import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { TrendingUp } from 'lucide-react';

export default function FinTechCaseStudyPage() {
  const { t } = useTranslation(['case-studies-fintech', 'common']);
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="section-padding bg-gradient-to-br from-navy-500 to-teal-600 text-white">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="heading-hero mb-6 text-white">{t('case-studies-fintech:title')}</h1>
            <p className="body-large text-gray-100 mb-8">
              {t('case-studies-fintech:subtitle')}
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <div className="card mb-8">
            <h2 className="heading-h3 mb-4">{t('case-studies-fintech:companyProfile')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="body-small text-gray-600 mb-1">{t('case-studies-fintech:industry')}</p>
                <p className="body-default font-semibold">FinTech</p>
              </div>
              <div>
                <p className="body-small text-gray-600 mb-1">{t('case-studies-fintech:stage')}</p>
                <p className="body-default font-semibold">Scale-Up</p>
              </div>
              <div>
                <p className="body-small text-gray-600 mb-1">{t('case-studies-fintech:employees')}</p>
                <p className="body-default font-semibold">50-500</p>
              </div>
            </div>
          </div>

          <div className="card mb-8">
            <h2 className="heading-h3 mb-4">{t('case-studies-fintech:challenge')}</h2>
            <p className="body-large text-gray-700 mb-4">
              {t('case-studies-fintech:challengeTitle')}
            </p>
            <ul className="space-y-2">
              {[
                t('case-studies-fintech:challenge1'),
                t('case-studies-fintech:challenge2'),
                t('case-studies-fintech:challenge3'),
                t('case-studies-fintech:challenge4'),
                t('case-studies-fintech:challenge5'),
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-error-500 flex-shrink-0 mt-1" />
                  <p className="body-default text-gray-700">{item}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="card mb-8">
            <h2 className="heading-h3 mb-4">{t('case-studies-fintech:approach')}</h2>
            <p className="body-default text-gray-700 mb-4">
              {t('case-studies-fintech:approachDescription')}
            </p>
          </div>

          <div className="card mb-8 bg-navy-500 text-white">
            <h2 className="heading-h3 mb-6 text-white">{t('case-studies-fintech:results')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { metric: t('case-studies-fintech:governanceScore'), before: '62/100', after: '92/100', improvement: '+30 points' },
                { metric: t('case-studies-fintech:costRecovery'), before: 'N/A', after: '₹44L', improvement: 'In 3 months' },
                { metric: t('case-studies-fintech:parImprovement'), before: 'Baseline', after: '+40%', improvement: 'Prediction accuracy' },
                { metric: t('case-studies-fintech:operationalVisibility'), before: 'Manual reports', after: 'Real-time dashboards', improvement: 'PraXio™ platform' },
              ].map((result, i) => (
                <div key={i} className="border border-navy-400 rounded-lg p-4">
                  <p className="body-small text-gray-300 mb-2">{result.metric}</p>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="body-default text-gray-400">{result.before}</span>
                    <span className="text-gold-300">→</span>
                    <span className="body-default font-semibold text-white">{result.after}</span>
                  </div>
                  <p className="body-small text-gold-300">{result.improvement}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom text-center">
          <h2 className="heading-h2 mb-4">{t('case-studies-fintech:readyTitle')}</h2>
          <Button variant="primary" size="lg" asChild>
            <Link href="/consulting/booking">{t('common:bookDiscoveryCall')}</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

