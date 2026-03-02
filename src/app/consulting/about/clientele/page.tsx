'use client';

import { useTranslation } from 'react-i18next';
import { PageSchema } from '@/components/seo/page-schema';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Quote, Award, Building2 } from 'lucide-react';

const CATEGORY_KEYS = ['processExcellence', 'fundraise', 'govtLiaison'] as const;

export default function ClientelePage() {
  const { t } = useTranslation(['about-clientele', 'about', 'common']);

  const clientele = t('about-clientele:clientele', { returnObjects: true }) as Record<string, string[]>;
  const categories = t('about-clientele:categories', { returnObjects: true }) as Record<string, string>;
  const testimonials = t('about-clientele:testimonials', { returnObjects: true }) as Array<{
    quote: string;
    author: string;
    category: string;
  }>;
  const successStories = t('about-clientele:successStories', { returnObjects: true }) as Array<{
    client: string;
    headline: string;
    category: string;
    problem: string;
    whatWeDid: string;
    result: string;
  }>;

  return (
    <>
      <PageSchema
        breadcrumbNameMap={{
          consulting: 'Consulting',
          about: 'About',
          clientele: 'Clientele & Testimonials',
        }}
      />
      <div className="min-h-screen bg-gray-50">
        <section className="section-padding bg-gradient-to-br from-navy-500 to-teal-600 text-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="heading-hero mb-6 text-white">{t('about-clientele:title')}</h1>
              <p className="body-large text-gray-100">{t('about-clientele:subtitle')}</p>
            </div>
          </div>
        </section>

        {/* Clientele name chips */}
        <section className="section-padding bg-white border-b border-gray-100">
          <div className="container-custom">
            <h2 className="heading-h2 mb-8 flex items-center gap-2">
              <Building2 className="w-8 h-8 text-teal-600" aria-hidden />
              {t('about-clientele:clienteleTitle')}
            </h2>
            <div className="space-y-8">
              {CATEGORY_KEYS.map((key) => {
                const names = clientele[key];
                if (!names || !Array.isArray(names) || names.length === 0) return null;
                const categoryLabel = categories[key];
                return (
                  <div key={key}>
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">
                      {categoryLabel}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {names.map((name) => (
                        <span
                          key={name}
                          className="inline-flex items-center rounded-full bg-teal-50 text-teal-800 px-4 py-2 text-sm font-medium border border-teal-100"
                        >
                          {name}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <h2 className="heading-h2 mb-8 flex items-center gap-2">
              <Quote className="w-8 h-8 text-teal-600" aria-hidden />
              {t('about-clientele:testimonialsTitle')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.isArray(testimonials) &&
                testimonials.map((item, index) => (
                  <div
                    key={index}
                    className="card bg-white border border-gray-100 flex flex-col"
                  >
                    <blockquote className="body-default text-gray-700 italic mb-4 flex-1">
                      &ldquo;{item.quote}&rdquo;
                    </blockquote>
                    <p className="text-sm text-gray-500 border-t border-gray-100 pt-4">
                      — {item.author}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <h2 className="heading-h2 mb-8 flex items-center gap-2">
              <Award className="w-8 h-8 text-teal-600" aria-hidden />
              {t('about-clientele:successStoriesTitle')}
            </h2>
            <div className="space-y-8">
              {Array.isArray(successStories) &&
                successStories.map((story, index) => (
                  <div
                    key={index}
                    className="card border border-gray-100 overflow-hidden"
                  >
                    <div className="border-b border-gray-100 bg-gray-50 px-5 py-3">
                      <h3 className="heading-h4 text-navy-500">
                        {story.client} — {story.headline}
                      </h3>
                    </div>
                    <div className="p-5 space-y-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-teal-600 mb-1">
                          {t('about-clientele:labels.problem')}
                        </p>
                        <p className="body-default text-gray-700">{story.problem}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-teal-600 mb-1">
                          {t('about-clientele:labels.whatWeDid')}
                        </p>
                        <p className="body-default text-gray-700">{story.whatWeDid}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-teal-600 mb-1">
                          {t('about-clientele:labels.result')}
                        </p>
                        <p className="body-default font-medium text-teal-800">
                          {story.result}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-navy-500 text-white">
          <div className="container-custom text-center">
            <h2 className="heading-h2 mb-4 text-white">{t('about:readyTitle')}</h2>
            <p className="body-large text-gray-100 mb-8">{t('about:readyDescription')}</p>
            <Button variant="primary" size="lg" asChild className="bg-gold-300 text-navy-500 hover:bg-gold-400">
              <Link href="/consulting/booking">{t('common:bookDiscoveryCall')}</Link>
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}
