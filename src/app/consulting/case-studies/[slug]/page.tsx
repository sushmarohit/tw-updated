import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageSchema } from '@/components/seo/page-schema';
import { getCaseStudyBySlug } from '@/lib/case-studies-catalog';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://twelfthkey.com';

interface CaseStudyDetailPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: CaseStudyDetailPageProps): Promise<Metadata> {
  const detail = getCaseStudyBySlug(params.slug);
  if (!detail) return { title: 'Case Study | TwelfthKey Consulting' };
  const title = detail.heroTitle;
  const description = [detail.industry, detail.ownerSituation].join(' — ').slice(0, 160);
  const canonical = `${BASE_URL}/consulting/case-studies/${params.slug}`;
  return {
    title: `${title} | TwelfthKey Consulting`,
    description,
    alternates: { canonical },
    openGraph: {
      title: `${title} | TwelfthKey Consulting`,
      description,
      url: canonical,
    },
  };
}

export default function CaseStudyDetailPage({ params }: CaseStudyDetailPageProps) {
  const detail = getCaseStudyBySlug(params.slug);

  if (!detail) {
    notFound();
  }

  return (
    <>
      <PageSchema breadcrumbNameMap={{ consulting: 'Consulting', 'case-studies': 'Case Studies' }} />
      <div className="min-h-screen bg-gray-50">
        <section className="section-padding bg-gradient-to-br from-navy-500 to-teal-600 text-white">
          <div className="container-custom">
            <div className="max-w-4xl">
              <p className="text-sm text-gray-200 mb-3">{detail.heroSubtitle}</p>
              <h1 className="heading-hero mb-4 text-white">{detail.heroTitle}</h1>
              <p className="body-large text-gray-100 mb-8">{detail.industry}</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="primary" size="lg" asChild>
                  <Link href="/consulting/booking">Book a Discovery Call</Link>
                </Button>
                <Button variant="secondary" size="lg" asChild className="text-white border-white hover:bg-white hover:text-navy-500">
                  <Link href={`/consulting/case-studies/hub?tab=${detail.tab}`}>Back to hub</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom max-w-4xl">
            <div className="card mb-8">
              <h2 className="heading-h3 mb-4">Owner situation</h2>
              <p className="body-default text-gray-700">{detail.ownerSituation}</p>
            </div>

            {detail.groundReality.length > 0 && (
              <div className="card mb-8">
                <h2 className="heading-h3 mb-4">What it looked like on the ground</h2>
                <div className="space-y-3">
                  {detail.groundReality.map((point) => (
                    <div key={point} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0 mt-1" />
                      <p className="body-default text-gray-700">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="card mb-8">
              <h2 className="heading-h3 mb-4">{detail.deliveredLabel}</h2>
              <div className="space-y-3">
                {detail.deliveredPoints.map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0 mt-1" />
                    <p className="body-default text-gray-700">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="card mb-8 bg-navy-500 text-white">
              <h2 className="heading-h3 mb-4 text-white">{detail.outcomesLabel}</h2>
              <div className="space-y-3">
                {detail.outcomesPoints.map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-gold-300 flex-shrink-0 mt-1" />
                    <p className="body-default text-gray-100">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="card bg-teal-50 border-2 border-teal-200">
              <p className="body-large text-gray-700 mb-6">{detail.ctaBlock}</p>
              <Button variant="primary" asChild>
                <Link href="/consulting/booking">Book a Discovery Call</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
