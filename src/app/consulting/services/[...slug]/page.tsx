'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageSchema } from '@/components/seo/page-schema';
import {
  getServiceCategoryBySlug,
  getServiceDetailBySlug,
  serviceCategorySlugToKey,
  serviceDetailSlugToKey,
} from '@/lib/services-catalog';
import { ClienteleChipsStrip } from '@/components/shared/clientele-chips';
import { TestimonialsBlock } from '@/components/shared/testimonials-block';
import { SuccessStoriesPreview } from '@/components/shared/success-stories-preview';

const HUB_SUCCESS_STORIES = '/consulting/case-studies/hub?tab=success-stories';

export default function ServiceSlugPage() {
  const params = useParams();
  const slug = params?.slug;
  const slugArray = Array.isArray(slug) ? slug : slug ? [slug] : [];
  const slugPath = slugArray.join('/');
  const [first, ...rest] = slugArray;
  const category = rest.length === 0 && first ? getServiceCategoryBySlug(first) : null;
  const detail = slugPath ? getServiceDetailBySlug(slugPath) : null;

  const { t } = useTranslation(['services', 'services-catalog', 'services-detail', 'about-clientele', 'about', 'common']);

  const translatedCategory = useMemo(() => {
    if (!category) return null;
    const key = serviceCategorySlugToKey[category.slug];
    if (!key) return category;
    return {
      ...category,
      title: t('services-catalog:' + key + '.title'),
      description: t('services-catalog:' + key + '.description'),
      primaryCta: { ...category.primaryCta, title: t('services-catalog:' + key + '.primaryCta') },
      secondaryCta: { ...category.secondaryCta, title: t('services-catalog:' + key + '.secondaryCta') },
      items: category.items.map((item, i) => ({
        ...item,
        title: t('services-catalog:' + key + '.item' + (i + 1)),
      })),
    };
  }, [category, t]);

  const translatedDetail = useMemo(() => {
    if (!detail) return null;
    const key = serviceDetailSlugToKey[detail.slug];
    if (!key) return detail;
    const outcomes = t('services-detail:' + key + '.outcomes', { returnObjects: true });
    return {
      ...detail,
      title: t('services-detail:' + key + '.title'),
      heroSubheadline: t('services-detail:' + key + '.heroSubheadline'),
      outcomesLabel: t('services-detail:' + key + '.outcomesLabel'),
      outcomes: Array.isArray(outcomes) ? outcomes : detail.outcomes,
      timelineLabel: t('services-detail:' + key + '.timelineLabel'),
      timeline: t('services-detail:' + key + '.timeline'),
      primaryCta: { ...detail.primaryCta, title: t('services-detail:' + key + '.primaryCta') },
      secondaryCta: { ...detail.secondaryCta, title: t('services-detail:' + key + '.secondaryCta') },
    };
  }, [detail, t]);

  if (!category && !detail) {
    notFound();
  }

  if (translatedCategory) {
    return (
      <>
        <PageSchema
          breadcrumbNameMap={{
            consulting: t('common:consulting', 'Consulting'),
            services: t('services:title'),
          }}
        />
        <div className="min-h-screen bg-gray-50">
          <section className="section-padding bg-gradient-to-br from-navy-500 to-teal-600 text-white">
            <div className="container-custom">
              <div className="max-w-3xl">
                <h1 className="heading-hero mb-6 text-white" suppressHydrationWarning>{translatedCategory.title}</h1>
                <p className="body-large text-gray-100 mb-8" suppressHydrationWarning>{translatedCategory.description}</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="primary" size="lg" asChild>
                    <Link href={translatedCategory.primaryCta.href} suppressHydrationWarning>{translatedCategory.primaryCta.title}</Link>
                  </Button>
                  <Button variant="secondary" size="lg" asChild>
                    <Link href={translatedCategory.secondaryCta.href} suppressHydrationWarning>{translatedCategory.secondaryCta.title}</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          <section className="section-padding bg-white">
            <div className="container-custom">
              <h2 className="heading-h2 mb-8" suppressHydrationWarning>{t('services:servicesInThisTrack')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {translatedCategory.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="card hover:shadow-lg transition-shadow border border-gray-100"
                  >
                    <h3 className="heading-h4 text-navy-500 mb-2" suppressHydrationWarning>{item.title}</h3>
                    <p className="body-default text-teal-600 font-semibold" suppressHydrationWarning>{t('services:viewDetails')}</p>
                  </Link>
                ))}
              </div>

              {translatedCategory.slug === 'process-excellence-solutions' && (() => {
                const clientele = t('about-clientele:clientele', { returnObjects: true }) as Record<string, string[]>;
                const names = clientele?.processExcellence;
                return names?.length ? (
                  <>
                    <h2 className="heading-h2 mt-12 mb-4" suppressHydrationWarning>{t('services:clienteleTitle')}</h2>
                    <ClienteleChipsStrip names={names} className="mb-10" />
                    <h2 className="heading-h2 mb-4" suppressHydrationWarning>{t('services:testimonialsTitle')}</h2>
                    <TestimonialsBlock indices={[0, 1]} variant="cards" className="mb-10 grid-cols-1 md:grid-cols-2" />
                    <h2 className="heading-h2 mb-6" suppressHydrationWarning>{t('services:successStoriesTitle')}</h2>
                    <SuccessStoriesPreview
                      clients={['Solaraa', 'Anexx', 'Asta by Avim']}
                      variant="mini"
                      viewAllHref={HUB_SUCCESS_STORIES}
                      viewAllLabel={t('services:viewAllSuccessStories')}
                    />
                  </>
                ) : null;
              })()}

              {translatedCategory.slug === 'fundraise-support-strategy' && (() => {
                const clientele = t('about-clientele:clientele', { returnObjects: true }) as Record<string, string[]>;
                const names = clientele?.fundraise;
                return (
                  <>
                    {names?.length ? (
                      <>
                        <h2 className="heading-h2 mt-12 mb-4" suppressHydrationWarning>{t('services:clienteleTitle')}</h2>
                        <ClienteleChipsStrip names={names} className="mb-10" />
                      </>
                    ) : null}
                    <h2 className="heading-h2 mb-6" suppressHydrationWarning>{t('services:successStoriesTitle')}</h2>
                    <SuccessStoriesPreview
                      clients={['Vasundhara Nirmiti Properties']}
                      variant="mini"
                      viewAllHref={HUB_SUCCESS_STORIES}
                      viewAllLabel={t('services:viewAllSuccessStories')}
                    />
                  </>
                );
              })()}

              {translatedCategory.slug === 'govt-project-liaison' && (() => {
                const clientele = t('about-clientele:clientele', { returnObjects: true }) as Record<string, string[]>;
                const names = clientele?.govtLiaison;
                return names?.length ? (
                  <>
                    <h2 className="heading-h2 mt-12 mb-4" suppressHydrationWarning>{t('services:clienteleTitle')}</h2>
                    <ClienteleChipsStrip names={names} className="mb-6" />
                    <h2 className="heading-h2 mb-4" suppressHydrationWarning>{t('services:testimonialsTitle')}</h2>
                    <TestimonialsBlock indices={[2]} variant="cards" className="grid-cols-1" />
                  </>
                ) : null;
              })()}
            </div>
          </section>

          <section className="section-padding bg-navy-500 text-white">
            <div className="container-custom text-center">
              <h2 className="heading-h2 mb-4 text-white">{t('about:readyTitle')}</h2>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="primary" size="lg" asChild className="bg-gold-300 text-navy-500 hover:bg-gold-400">
                  <Link href={translatedCategory.primaryCta.href}>{translatedCategory.primaryCta.title}</Link>
                </Button>
                <Button variant="outline" size="lg" asChild className="border-white text-white hover:bg-white/10">
                  <Link href={translatedCategory.secondaryCta.href}>{translatedCategory.secondaryCta.title}</Link>
                </Button>
              </div>
            </div>
          </section>
        </div>
      </>
    );
  }

  if (!translatedDetail) {
    notFound();
  }

  return (
    <>
      <PageSchema
        breadcrumbNameMap={{
          consulting: t('common:consulting', 'Consulting'),
          services: t('services:title'),
        }}
      />
      <div className="min-h-screen bg-gray-50">
        <section className="section-padding bg-gradient-to-br from-navy-500 to-teal-600 text-white">
          <div className="container-custom">
            <div className="max-w-3xl">
              <h1 className="heading-hero mb-6 text-white" suppressHydrationWarning>{translatedDetail.title}</h1>
              <p className="body-large text-gray-100 mb-8" suppressHydrationWarning>{translatedDetail.heroSubheadline}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="primary" size="lg" asChild>
                  <Link href={translatedDetail.primaryCta.href} suppressHydrationWarning>{translatedDetail.primaryCta.title}</Link>
                </Button>
                <Button variant="secondary" size="lg" asChild>
                  <Link href={translatedDetail.secondaryCta.href} suppressHydrationWarning>{translatedDetail.secondaryCta.title}</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-custom">
            <h2 className="heading-h2 mb-8" suppressHydrationWarning>{translatedDetail.outcomesLabel}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
              {translatedDetail.outcomes.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-teal-500 flex-shrink-0 mt-1" />
                  <p className="body-default text-gray-700" suppressHydrationWarning>{item}</p>
                </div>
              ))}
            </div>

            <div className="card bg-navy-500 text-white">
              <div>
                <p className="body-small text-gray-300 mb-2" suppressHydrationWarning>{translatedDetail.timelineLabel}</p>
                <p className="heading-h4 text-gold-300" suppressHydrationWarning>{translatedDetail.timeline}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
