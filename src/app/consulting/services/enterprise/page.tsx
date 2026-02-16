'use client';

import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CheckCircle, Building2, Users, Shield } from 'lucide-react';
import { PageSchema } from '@/components/seo/page-schema';
import { ServiceSchema } from '@/components/seo/service-schema';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export default function EnterpriseServicePage() {
  const { t } = useTranslation(['services-enterprise', 'services', 'common']);
  return (
    <>
      <PageSchema breadcrumbNameMap={{ consulting: t('common:consulting'), services: t('services:title'), enterprise: t('services-enterprise:title') }} />
      <ServiceSchema
        service={{
          name: t('services-enterprise:title'),
          description: t('services-enterprise:subtitle'),
          provider: {
            name: 'TwelfthKey™ Consulting',
            url: BASE_URL,
          },
          areaServed: 'IN',
          serviceType: 'Business Consulting',
          offers: {
            price: '799999',
            priceCurrency: 'INR',
          },
          url: '/consulting/services/enterprise',
        }}
      />
      <div className="min-h-screen bg-gray-50">
      <section className="section-padding bg-gradient-to-br from-navy-500 to-teal-600 text-white">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="heading-hero mb-6 text-white">{t('services-enterprise:title')}</h1>
            <p className="body-large text-gray-100 mb-8">
              {t('services-enterprise:subtitle')}
            </p>
            <Button variant="primary" size="lg" asChild>
              <Link href="/consulting/booking">{t('services-enterprise:scaleWithGovernance')}</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <h2 className="heading-h2 mb-8">{t('services-enterprise:whatsIncluded')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {[
              t('services-enterprise:item1'),
              t('services-enterprise:item2'),
              t('services-enterprise:item3'),
              t('services-enterprise:item4'),
              t('services-enterprise:item5'),
              t('services-enterprise:item6'),
              t('services-enterprise:item7'),
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-teal-500 flex-shrink-0 mt-1" />
                <p className="body-default text-gray-700">{item}</p>
              </div>
            ))}
          </div>

          <div className="mb-8">
            <h2 className="heading-h2 mb-8">{t('services-enterprise:enterpriseUseCases')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: Building2,
                  title: t('services-enterprise:rapidMaIntegration.title'),
                  desc: t('services-enterprise:rapidMaIntegration.desc'),
                },
                {
                  icon: Users,
                  title: t('services-enterprise:multiLocationScaling.title'),
                  desc: t('services-enterprise:multiLocationScaling.desc'),
                },
                {
                  icon: Shield,
                  title: t('services-enterprise:complianceAuditReadiness.title'),
                  desc: t('services-enterprise:complianceAuditReadiness.desc'),
                },
                {
                  icon: Building2,
                  title: t('services-enterprise:digitalTransformation.title'),
                  desc: t('services-enterprise:digitalTransformation.desc'),
                },
                {
                  icon: Users,
                  title: t('services-enterprise:globalExpansion.title'),
                  desc: t('services-enterprise:globalExpansion.desc'),
                },
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

          <div className="mb-8">
            <h2 className="heading-h2 mb-8">{t('services-enterprise:keyFeatures')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                t('services-enterprise:feature1'),
                t('services-enterprise:feature2'),
                t('services-enterprise:feature3'),
                t('services-enterprise:feature4'),
                t('services-enterprise:feature5'),
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-gold-300 flex-shrink-0 mt-1" />
                  <p className="body-default text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card bg-navy-500 text-white">
            <h3 className="heading-h3 mb-4">{t('services-enterprise:investmentRoi')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="body-small text-gray-300 mb-2">{t('services-enterprise:investment')}</p>
                <p className="heading-h3 text-gold-300">₹7,99,999</p>
                <p className="body-small text-gray-300 mt-2">{t('services-enterprise:investmentValue')}</p>
              </div>
              <div>
                <p className="body-small text-gray-300 mb-2">{t('services-enterprise:typicalRoi')}</p>
                <p className="heading-h3 text-teal-400">₹100–150L</p>
                <p className="body-small text-gray-300 mt-2">{t('services-enterprise:roiValue')}</p>
                <p className="body-small text-gray-300">{t('services-enterprise:governanceStandardization')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom text-center">
          <h2 className="heading-h2 mb-4">{t('services-enterprise:readyTitle')}</h2>
          <p className="body-large text-gray-600 mb-8">
            {t('services-enterprise:readyDescription')}
          </p>
          <Button variant="primary" size="lg" asChild>
            <Link href="/consulting/booking">{t('services-enterprise:scheduleAssessment')}</Link>
          </Button>
        </div>
      </section>
    </div>
    </>
  );
}
