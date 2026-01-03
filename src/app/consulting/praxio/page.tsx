'use client';

import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Eye, FileText, Brain, Shield } from 'lucide-react';

export default function PraxioPage() {
  const { t } = useTranslation(['praxio', 'common']);
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="section-padding bg-gradient-to-br from-navy-500 to-teal-600 text-white">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="heading-hero mb-6 text-white">{t('praxio:title')}</h1>
            <p className="body-large text-gray-100 mb-8">
              {t('praxio:subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="primary" size="lg" asChild>
                <Link href="/consulting/praxio/demo">{t('praxio:requestDemo')}</Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/consulting/praxio/pricing">{t('praxio:viewPricing')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <h2 className="heading-h2 mb-8">{t('praxio:whatIsTitle')}</h2>
          <div className="card mb-12">
            <p className="body-large text-gray-700 mb-4">
              {t('praxio:whatIsDescription')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                t('praxio:realTimeVisibility'),
                t('praxio:automatedReporting'),
                t('praxio:aiAlerts'),
                t('praxio:teamAccountability'),
                t('praxio:scalable'),
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-teal-500 flex-shrink-0 mt-1" />
                  <p className="body-default text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <h2 className="heading-h2 mb-8">{t('praxio:keyFeatures')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: Eye,
                title: t('praxio:realTimeKPIDashboards.title'),
                desc: t('praxio:realTimeKPIDashboards.description'),
              },
              {
                icon: FileText,
                title: t('praxio:automatedReportingFeature.title'),
                desc: t('praxio:automatedReportingFeature.description'),
              },
              {
                icon: Brain,
                title: t('praxio:aiAnomalyDetection.title'),
                desc: t('praxio:aiAnomalyDetection.description'),
              },
              {
                icon: Shield,
                title: t('praxio:roleBasedAccess.title'),
                desc: t('praxio:roleBasedAccess.description'),
              },
              {
                icon: Brain,
                title: t('praxio:integration.title'),
                desc: t('praxio:integration.description'),
              },
              {
                icon: Eye,
                title: t('praxio:mobileResponsive.title'),
                desc: t('praxio:mobileResponsive.description'),
              },
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div key={i} className="card">
                  <Icon className="w-10 h-10 text-teal-500 mb-3" />
                  <h3 className="heading-h4 mb-2">{feature.title}</h3>
                  <p className="body-default text-gray-600">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom text-center">
          <h2 className="heading-h2 mb-4">{t('praxio:readyTitle')}</h2>
          <p className="body-large text-gray-600 mb-8">
            {t('praxio:readyDescription')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" asChild>
              <Link href="/consulting/praxio/demo">{t('praxio:requestDemoButton')}</Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/consulting/praxio/pricing">{t('praxio:viewPricing')}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
