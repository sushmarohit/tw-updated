'use client';

import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { BookOpen, FileText, Video, TrendingUp } from 'lucide-react';

export default function ResourcesPage() {
  const { t } = useTranslation(['resources', 'common']);

  const resources = [
    {
      icon: BookOpen,
      title: t('resources:blog.title'),
      description: t('resources:blog.description'),
      href: '/consulting/blog',
      color: 'teal',
    },
    {
      icon: FileText,
      title: t('resources:playbooks.title'),
      description: t('resources:playbooks.description'),
      href: '/consulting/resources/playbooks',
      color: 'gold',
    },
    {
      icon: FileText,
      title: t('resources:templates.title'),
      description: t('resources:templates.description'),
      href: '/consulting/resources/templates',
      color: 'teal',
    },
    {
      icon: Video,
      title: t('resources:webinars.title'),
      description: t('resources:webinars.description'),
      href: '/consulting/resources/webinars',
      color: 'gold',
    },
    {
      icon: TrendingUp,
      title: t('resources:roiGuide.title'),
      description: t('resources:roiGuide.description'),
      href: '/consulting/resources/roi-guide',
      color: 'teal',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="section-padding bg-gradient-to-br from-navy-500 to-teal-600 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-hero mb-6 text-white">{t('resources:title')}</h1>
            <p className="body-large text-gray-100">
              {t('resources:subtitle')}
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <div key={index} className="card">
                  <div className={`w-16 h-16 bg-${resource.color}-100 rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className={`w-8 h-8 text-${resource.color}-500`} aria-hidden="true" />
                  </div>
                  <h2 className="heading-h4 mb-3">{resource.title}</h2>
                  <p className="body-default text-gray-600 mb-6">{resource.description}</p>
                  <Button variant="outline" asChild>
                    <Link href={resource.href}>{t('resources:explore')}</Link>
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom text-center">
          <h2 className="heading-h2 mb-4">{t('resources:needGuidanceTitle')}</h2>
          <p className="body-large text-gray-600 mb-8">
            {t('resources:needGuidanceDescription')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" asChild>
              <Link href="/consulting/booking">{t('common:bookDiscoveryCall')}</Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/consulting/tools/health-check">{t('common:startFreeDiagnostic')}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

