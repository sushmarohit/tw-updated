'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { PageSchema } from '@/components/seo/page-schema';
import { caseStudyTabs, caseStudyTabKeyToCatalogKey, type CaseStudyTabKey } from '@/lib/case-studies-catalog';
import { cn } from '@/lib/utils';

export default function CaseStudiesHubPage() {
  const { t } = useTranslation(['case-studies-hub', 'case-studies-catalog', 'common']);
  const [activeTab, setActiveTab] = useState<CaseStudyTabKey>('process-excellence-solutions');

  const currentTab = caseStudyTabs.find((tab) => tab.key === activeTab)!;
  const isFranchiseTab = activeTab === 'franchise-scale-expansion';

  return (
    <>
      <PageSchema breadcrumbNameMap={{ consulting: 'Consulting', 'case-studies': 'Case Studies', hub: 'Hub' }} />
      <div className="min-h-screen bg-gray-50">
        <section className="section-padding bg-gradient-to-br from-navy-500 to-purple-600 text-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="heading-hero mb-6 text-white">{t('case-studies-hub:title')}</h1>
              <p className="body-large text-gray-100 mb-8">{t('case-studies-hub:subtitle')}</p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button variant="primary" size="lg" asChild>
                  <Link href="/consulting/tools/health-check">{t('case-studies-hub:startTransformation', 'Start Your Transformation')}</Link>
                </Button>
                <Button variant="outline" size="lg" asChild className="border-white text-white hover:bg-white/10">
                  <Link href="/consulting/booking">{t('common:bookDiscoveryCall')}</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Tab navigation */}
        <section className="border-b border-gray-200 bg-white sticky top-16 z-40">
          <div className="container-custom">
            <div className="flex gap-1 overflow-x-auto scrollbar-hide py-2">
              {caseStudyTabs.map((tab) => {
                const catalogKey = caseStudyTabKeyToCatalogKey[tab.key];
                const label = t('case-studies-catalog:' + catalogKey + '.label', tab.label);
                const isActive = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key)}
                    className={cn(
                      'px-4 py-2.5 rounded-lg font-semibold text-sm whitespace-nowrap transition-colors',
                      isActive
                        ? 'bg-gold-300 text-white'
                        : 'text-navy-500 hover:bg-gray-100'
                    )}
                    aria-selected={isActive}
                    role="tab"
                  >
                    {label}
                    {tab.cards.length > 0 && (
                      <span className="ml-1.5 text-xs opacity-90">({tab.cards.length})</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom">
            {isFranchiseTab ? (
              /* Franchise: Coming Soon */
              <div className="max-w-2xl mx-auto text-center py-12">
                <div className="text-5xl mb-4" aria-hidden>🚀</div>
                <h2 className="heading-h2 mb-4">{t('case-studies-catalog:franchise.comingSoonTitle', 'Franchise Case Studies Coming Soon')}</h2>
                <p className="body-large text-gray-600 mb-8">
                  {t('case-studies-catalog:franchise.comingSoon', 'We\'re currently working with clients on franchise expansion projects. Check back soon to see how we\'ve helped businesses build scalable franchise models.')}
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Button variant="primary" asChild>
                    <Link href="/consulting/contact?subject=Franchise Case Study Inquiry">{t('case-studies-catalog:franchise.shareStory', 'Share Your Franchise Story')}</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/consulting/services/franchise/franchise-feasibility-business-model-design">{t('case-studies-catalog:franchise.exploreServices', 'Explore Franchise Services')}</Link>
                  </Button>
                </div>
              </div>
            ) : (
              /* Process Excellence & Fundraise: case study cards */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentTab.cards.map((card) => {
                  const title = t('case-studies-catalog:cards.' + card.slug + '.title', card.title);
                  const industryTag = t('case-studies-catalog:cards.' + card.slug + '.industryTag', card.industryTag);
                  const outcome = t('case-studies-catalog:cards.' + card.slug + '.outcome', card.outcome);
                  return (
                    <div key={card.slug} className="card">
                      <span className="inline-flex rounded-full bg-purple-50 text-purple-700 px-3 py-1 text-xs font-semibold mb-3">
                        {industryTag}
                      </span>
                      <h2 className="heading-h4 mb-3">{title}</h2>
                      <p className="body-default text-gray-600 mb-5">{outcome}</p>
                      <Button variant="outline" asChild>
                        <Link href={`/consulting/case-studies/${card.slug}`}>{t('case-studies-hub:readFullStory', 'Read Full Story')} →</Link>
                      </Button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-custom text-center">
            <h2 className="heading-h2 mb-4">{t('case-studies-hub:readyTitle')}</h2>
            <p className="body-large text-gray-600 mb-8">{t('case-studies-hub:readyDescription')}</p>
            <Button variant="primary" size="lg" asChild>
              <Link href="/consulting/booking">{t('case-studies-hub:getCustomAssessment')}</Link>
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}
