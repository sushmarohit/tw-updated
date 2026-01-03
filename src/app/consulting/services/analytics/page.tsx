'use client';

import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CheckCircle, BarChart3, Brain, Eye } from 'lucide-react';

export default function AnalyticsServicePage() {
  const { t } = useTranslation(['services-analytics', 'common']);
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="section-padding bg-gradient-to-br from-navy-500 to-teal-600 text-white">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="heading-hero mb-6 text-white">{t('services-analytics:title')}</h1>
            <p className="body-large text-gray-100 mb-8">
              {t('services-analytics:subtitle')}
            </p>
            <Button variant="primary" size="lg" asChild>
              <Link href="/consulting/booking">{t('services-analytics:visualizeYourData')}</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <h2 className="heading-h2 mb-8">{t('services-analytics:whatsIncluded')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {[
              t('services-analytics:item1'),
              t('services-analytics:item2'),
              t('services-analytics:item3'),
              t('services-analytics:item4'),
              t('services-analytics:item5'),
              t('services-analytics:item6'),
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-teal-500 flex-shrink-0 mt-1" />
                <p className="body-default text-gray-700">{item}</p>
              </div>
            ))}
          </div>

          <div className="mb-12">
            <h2 className="heading-h2 mb-8">{t('services-analytics:dashboardTypes')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: Eye, title: t('services-analytics:executiveSummary.title'), desc: t('services-analytics:executiveSummary.desc') },
                { icon: BarChart3, title: t('services-analytics:operationalDashboard.title'), desc: t('services-analytics:operationalDashboard.desc') },
                { icon: Brain, title: t('services-analytics:financialDashboard.title'), desc: t('services-analytics:financialDashboard.desc') },
                { icon: BarChart3, title: t('services-analytics:teamTalent.title'), desc: t('services-analytics:teamTalent.desc') },
                { icon: Eye, title: t('services-analytics:customerDashboard.title'), desc: t('services-analytics:customerDashboard.desc') },
                { icon: Brain, title: t('services-analytics:predictiveDashboard.title'), desc: t('services-analytics:predictiveDashboard.desc') },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="card">
                    <Icon className="w-10 h-10 text-teal-500 mb-3" />
                    <h3 className="heading-h4 mb-2">{item.title}</h3>
                    <p className="body-default text-gray-600">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mb-12">
            <h2 className="heading-h2 mb-8">{t('services-analytics:aiPoweredInsights')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: t('services-analytics:anomalyDetection.title'),
                  desc: t('services-analytics:anomalyDetection.desc'),
                },
                {
                  title: t('services-analytics:predictiveAnalysis.title'),
                  desc: t('services-analytics:predictiveAnalysis.desc'),
                },
                {
                  title: t('services-analytics:rootCauseAnalysis.title'),
                  desc: t('services-analytics:rootCauseAnalysis.desc'),
                },
                {
                  title: t('services-analytics:recommendations.title'),
                  desc: t('services-analytics:recommendations.desc'),
                },
              ].map((item, i) => (
                <div key={i} className="card">
                  <h3 className="heading-h4 mb-2">{item.title}</h3>
                  <p className="body-default text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card bg-navy-500 text-white">
            <h3 className="heading-h3 mb-4">{t('services-analytics:investmentRoi')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="body-small text-gray-300 mb-2">{t('services-analytics:investment')}</p>
                <p className="heading-h3 text-gold-300">₹1,99,999</p>
                <p className="body-small text-gray-300 mt-2">{t('services-analytics:oneTime45Days')}</p>
              </div>
              <div>
                <p className="body-small text-gray-300 mb-2">{t('services-analytics:typicalRoi')}</p>
                <p className="heading-h3 text-teal-400">₹15–30L</p>
                <p className="body-small text-gray-300 mt-2">{t('services-analytics:inBetterDecisionMaking')}</p>
                <p className="body-small text-gray-300">{t('services-analytics:speedImprovement')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom text-center">
          <h2 className="heading-h2 mb-4">{t('services-analytics:readyTitle')}</h2>
          <p className="body-large text-gray-600 mb-8">
            {t('services-analytics:readyDescription')}
          </p>
          <Button variant="primary" size="lg" asChild>
            <Link href="/consulting/booking">{t('services-analytics:scheduleAssessment')}</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
