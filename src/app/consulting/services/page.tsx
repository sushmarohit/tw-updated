import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PageSchema } from '@/components/seo/page-schema';
import { serviceCategories } from '@/lib/services-catalog';

export default function ServicesPage() {
  return (
    <>
      <PageSchema breadcrumbNameMap={{ consulting: 'Consulting', services: 'Services' }} />
      <div className="min-h-screen bg-gray-50">
      <section className="section-padding bg-gradient-to-br from-navy-500 to-teal-600 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-hero mb-6 text-white">Services</h1>
            <p className="body-large text-gray-100">
              Choose the engagement track that best matches your current growth goals.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {serviceCategories.map((category) => (
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
          <h2 className="heading-h2 mb-4">Not sure where to start?</h2>
          <p className="body-large text-gray-600 mb-8 max-w-2xl mx-auto">
            Begin with a quick diagnostic, then we can map the right service sequence for your team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" asChild size="lg">
              <Link href="/consulting/tools/health-check">Start Free Diagnostic</Link>
            </Button>
            <Button variant="secondary" asChild size="lg">
              <Link href="/consulting/booking">Book Discovery Call</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}

