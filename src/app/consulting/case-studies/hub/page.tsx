'use client';

import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { TrendingUp, Building2, Smartphone, Factory, ShoppingCart } from 'lucide-react';

export default function CaseStudiesHubPage() {
  const { t } = useTranslation(['case-studies-hub', 'common']);

  const caseStudies = [
    {
      icon: Building2,
      title: t('case-studies-hub:banking.title'),
      industry: t('case-studies-hub:banking.industry'),
      size: t('case-studies-hub:banking.size'),
      challenge: t('case-studies-hub:banking.challenge'),
      result: t('case-studies-hub:banking.result'),
      href: '/consulting/case-studies/banking',
    },
    {
      icon: TrendingUp,
      title: t('case-studies-hub:fintech.title'),
      industry: t('case-studies-hub:fintech.industry'),
      size: t('case-studies-hub:fintech.size'),
      challenge: t('case-studies-hub:fintech.challenge'),
      result: t('case-studies-hub:fintech.result'),
      href: '/consulting/case-studies/fintech',
    },
    {
      icon: Smartphone,
      title: t('case-studies-hub:telecom.title'),
      industry: t('case-studies-hub:telecom.industry'),
      size: t('case-studies-hub:telecom.size'),
      challenge: t('case-studies-hub:telecom.challenge'),
      result: t('case-studies-hub:telecom.result'),
      href: '/consulting/case-studies/telecom',
    },
    {
      icon: Factory,
      title: t('case-studies-hub:msme.title'),
      industry: t('case-studies-hub:msme.industry'),
      size: t('case-studies-hub:msme.size'),
      challenge: t('case-studies-hub:msme.challenge'),
      result: t('case-studies-hub:msme.result'),
      href: '/consulting/case-studies/msme',
    },
    {
      icon: ShoppingCart,
      title: t('case-studies-hub:ecommerce.title'),
      industry: t('case-studies-hub:ecommerce.industry'),
      size: t('case-studies-hub:ecommerce.size'),
      challenge: t('case-studies-hub:ecommerce.challenge'),
      result: t('case-studies-hub:ecommerce.result'),
      href: '/consulting/case-studies/ecommerce',
    },
  ];
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="section-padding bg-gradient-to-br from-navy-500 to-teal-600 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-hero mb-6 text-white">{t('case-studies-hub:title')}</h1>
            <p className="body-large text-gray-100">
              {t('case-studies-hub:subtitle')}
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => {
              const Icon = study.icon;
              return (
                <div key={index} className="card">
                  <div className="w-16 h-16 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-8 h-8 text-teal-500" aria-hidden="true" />
                  </div>
                  <div className="mb-2">
                    <span className="body-small text-gray-500">{study.industry}</span>
                    <span className="body-small text-gray-500 mx-2">•</span>
                    <span className="body-small text-gray-500">{study.size}</span>
                  </div>
                  <h2 className="heading-h4 mb-3">{study.title}</h2>
                  <div className="mb-4">
                    <p className="body-small font-semibold text-gray-700 mb-1">{t('case-studies-hub:challenge')}</p>
                    <p className="body-default text-gray-600 mb-3">{study.challenge}</p>
                    <p className="body-small font-semibold text-gray-700 mb-1">{t('case-studies-hub:result')}</p>
                    <p className="body-default text-gray-600">{study.result}</p>
                  </div>
                  <Button variant="outline" asChild className="w-full">
                    <Link href={study.href}>{t('case-studies-hub:readFullStory')}</Link>
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom text-center">
          <h2 className="heading-h2 mb-4">{t('case-studies-hub:readyTitle')}</h2>
          <p className="body-large text-gray-600 mb-8">
            {t('case-studies-hub:readyDescription')}
          </p>
          <Button variant="primary" size="lg" asChild>
            <Link href="/consulting/booking">{t('case-studies-hub:getCustomAssessment')}</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

