'use client';

import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { PageSchema } from '@/components/seo/page-schema';
import { caseStudyTabs, caseStudyTabKeyToCatalogKey, type CaseStudyTabKey } from '@/lib/case-studies-catalog';
import { cn } from '@/lib/utils';
import { ClienteleChipsStrip } from '@/components/shared/clientele-chips';
import { TestimonialsBlock } from '@/components/shared/testimonials-block';

const TRACK_KEYS: CaseStudyTabKey[] = ['process-excellence-solutions', 'fundraise-execution', 'franchise-scale-expansion'];

export type HubMainTab = 'case-studies' | 'success-stories' | 'testimonials' | 'clientele';
const HUB_MAIN_TABS: HubMainTab[] = ['case-studies', 'success-stories', 'testimonials', 'clientele'];

function getMainTabFromSearchParams(searchParams: ReturnType<typeof useSearchParams>): HubMainTab {
  const tabParam = searchParams.get('tab');
  if (tabParam && HUB_MAIN_TABS.includes(tabParam as HubMainTab)) {
    return tabParam as HubMainTab;
  }
  return 'case-studies';
}

function getTrackFromSearchParams(searchParams: ReturnType<typeof useSearchParams>): CaseStudyTabKey {
  const trackParam = searchParams.get('track');
  if (trackParam && TRACK_KEYS.includes(trackParam as CaseStudyTabKey)) {
    return trackParam as CaseStudyTabKey;
  }
  return 'process-excellence-solutions';
}

const SUCCESS_STORY_ORDER: Array<'Solaraa' | 'Anexx' | 'Asta by Avim' | 'Vasundhara Nirmiti Properties'> = [
  'Solaraa',
  'Anexx',
  'Asta by Avim',
  'Vasundhara Nirmiti Properties',
];

const CATEGORY_KEYS = ['processExcellence', 'fundraise', 'govtLiaison'] as const;

