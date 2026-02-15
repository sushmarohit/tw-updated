'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PageSchema } from '@/components/seo/page-schema';
import { caseStudyTabs, type CaseStudyTabKey } from '@/lib/case-studies-catalog';
import { cn } from '@/lib/utils';

export default function CaseStudiesHubPage() {
  const searchParams = useSearchParams();
  const tabFromUrl = searchParams.get('tab') as CaseStudyTabKey | null;
  const [activeTab, setActiveTab] = useState<CaseStudyTabKey>(
    tabFromUrl && caseStudyTabs.some((tab) => tab.key === tabFromUrl)
      ? tabFromUrl
      : 'process-excellence-solutions'
  );

  useEffect(() => {
    if (tabFromUrl && caseStudyTabs.some((tab) => tab.key === tabFromUrl)) {
      setActiveTab(tabFromUrl);
    }
  }, [tabFromUrl]);
  const selectedTab = useMemo(
    () => caseStudyTabs.find((tab) => tab.key === activeTab) ?? caseStudyTabs[0],
    [activeTab]
  );

  return (
    <>
      <PageSchema breadcrumbNameMap={{ consulting: 'Consulting', 'case-studies': 'Case Studies', hub: 'Hub' }} />
      <div className="min-h-screen bg-gray-50">
        <section className="section-padding bg-gradient-to-br from-navy-500 to-teal-600 text-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="heading-hero mb-6 text-white">Case Studies Hub</h1>
              <p className="body-large text-gray-100 mb-8">
                Explore execution stories by practice area. No vanity metrics, only operational and fundraise outcomes.
              </p>
              <Button variant="primary" size="lg" asChild>
                <Link href="/consulting/booking">Book a Discovery Call</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom">
            <div className="flex flex-wrap gap-3 mb-8">
              {caseStudyTabs.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={cn(
                    'px-4 py-2 rounded-full border text-sm font-semibold transition-colors',
                    tab.key === selectedTab.key
                      ? 'bg-teal-500 text-white border-teal-500'
                      : 'bg-white text-navy-500 border-gray-200 hover:border-teal-300'
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {selectedTab.cards.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {selectedTab.cards.map((card) => (
                  <div key={card.slug} className="card">
                    <span className="inline-flex rounded-full bg-teal-50 text-teal-700 px-3 py-1 text-xs font-semibold mb-3">
                      {card.industryTag}
                    </span>
                    <h2 className="heading-h4 mb-3">{card.title}</h2>
                    <p className="body-default text-gray-700 mb-3">{card.hook}</p>
                    <p className="body-default text-gray-600 mb-5">{card.outcome}</p>
                    <Button variant="outline" asChild>
                      <Link href={`/consulting/case-studies/${card.slug}`}>Read full case study</Link>
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="card text-center">
                <h2 className="heading-h4 mb-3">Franchise case studies coming soon</h2>
                <p className="body-default text-gray-600 mb-5">
                  We are adding more franchise scale and expansion stories. Book a call to discuss relevant live examples.
                </p>
                <Button variant="primary" asChild>
                  <Link href="/consulting/booking">Book a Discovery Call</Link>
                </Button>
              </div>
            )}
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-custom text-center">
            <h2 className="heading-h2 mb-4">Want a similar result?</h2>
            <p className="body-large text-gray-600 mb-8">
              We can map your current bottlenecks and suggest an execution path in one discovery call.
            </p>
            <Button variant="primary" size="lg" asChild>
              <Link href="/consulting/booking">Book a Discovery Call</Link>
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}

