'use client';

import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CheckCircle, RefreshCw, Brain, Shield } from 'lucide-react';
import { PageSchema } from '@/components/seo/page-schema';
import { ServiceSchema } from '@/components/seo/service-schema';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export default function GovernanceServicePage() {
  const { t } = useTranslation(['services-governance', 'services', 'common']);
  return (
    <>
      <PageSchema breadcrumbNameMap={{ consulting: 'Consulting', services: 'Services', governance: 'Governance Intelligence Program' }} />
      <ServiceSchema
        service={{
          name: t('services-governance:title'),
          description: t('services-governance:subtitle'),
          provider: {
            name: 'TwelfthKey™ Consulting',
            url: BASE_URL,
          },
          areaServed: 'IN',
          serviceType: 'Business Consulting',
          offers: {
            price: '499999',
            priceCurrency: 'INR',
          },
          url: '/consulting/services/governance',
        }}
      />
      <div className="min-h-screen bg-gray-50">
      <section className="section-padding bg-gradient-to-br from-navy-500 to-teal-600 text-white">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="heading-hero mb-6 text-white">{t('services-governance:title')}</h1>
            <p className="body-large text-gray-100 mb-8">
              {t('services-governance:subtitle')}
            </p>
            <Button variant="primary" size="lg" asChild>
              <Link href="/consulting/booking">{t('services-governance:establishGovernance')}</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <h2 className="heading-h2 mb-8">{t('services-governance:whatsIncluded')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {[
              t('services-governance:item1'),
              t('services-governance:item2'),
              t('services-governance:item3'),
              t('services-governance:item4'),
              t('services-governance:item5'),
              t('services-governance:item6'),
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-teal-500 flex-shrink-0 mt-1" />
                <p className="body-default text-gray-700">{item}</p>
              </div>
            ))}
          </div>

          <div className="mb-12">
            <h2 className="heading-h2 mb-8">{t('services-governance:theGovernanceLoop')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                { icon: RefreshCw, title: t('services-governance:plan.title'), desc: t('services-governance:plan.desc') },
                { icon: Brain, title: t('services-governance:monitor.title'), desc: t('services-governance:monitor.desc') },
                { icon: Shield, title: t('services-governance:analyze.title'), desc: t('services-governance:analyze.desc') },
                { icon: RefreshCw, title: t('services-governance:improve.title'), desc: t('services-governance:improve.desc') },
                { icon: Brain, title: t('services-governance:evolve.title'), desc: t('services-governance:evolve.desc') },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="card text-center">
                    <Icon className="w-10 h-10 text-teal-500 mx-auto mb-3" />
                    <h3 className="heading-h4 mb-2">{item.title}</h3>
                    <p className="body-small text-gray-600">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mb-12">
            <h2 className="heading-h2 mb-8">{t('services-governance:g2pIndicesTracked')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                { name: t('services-governance:par.name'), desc: t('services-governance:par.desc') },
                { name: t('services-governance:aq.name'), desc: t('services-governance:aq.desc') },
                { name: t('services-governance:cls.name'), desc: t('services-governance:cls.desc') },
                { name: t('services-governance:lv.name'), desc: t('services-governance:lv.desc') },
                { name: t('services-governance:mttar.name'), desc: t('services-governance:mttar.desc') },
              ].map((index, i) => (
                <div key={i} className="card text-center">
                  <div className="text-3xl font-bold text-gold-300 mb-2">{index.name}</div>
                  <p className="body-small text-gray-600">{index.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card bg-navy-500 text-white mb-12">
            <h3 className="heading-h3 mb-4">{t('services-governance:investmentRoi')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="body-small text-gray-300 mb-2">{t('services-governance:investment')}</p>
                <p className="heading-h3 text-gold-300">₹4,99,999</p>
                <p className="body-small text-gray-300 mt-2">{t('services-governance:investmentValue')}</p>
              </div>
              <div>
                <p className="body-small text-gray-300 mb-2">{t('services-governance:typicalRoi')}</p>
                <p className="heading-h3 text-teal-400">₹50–80L</p>
                <p className="body-small text-gray-300 mt-2">{t('services-governance:roiValue')}</p>
                <p className="body-small text-gray-300">{t('services-governance:governanceScoreImprovement')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom text-center">
          <h2 className="heading-h2 mb-4">{t('services-governance:readyTitle')}</h2>
          <p className="body-large text-gray-600 mb-8">
            {t('services-governance:readyDescription')}
          </p>
          <Button variant="primary" size="lg" asChild>
            <Link href="/consulting/booking">{t('services-governance:scheduleAssessment')}</Link>
          </Button>
        </div>
      </section>
    </div>
    </>
  );
}
