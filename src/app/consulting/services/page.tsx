'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { PageSchema } from '@/components/seo/page-schema';
import { serviceCategories, serviceCategorySlugToKey } from '@/lib/services-catalog';

export default function ServicesPage() {
  const { t } = useTranslation(['services', 'services-catalog', 'common']);

  const translatedCategories = useMemo(
    () =>
      serviceCategories.map((cat) => {
        const key = serviceCategorySlugToKey[cat.slug];
        if (!key) return cat;
        return {
          ...cat,
          title: t('services-catalog:' + key + '.title'),
          description: t('services-catalog:' + key + '.description'),
          primaryCta: { ...cat.primaryCta, title: t('services-catalog:' + key + '.primaryCta') },
          secondaryCta: { ...cat.secondaryCta, title: t('services-catalog:' + key + '.secondaryCta') },
          items: cat.items.map((item, i) => ({
            ...item,
            title: t('services-catalog:' + key + '.item' + (i + 1)),
          })),
        };
      }),
    [t]
  );

  return (
    <>
      <PageSchema breadcrumbNameMap={{ consulting: 'Consulting', services: t('services:title') }} />
      <div className="min-h-screen bg-gray-50">
        <section className="section-padding bg-gradient-to-br from-navy-500 to-teal-600 text-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="heading-hero mb-6 text-white">{t('services:title')}</h1>
              <p className="body-large text-gray-100">{t('services:subtitle')}</p>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {translatedCategories.map((category) => (
                <div key={category.slug} className="card">
                  <h2 className="heading-h4 mb-3">{category.title}</h2>
                  <p className="body-default text-gray-600 mb-5">{category.description}</p>
                  <ul className="space-y-2 mb-6">
                    {category.items.map((item) => (
                      <li key={item.href}>
                        <Link className="text-navy-500 hover:text-teal-500 transition-colors" href={item.href}>
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-col gap-3">
                    <Button variant="primary" asChild>
                      <Link href={category.primaryCta.href}>{category.primaryCta.title}</Link>
                    </Button>
                    <Button variant="secondary" asChild>
                      <Link href={category.secondaryCta.href}>{category.secondaryCta.title}</Link>
                    </Button>
                  </div>
                </div>
              ))}
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
    </>
  );
}

