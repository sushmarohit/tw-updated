import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageSchema } from '@/components/seo/page-schema';
import {
  getServiceCategoryBySlug,
  getServiceDetailBySlug,
} from '@/lib/services-catalog';

interface ServiceSlugPageProps {
  params: { slug: string[] };
}

export default function ServiceSlugPage({ params }: ServiceSlugPageProps) {
  const { slug } = params;
  const slugPath = slug.join('/');
  const [first, ...rest] = slug;
  const category = rest.length === 0 ? getServiceCategoryBySlug(first) : null;
  const detail = getServiceDetailBySlug(slugPath);

  if (!category && !detail) {
    notFound();
  }

  if (category) {
    return (
      <>
        <PageSchema
          breadcrumbNameMap={{
            consulting: 'Consulting',
            services: 'Services',
          }}
        />
        <div className="min-h-screen bg-gray-50">
          <section className="section-padding bg-gradient-to-br from-navy-500 to-teal-600 text-white">
            <div className="container-custom">
              <div className="max-w-3xl">
                <h1 className="heading-hero mb-6 text-white">{category.title}</h1>
                <p className="body-large text-gray-100 mb-8">{category.description}</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="primary" size="lg" asChild>
                    <Link href={category.primaryCta.href}>{category.primaryCta.title}</Link>
                  </Button>
                  <Button variant="secondary" size="lg" asChild>
                    <Link href={category.secondaryCta.href}>{category.secondaryCta.title}</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          <section className="section-padding bg-white">
            <div className="container-custom">
              <h2 className="heading-h2 mb-8">Services in this track</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {category.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="card hover:shadow-lg transition-shadow border border-gray-100"
                  >
                    <h3 className="heading-h4 text-navy-500 mb-2">{item.title}</h3>
                    <p className="body-default text-teal-600 font-semibold">View details</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </div>
      </>
    );
  }

  return (
    <>
      <PageSchema
        breadcrumbNameMap={{
          consulting: 'Consulting',
          services: 'Services',
        }}
      />
      <div className="min-h-screen bg-gray-50">
        <section className="section-padding bg-gradient-to-br from-navy-500 to-teal-600 text-white">
          <div className="container-custom">
            <div className="max-w-3xl">
              <h1 className="heading-hero mb-6 text-white">{detail!.title}</h1>
              <p className="body-large text-gray-100 mb-8">{detail!.heroSubheadline}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="primary" size="lg" asChild>
                  <Link href={detail!.primaryCta.href}>{detail!.primaryCta.title}</Link>
                </Button>
                <Button variant="secondary" size="lg" asChild>
                  <Link href={detail!.secondaryCta.href}>{detail!.secondaryCta.title}</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-custom">
            <h2 className="heading-h2 mb-8">{detail!.outcomesLabel}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
              {detail!.outcomes.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-teal-500 flex-shrink-0 mt-1" />
                  <p className="body-default text-gray-700">{item}</p>
                </div>
              ))}
            </div>

            <div className="card bg-navy-500 text-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="body-small text-gray-300 mb-2">{detail!.timelineLabel}</p>
                  <p className="heading-h4 text-gold-300">{detail!.timeline}</p>
                </div>
                <div>
                  <p className="body-small text-gray-300 mb-2">{detail!.pricingLabel}</p>
                  <p className="heading-h4 text-teal-400">{detail!.pricing}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
