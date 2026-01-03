'use client';

import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileSearch, Building2, Brain, BarChart3, Command, Briefcase } from 'lucide-react';

export default function ServicesPage() {
  const { t } = useTranslation(['services', 'common']);

  const services = [
    {
      icon: FileSearch,
      name: t('services:businessOperationalAssessment.name'),
      description: t('services:businessOperationalAssessment.description'),
      href: '/consulting/services/assessment',
      color: 'teal',
    },
    {
      icon: Building2,
      name: t('services:operationalExcellenceFoundation.name'),
      description: t('services:operationalExcellenceFoundation.description'),
      href: '/consulting/services/foundation',
      color: 'gold',
    },
    {
      icon: Brain,
      name: t('services:governanceIntelligenceProgram.name'),
      description: t('services:governanceIntelligenceProgram.description'),
      href: '/consulting/services/governance',
      color: 'teal',
    },
    {
      icon: BarChart3,
      name: t('services:analyticsVisualizationSuite.name'),
      description: t('services:analyticsVisualizationSuite.description'),
      href: '/consulting/services/analytics',
      color: 'gold',
    },
    {
      icon: Command,
      name: t('services:enterpriseOpsCommandCenter.name'),
      description: t('services:enterpriseOpsCommandCenter.description'),
      href: '/consulting/services/enterprise',
      color: 'teal',
    },
    {
      icon: Briefcase,
      name: t('services:fractionalCBO.name'),
      description: t('services:fractionalCBO.description'),
      href: '/consulting/services/fractional-cbo',
      color: 'gold',
    },
  ];
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="section-padding bg-gradient-to-br from-navy-500 to-teal-600 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-hero mb-6 text-white">{t('services:title')}</h1>
            <p className="body-large text-gray-100">
              {t('services:subtitle')}
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="card">
                  <div className={`w-16 h-16 bg-${service.color}-100 rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className={`w-8 h-8 text-${service.color}-500`} aria-hidden="true" />
                  </div>
                  <h2 className="heading-h4 mb-3">{service.name}</h2>
                  <p className="body-default text-gray-600 mb-6">{service.description}</p>
                  <Button variant="outline" asChild>
                    <Link href={service.href}>{t('services:learnMore')}</Link>
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom text-center">
          <h2 className="heading-h2 mb-4">{t('services:notSureTitle')}</h2>
          <p className="body-large text-gray-600 mb-8 max-w-2xl mx-auto">
            {t('services:notSureDescription')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" asChild size="lg">
              <Link href="/consulting/tools/health-check">{t('services:startFreeDiagnostic')}</Link>
            </Button>
            <Button variant="secondary" asChild size="lg">
              <Link href="/consulting/booking">{t('services:bookDiscoveryCall')}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

