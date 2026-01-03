'use client';

import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CheckCircle, Clock, TrendingUp } from 'lucide-react';

export default function AssessmentServicePage() {
  const { t } = useTranslation(['services-assessment', 'common']);
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="section-padding bg-gradient-to-br from-navy-500 to-teal-600 text-white">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="heading-hero mb-6 text-white">{t('services-assessment:title')}</h1>
            <p className="body-large text-gray-100 mb-8">
              {t('services-assessment:subtitle')}
            </p>
            <Button variant="primary" size="lg" asChild>
              <Link href="/consulting/booking">{t('services-assessment:bookAssessment')}</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <h2 className="heading-h2 mb-8">{t('services-assessment:whatYouGet')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {[
              t('services-assessment:item1'),
              t('services-assessment:item2'),
              t('services-assessment:item3'),
              t('services-assessment:item4'),
              t('services-assessment:item5'),
              t('services-assessment:item6'),
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-teal-500 flex-shrink-0 mt-1" />
                <p className="body-default text-gray-700">{item}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="card text-center">
              <Clock className="w-12 h-12 text-teal-500 mx-auto mb-4" />
              <h3 className="heading-h4 mb-2">{t('services-assessment:duration')}</h3>
              <p className="body-default text-gray-600">{t('services-assessment:durationValue')}</p>
            </div>
            <div className="card text-center">
              <TrendingUp className="w-12 h-12 text-gold-300 mx-auto mb-4" />
              <h3 className="heading-h4 mb-2">{t('services-assessment:typicalRoi')}</h3>
              <p className="body-default text-gray-600">{t('services-assessment:typicalRoiValue')}</p>
            </div>
            <div className="card text-center">
              <CheckCircle className="w-12 h-12 text-teal-500 mx-auto mb-4" />
              <h3 className="heading-h4 mb-2">{t('services-assessment:quickWins')}</h3>
              <p className="body-default text-gray-600">{t('services-assessment:quickWinsValue')}</p>
            </div>
          </div>

          <div className="card bg-navy-500 text-white">
            <h3 className="heading-h3 mb-4">{t('services-assessment:investmentRoi')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="body-small text-gray-300 mb-2">{t('services-assessment:investment')}</p>
                <p className="heading-h3 text-gold-300">₹1,49,999</p>
                <p className="body-small text-gray-300 mt-2">{t('services-assessment:oneTime57Days')}</p>
              </div>
              <div>
                <p className="body-small text-gray-300 mb-2">{t('services-assessment:typicalRoi')}</p>
                <p className="heading-h3 text-teal-400">₹40–60L</p>
                <p className="body-small text-gray-300 mt-2">{t('services-assessment:inRecoverableLeakage')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom text-center">
          <h2 className="heading-h2 mb-4">{t('services-assessment:readyTitle')}</h2>
          <p className="body-large text-gray-600 mb-8">
            {t('services-assessment:readyDescription')}
          </p>
          <Button variant="primary" size="lg" asChild>
            <Link href="/consulting/booking">{t('services-assessment:scheduleAssessment')}</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

