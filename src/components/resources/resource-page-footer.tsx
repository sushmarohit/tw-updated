'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { trackResourceCtaClick } from '@/lib/analytics/events';

type ResourcePageFooterProps = {
  page: string;
};

export function ResourcePageFooter({ page }: ResourcePageFooterProps) {
  return (
    <section className="section-padding border-t border-gray-200 bg-gray-50">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row gap-4 justify-center items-center text-center sm:text-left">
          <p className="body-default text-gray-600 sm:mr-4">Not sure where to start?</p>
          <Button variant="outline" size="lg" asChild>
            <Link
              href="/consulting/tools/health-check"
              onClick={() =>
                trackResourceCtaClick({
                  cta_text: 'Start Free Diagnostic',
                  destination: '/consulting/tools/health-check',
                  page,
                })
              }
            >
              Start Free Diagnostic
            </Link>
          </Button>
          <Button variant="primary" size="lg" asChild>
            <Link
              href="/consulting/booking"
              onClick={() =>
                trackResourceCtaClick({
                  cta_text: 'Book discovery call',
                  destination: '/consulting/booking',
                  page,
                })
              }
            >
              Book a discovery call
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
