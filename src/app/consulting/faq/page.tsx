'use client';

import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { SchemaMarkup } from '@/components/seo/schema-markup';
import { generateFaqPageSchema } from '@/lib/seo/schema-generators';

type FAQItem = { category: string; question: string; answer: string };

export default function FAQPage() {
  const { t } = useTranslation(['faq', 'common']);

  const items = t('faq:items', { returnObjects: true }) as FAQItem[];
  const faqSchema = useMemo(
    () =>
      generateFaqPageSchema(
        Array.isArray(items) ? items.map((i) => ({ question: i.question, answer: i.answer })) : []
      ),
    [items]
  );

  const categoryKeys = [
    'process',
    'tools',
    'services',
    // 'praxio',
    'pricing',
    'fractional',
    'security',
    'gettingStarted',
  ] as const;

  const byCategory = categoryKeys
    .map((key) => ({
      key,
      label: t('faq:categories.' + key),
      items: Array.isArray(items) ? items.filter((i) => i.category === key) : [],
    }))
    .filter((g) => g.items.length > 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <SchemaMarkup schema={faqSchema} id="faq-schema" />
      <section className="section-padding bg-gradient-to-br from-navy-500 to-teal-600 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-hero mb-6 text-white">{t('faq:title')}</h1>
            <p className="body-large text-gray-100 mb-8">
              {t('faq:subtitle')}
            </p>
            <Button variant="primary" size="lg" asChild>
              <Link href="/consulting/booking">{t('common:bookDiscoveryCall')}</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          {byCategory.map((group) => (
            <div key={group.key} className="mb-12">
              <h2 className="heading-h2 text-navy-500 mb-6">{group.label}</h2>
              <div className="space-y-2">
                {group.items.map((item, index) => (
                  <details
                    key={`${group.key}-${index}`}
                    className="group border border-gray-200 rounded-lg bg-white shadow-card hover:shadow-card-hover transition-shadow overflow-hidden"
                  >
                    <summary className="heading-h4 cursor-pointer list-none py-4 px-4 flex items-center justify-between gap-2 text-left text-navy-500 group-open:text-teal-600 focus-visible-ring rounded-lg">
                      <span>{item.question}</span>
                      <ChevronDown className="w-5 h-5 flex-shrink-0 transition-transform group-open:rotate-180 text-gray-400" aria-hidden />
                    </summary>
                    <div className="body-default text-gray-600 pb-4 pt-4 px-4 border-t border-gray-100">
                      {item.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom text-center max-w-2xl">
          <h2 className="heading-h2 mb-4">{t('faq:stillHaveQuestions', 'Still have questions?')}</h2>
          <p className="body-default text-gray-600 mb-6">
            {t('faq:contactPrompt', "Book a discovery call or reach out—we're happy to help.")}
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
