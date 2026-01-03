'use client';

import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CheckCircle, Clock, TrendingUp, FileText } from 'lucide-react';

export default function FoundationServicePage() {
  const { t } = useTranslation(['services-foundation', 'common']);
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="section-padding bg-gradient-to-br from-navy-500 to-teal-600 text-white">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="heading-hero mb-6 text-white">{t('services-foundation:title')}</h1>
            <p className="body-large text-gray-100 mb-8">
              {t('services-foundation:subtitle')}
            </p>
            <Button variant="primary" size="lg" asChild>
              <Link href="/consulting/booking">{t('services-foundation:buildYourFoundation')}</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <h2 className="heading-h2 mb-8">{t('services-foundation:whatsIncluded')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {[
              t('services-foundation:item1'),
              t('services-foundation:item2'),
              t('services-foundation:item3'),
              t('services-foundation:item4'),
              t('services-foundation:item5'),
              t('services-foundation:item6'),
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-teal-500 flex-shrink-0 mt-1" />
                <p className="body-default text-gray-700">{item}</p>
              </div>
            ))}
          </div>

          <div className="mb-12">
            <h2 className="heading-h2 mb-8">{t('services-foundation:implementationTimeline')}</h2>
            <div className="space-y-6">
              {[
                { phase: t('services-foundation:week1'), title: t('services-foundation:week1Title') },
                { phase: t('services-foundation:week24'), title: t('services-foundation:week24Title') },
                { phase: t('services-foundation:week56'), title: t('services-foundation:week56Title') },
                { phase: t('services-foundation:week78'), title: t('services-foundation:week78Title') },
                { phase: t('services-foundation:week912'), title: t('services-foundation:week912Title') },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-6">
                  <div className="w-24 flex-shrink-0">
                    <p className="font-semibold text-teal-500">{item.phase}</p>
                  </div>
                  <p className="body-default text-gray-700 flex-1">{item.title}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="card text-center">
              <TrendingUp className="w-12 h-12 text-teal-500 mx-auto mb-4" />
              <h3 className="heading-h4 mb-2">{t('services-foundation:processConsistency')}</h3>
              <p className="body-default text-gray-600">{t('services-foundation:improved')} {t('services-foundation:improvedValue1')}</p>
            </div>
            <div className="card text-center">
              <Clock className="w-12 h-12 text-gold-300 mx-auto mb-4" />
              <h3 className="heading-h4 mb-2">{t('services-foundation:decisionSpeed')}</h3>
              <p className="body-default text-gray-600">{t('services-foundation:improved')} {t('services-foundation:improvedValue2')}</p>
            </div>
            <div className="card text-center">
              <FileText className="w-12 h-12 text-teal-500 mx-auto mb-4" />
              <h3 className="heading-h4 mb-2">{t('services-foundation:costLeakage')}</h3>
              <p className="body-default text-gray-600">{t('services-foundation:reduced')} {t('services-foundation:reducedValue')}</p>
            </div>
          </div>

          <div className="card bg-navy-500 text-white">
            <h3 className="heading-h3 mb-4">{t('services-foundation:investmentRoi')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="body-small text-gray-300 mb-2">{t('services-foundation:investment')}</p>
                <p className="heading-h3 text-gold-300">₹2,99,999</p>
                <p className="body-small text-gray-300 mt-2">{t('services-foundation:oneTime60Days')}</p>
              </div>
              <div>
                <p className="body-small text-gray-300 mb-2">{t('services-foundation:typicalRoi')}</p>
                <p className="heading-h3 text-teal-400">₹20–40L</p>
                <p className="body-small text-gray-300 mt-2">{t('services-foundation:inAnnualCostSavings')}</p>
                <p className="body-small text-gray-300">{t('services-foundation:paybackPeriod')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom text-center">
          <h2 className="heading-h2 mb-4">{t('services-foundation:readyTitle')}</h2>
          <p className="body-large text-gray-600 mb-8">
            {t('services-foundation:readyDescription')}
          </p>
          <Button variant="primary" size="lg" asChild>
            <Link href="/consulting/booking">{t('services-foundation:scheduleAssessment')}</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
