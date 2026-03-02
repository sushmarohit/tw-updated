'use client';

import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Users, Heart, Briefcase, Award } from 'lucide-react';

export default function AboutPage() {
  const { t } = useTranslation(['about', 'common']);

  const sections = [
    {
      icon: Users,
      title: t('about:team.title'),
      description: t('about:team.description'),
      href: '/consulting/about/team',
      color: 'teal',
    },
    {
      icon: Award,
      title: t('about:clientele.title'),
      description: t('about:clientele.description'),
      href: '/consulting/about/clientele',
      color: 'gold',
    },
    {
      icon: Heart,
      title: t('about:values.title'),
      description: t('about:values.description'),
      href: '/consulting/about/values',
      color: 'gold',
    },
    {
      icon: Briefcase,
      title: t('about:careers.title'),
      description: t('about:careers.description'),
      href: '/consulting/about/careers',
      color: 'teal',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="section-padding bg-gradient-to-br from-navy-500 to-teal-600 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-hero mb-6 text-white">{t('about:title')}</h1>
            <p className="body-large text-gray-100">
              {t('about:subtitle')}
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto mb-8">
            <h2 className="heading-h2 mb-6">{t('about:missionTitle')}</h2>
            <p className="body-large text-gray-700 mb-4">
              {t('about:missionQuote')}
            </p>
            <p className="body-default text-gray-600">
              {t('about:missionDescription')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <div key={index} className="card">
                  <div className={`w-16 h-16 bg-${section.color}-100 rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className={`w-8 h-8 text-${section.color}-500`} aria-hidden="true" />
                  </div>
                  <h2 className="heading-h4 mb-3">{section.title}</h2>
                  <p className="body-default text-gray-600 mb-6">{section.description}</p>
                  <Button variant="outline" asChild>
                    <Link href={section.href}>{t('common:learnMore')}</Link>
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom text-center">
          <h2 className="heading-h2 mb-4">{t('about:readyTitle')}</h2>
          <p className="body-large text-gray-600 mb-8">
            {t('about:readyDescription')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" asChild>
              <Link href="/consulting/booking">{t('common:bookDiscoveryCall')}</Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/consulting/contact">{t('common:contact')}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

