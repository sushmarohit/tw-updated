'use client';

import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CheckCircle, TrendingDown } from 'lucide-react';

export default function BankingCaseStudyPage() {
  const { t } = useTranslation(['case-studies-banking', 'common']);
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="section-padding bg-gradient-to-br from-navy-500 to-teal-600 text-white">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="heading-hero mb-6 text-white">{t('case-studies-banking:title')}</h1>
            <p className="body-large text-gray-100 mb-8">
              {t('case-studies-banking:subtitle')}
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <div className="card mb-8">
            <h2 className="heading-h3 mb-4">{t('case-studies-banking:companyProfile')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="body-small text-gray-600 mb-1">{t('case-studies-banking:industry')}</p>
                <p className="body-default font-semibold">Banking</p>
              </div>
              <div>
                <p className="body-small text-gray-600 mb-1">{t('case-studies-banking:revenue')}</p>
                <p className="body-default font-semibold">45 Cr</p>
              </div>
              <div>
                <p className="body-small text-gray-600 mb-1">{t('case-studies-banking:employees')}</p>
                <p className="body-default font-semibold">200+</p>
              </div>
            </div>
          </div>

          <div className="card mb-8">
            <h2 className="heading-h3 mb-4">{t('case-studies-banking:challenge')}</h2>
            <p className="body-large text-gray-700 mb-4">
              {t('case-studies-banking:challengeTitle')}
            </p>
            <ul className="space-y-2">
              {[
                t('case-studies-banking:challenge1'),
                t('case-studies-banking:challenge2'),
                t('case-studies-banking:challenge3'),
                t('case-studies-banking:challenge4'),
                t('case-studies-banking:challenge5'),
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <TrendingDown className="w-5 h-5 text-error-500 flex-shrink-0 mt-1" />
                  <p className="body-default text-gray-700">{item}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="card mb-8">
            <h2 className="heading-h3 mb-4">{t('case-studies-banking:approach')}</h2>
            <p className="body-default text-gray-700 mb-4">
              {t('case-studies-banking:approachDescription')}
            </p>
            <div className="space-y-3">
              {[
                t('case-studies-banking:approach1'),
                t('case-studies-banking:approach2'),
                t('case-studies-banking:approach3'),
                t('case-studies-banking:approach4'),
                t('case-studies-banking:approach5'),
                t('case-studies-banking:approach6'),
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0 mt-1" />
                  <p className="body-default text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card mb-8 bg-navy-500 text-white">
            <h2 className="heading-h3 mb-6 text-white">{t('case-studies-banking:results')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { metric: t('case-studies-banking:errorRate'), before: '15%', after: '2%', improvement: '86% reduction' },
                { metric: t('case-studies-banking:processingTime'), before: '24 hours', after: '4 hours', improvement: '83% faster' },
                { metric: t('case-studies-banking:slaCompliance'), before: '85%', after: '99.8%', improvement: '+14.8 points' },
                { metric: t('case-studies-banking:auditFindings'), before: '15 per audit', after: '0–1', improvement: '93% reduction' },
                { metric: t('case-studies-banking:employeeEngagement'), before: 'Baseline', after: '+40%', improvement: 'Measured via pulse survey' },
                { metric: t('case-studies-banking:costSavings'), before: 'N/A', after: t('case-studies-banking:costSavingsValue'), improvement: t('case-studies-banking:costSavingsImprovement') },
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

          <div className="card mb-8">
            <h2 className="heading-h3 mb-4">{t('case-studies-banking:timeline')}</h2>
            <div className="space-y-3">
              {[
                { phase: t('case-studies-banking:week0to2'), desc: t('case-studies-banking:timeline1') },
                { phase: t('case-studies-banking:week2to4'), desc: t('case-studies-banking:timeline2') },
                { phase: t('case-studies-banking:week4to6'), desc: t('case-studies-banking:timeline3') },
                { phase: t('case-studies-banking:week6to8'), desc: t('case-studies-banking:timeline4') },
                { phase: t('case-studies-banking:week8to12'), desc: t('case-studies-banking:timeline5') },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-6">
                  <div className="w-24 flex-shrink-0">
                    <p className="font-semibold text-teal-500">{item.phase}</p>
                  </div>
                  <p className="body-default text-gray-700 flex-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card bg-teal-50 border-2 border-teal-500 mb-8">
            <blockquote className="body-large italic text-gray-700 mb-4">
              {t('case-studies-banking:testimonial')}
            </blockquote>
            <p className="body-default text-gray-600">
              {t('case-studies-banking:testimonialAuthor')}
            </p>
          </div>

          <div className="card bg-gold-50 border-2 border-gold-300 mb-8">
            <h2 className="heading-h3 mb-4">{t('case-studies-banking:roi')}</h2>
            <p className="body-large text-gray-700">{t('common:pricingNote')}</p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom text-center">
          <h2 className="heading-h2 mb-4">{t('case-studies-banking:readyTitle')}</h2>
          <p className="body-large text-gray-600 mb-8">
            {t('case-studies-banking:readyDescription')}
          </p>
          <Button variant="primary" size="lg" asChild>
            <Link href="/consulting/booking">{t('common:bookDiscoveryCall')}</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

