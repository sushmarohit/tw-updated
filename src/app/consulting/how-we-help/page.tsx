'use client';

import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Search, Map, Monitor } from 'lucide-react';

export default function HowWeHelpPage() {
  const { t } = useTranslation(['how-we-help', 'common']);
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="section-padding bg-gradient-to-br from-navy-500 to-teal-600 text-white">
        <div className="container-custom mx-auto flex flex-col items-center justify-center text-center">
          <div className="max-w-3xl w-full px-2 sm:px-4">
            <h1 className="heading-hero mb-4 sm:mb-6 text-white break-words">{t('how-we-help:title')}</h1>
            <p className="body-large text-gray-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
              {t('how-we-help:subtitle')}
            </p>
            <Button variant="primary" size="lg" asChild className="w-full sm:w-auto">
              <Link href="/consulting/booking">{t('how-we-help:bookDiscoveryCall')}</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <h2 className="heading-h2 text-center mb-8">{t('how-we-help:methodTitle')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            <div className="card text-center flex flex-col h-full">
              <div className="w-16 h-16 bg-teal-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-teal-500" />
              </div>
              <h3 className="heading-h4 mb-3">{t('how-we-help:strategicAssessment.title')}</h3>
              <p className="body-default text-gray-600 mb-4">
                {t('how-we-help:strategicAssessment.description')}
              </p>
              <Button variant="outline" asChild className="mt-auto">
                <Link href="/consulting/services/assessment">{t('how-we-help:strategicAssessment.button')}</Link>
              </Button>
            </div>
            <div className="card text-center flex flex-col h-full">
              <div className="w-16 h-16 bg-gold-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Map className="w-8 h-8 text-gold-300" />
              </div>
              <h3 className="heading-h4 mb-3">{t('how-we-help:tailoredSolutions.title')}</h3>
              <p className="body-default text-gray-600 mb-4">
                {t('how-we-help:tailoredSolutions.description')}
              </p>
              <Button variant="outline" asChild className="mt-auto">
                <Link href="/consulting/process">{t('how-we-help:tailoredSolutions.button')}</Link>
              </Button>
            </div>
            <div className="card text-center flex flex-col h-full">
              <div className="w-16 h-16 bg-teal-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Monitor className="w-8 h-8 text-teal-500" />
              </div>
              <h3 className="heading-h4 mb-3">{t('how-we-help:measurableGovernance.title')}</h3>
              <p className="body-default text-gray-600 mb-4">
                {t('how-we-help:measurableGovernance.description')}
              </p>
              <Button variant="outline" asChild className="mt-auto">
                <Link href="/consulting/tools/hub">{t('how-we-help:measurableGovernance.button')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

