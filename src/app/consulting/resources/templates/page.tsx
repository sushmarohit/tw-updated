'use client';

import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FileText, Grid } from 'lucide-react';

export default function TemplatesPage() {
  const { t } = useTranslation(['templates', 'common']);

  const templateCategories = [
    {
      title: t('templates:categories.sop.title'),
      count: t('templates:categories.sop.count'),
      description: t('templates:categories.sop.description'),
      icon: FileText,
    },
    {
      title: t('templates:categories.dashboard.title'),
      count: t('templates:categories.dashboard.count'),
      description: t('templates:categories.dashboard.description'),
      icon: Grid,
    },
    {
      title: t('templates:categories.governance.title'),
      count: t('templates:categories.governance.count'),
      description: t('templates:categories.governance.description'),
      icon: FileText,
    },
    {
      title: t('templates:categories.process.title'),
      count: t('templates:categories.process.count'),
      description: t('templates:categories.process.description'),
      icon: Grid,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="section-padding bg-gradient-to-br from-navy-500 to-teal-600 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-hero mb-6 text-white">{t('templates:title')}</h1>
            <p className="body-large text-gray-100">
              {t('templates:subtitle')}
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {templateCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <div key={index} className="card">
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-teal-500" />
                  </div>
                  <h2 className="heading-h4 mb-2">{category.title}</h2>
                  <p className="body-default text-gray-600 mb-4">{category.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{category.count}</span>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="#">{t('templates:browse')}</Link>
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom text-center">
          <h2 className="heading-h2 mb-4">{t('templates:customTitle')}</h2>
          <p className="body-large text-gray-600 mb-8">
            {t('templates:customDescription')}
          </p>
          <Button variant="primary" size="lg" asChild>
            <Link href="/consulting/contact">{t('templates:requestCustom')}</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

