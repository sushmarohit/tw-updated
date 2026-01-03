'use client';

import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Phone, FileSearch, Map, Cog, TrendingUp } from 'lucide-react';

export default function ProcessPage() {
  const { t } = useTranslation(['process', 'common']);

  const steps = [
    {
      icon: Phone,
      title: t('process:step1.title'),
      duration: t('process:step1.duration'),
      description: t('process:step1.description'),
    },
    {
      icon: FileSearch,
      title: t('process:step2.title'),
      duration: t('process:step2.duration'),
      description: t('process:step2.description'),
    },
    {
      icon: Map,
      title: t('process:step3.title'),
      duration: t('process:step3.duration'),
      description: t('process:step3.description'),
    },
    {
      icon: Cog,
      title: t('process:step4.title'),
      duration: t('process:step4.duration'),
      description: t('process:step4.description'),
    },
    {
      icon: TrendingUp,
      title: t('process:step5.title'),
      duration: t('process:step5.duration'),
      description: t('process:step5.description'),
    },
  ];
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="section-padding bg-gradient-to-br from-navy-500 to-teal-600 text-white">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="heading-hero mb-6 text-white">{t('process:title')}</h1>
            <p className="body-large text-gray-100 mb-8">
              {t('process:subtitle')}
            </p>
            <Button variant="primary" size="lg" asChild>
              <Link href="/consulting/booking">{t('process:bookDiscoveryCall')}</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <h2 className="heading-h2 text-center mb-12">{t('process:stepTitle')}</h2>
          <div className="space-y-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="card">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-8 h-8 text-teal-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <span className="text-2xl font-bold text-navy-500">STEP {index + 1}</span>
                        <span className="body-small text-gray-500">{step.duration}</span>
                      </div>
                      <h3 className="heading-h4 mb-3">{step.title}</h3>
                      <p className="body-default text-gray-600">{step.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom text-center">
          <h2 className="heading-h2 mb-4">{t('process:readyTitle')}</h2>
          <p className="body-large text-gray-600 mb-8">
            {t('process:readyDescription')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" asChild>
              <Link href="/consulting/booking">{t('process:bookYourDiscoveryCall')}</Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/consulting/tools/health-check">{t('process:tryFreeDiagnostic')}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