export default function CaseStudiesHubPage() {
  const { t } = useTranslation(['case-studies-hub', 'case-studies-catalog', 'about-clientele', 'common']);
  const searchParams = useSearchParams();
  const router = useRouter();
  const mainTab = getMainTabFromSearchParams(searchParams);
  const track = getTrackFromSearchParams(searchParams);

  const currentTrackTab = caseStudyTabs.find((tab) => tab.key === track)!;
  const isFranchiseTrack = track === 'franchise-scale-expansion';

  const clientele = t('about-clientele:clientele', { returnObjects: true }) as Record<string, string[]>;
  const categories = t('about-clientele:categories', { returnObjects: true }) as Record<string, string>;
  const successStories = t('about-clientele:successStories', { returnObjects: true }) as Array<{
    client: string;
    headline: string;
    problem: string;
    whatWeDid: string;
    result: string;
  }>;

  const replaceTab = (newTab: HubMainTab, extra?: { track?: CaseStudyTabKey }) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', newTab);
    if (extra?.track) params.set('track', extra.track);
    else if (newTab === 'case-studies') params.set('track', track);
    router.replace(`/consulting/case-studies/hub?${params.toString()}`);
  };

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

        {/* Main tab navigation: Case Studies | Success Stories | Testimonials | Clientele */}
        <section className="border-b border-gray-200 bg-white sticky top-16 z-40">
          <div className="container-custom">
            <div className="flex gap-1 overflow-x-auto scrollbar-hide py-2">
              {HUB_MAIN_TABS.map((tabKey) => (
                <button
                  key={tabKey}
                  type="button"
                  onClick={() => replaceTab(tabKey)}
                  className={cn(
                    'px-4 py-2.5 rounded-lg font-semibold text-sm whitespace-nowrap transition-colors',
                    mainTab === tabKey ? 'bg-gold-300 text-white' : 'text-navy-500 hover:bg-gray-100'
                  )}
                  aria-selected={mainTab === tabKey}
                  role="tab"
                >
                  {t('case-studies-hub:tabs.' + (tabKey === 'case-studies' ? 'caseStudies' : tabKey === 'success-stories' ? 'successStories' : tabKey))}
                  {tabKey === 'case-studies' && (
                    <span className="ml-1.5 text-xs opacity-90">({caseStudyTabs.filter((t) => t.cards.length > 0).reduce((acc, t) => acc + t.cards.length, 0)})</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom">
            {mainTab === 'case-studies' && (
              <>
                {/* Track sub-tabs (Process Excellence, Fundraise, Franchise) */}
                <div className="flex gap-1 overflow-x-auto scrollbar-hide py-2 mb-6 border-b border-gray-100">
                  {caseStudyTabs.map((tab) => {
                    const catalogKey = caseStudyTabKeyToCatalogKey[tab.key];
                    const label = t('case-studies-catalog:' + catalogKey + '.label', tab.label);
                    const isActive = track === tab.key;
                    return (
                      <button
                        key={tab.key}
                        type="button"
                        onClick={() => router.replace(`/consulting/case-studies/hub?tab=case-studies&track=${tab.key}`)}
                        className={cn(
                          'px-4 py-2.5 rounded-lg font-semibold text-sm whitespace-nowrap transition-colors',
                          isActive ? 'bg-teal-100 text-teal-800' : 'text-gray-600 hover:bg-gray-100'
                        )}
                      >
                        {label}
                        {tab.cards.length > 0 && <span className="ml-1.5 text-xs opacity-90">({tab.cards.length})</span>}
                      </button>
                    );
                  })}
                </div>
                {isFranchiseTrack ? (
                  <div className="max-w-2xl mx-auto text-center py-12">
                    <div className="text-5xl mb-4" aria-hidden>🚀</div>
                    <h2 className="heading-h2 mb-4">{t('case-studies-catalog:franchise.comingSoonTitle', 'Franchise Case Studies Coming Soon')}</h2>
                    <p className="body-large text-gray-600 mb-8">{t('case-studies-catalog:franchise.comingSoon')}</p>
                    <Button variant="primary" asChild>
                      <Link href="/consulting/contact?subject=Franchise Case Study Inquiry">{t('case-studies-catalog:franchise.shareStory')}</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {currentTrackTab.cards.map((card) => {
                      const title = t('case-studies-catalog:cards.' + card.slug + '.title', card.title);
                      const industryTag = t('case-studies-catalog:cards.' + card.slug + '.industryTag', card.industryTag);
                      const outcome = t('case-studies-catalog:cards.' + card.slug + '.outcome', card.outcome);
                      return (
                        <div key={card.slug} className="card">
                          <span className="inline-flex rounded-full bg-purple-50 text-purple-700 px-3 py-1 text-xs font-semibold mb-3">{industryTag}</span>
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
              </>
            )}

            {mainTab === 'success-stories' && Array.isArray(successStories) && (
              <div className="space-y-8 max-w-4xl">
                {SUCCESS_STORY_ORDER.map((clientName) => {
                  const story = successStories.find((s) => s.client === clientName);
                  if (!story) return null;
                  return (
                    <div key={story.client} className="card border border-gray-100">
                      <div className="border-b border-gray-100 bg-gray-50 px-5 py-3">
                        <h2 className="heading-h4 text-navy-500">
                          {story.client} — {story.headline}
                        </h2>
                      </div>
                      <div className="p-5 space-y-4">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-teal-600 mb-1">{t('about-clientele:labels.problem')}</p>
                          <p className="body-default text-gray-700">{story.problem}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-teal-600 mb-1">{t('about-clientele:labels.whatWeDid')}</p>
                          <p className="body-default text-gray-700">{story.whatWeDid}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-teal-600 mb-1">{t('about-clientele:labels.result')}</p>
                          <p className="body-default font-medium text-teal-800">{story.result}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {mainTab === 'testimonials' && (
              <div className="max-w-4xl">
                <TestimonialsBlock indices={[0, 1, 2]} variant="cards" className="grid-cols-1 md:grid-cols-3" />
              </div>
            )}

            {mainTab === 'clientele' && (
              <div className="space-y-8 max-w-3xl">
                {CATEGORY_KEYS.map((key) => {
                  const names = clientele[key];
                  if (!names || !Array.isArray(names) || names.length === 0) return null;
                  return (
                    <ClienteleChipsStrip
                      key={key}
                      categoryLabel={categories[key]}
                      names={names}
                    />
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
