'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { BusinessCaseKitTiles } from '@/components/resources/business-case-kit-tiles';
import { ResourceGateModal } from '@/components/resources/resource-gate-modal';
import { ResourcePageFooter } from '@/components/resources/resource-page-footer';
import { trackDownloadClick, trackResourceCtaClick } from '@/lib/analytics/events';

const PAGE = '/consulting/resources/business-case-kit';

export default function BusinessCaseKitPage() {
  const [fullKitOpen, setFullKitOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="section-padding bg-gradient-to-br from-navy-500 to-teal-600 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-hero mb-6 text-white">Business Case Kit</h1>
            <p className="body-large text-gray-100 mb-8">
              Working tools to build a compelling investment case for operational improvements — CBA templates, impact
              measurement frameworks, and real client ROI data.
            </p>
            <Button
              variant="secondary"
              size="lg"
              type="button"
              onClick={() => {
                trackDownloadClick({
                  resource_type: 'business_case_kit',
                  template_code: 'FULL_KIT',
                  gate_type: 'hero_cta',
                });
                setFullKitOpen(true);
              }}
            >
              Download the Full Kit
            </Button>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom max-w-3xl mx-auto mb-12">
          <h2 className="heading-h2 mb-4 text-center">Stop Guessing. Start Measuring.</h2>
          <p className="body-large text-gray-700 text-center mb-8">
            Most operational investments fail to get approved — not because the case is weak, but because it was never built
            properly. This kit gives you everything you need to quantify the value, structure the argument, and close the
            decision.
          </p>
          <ul className="space-y-3 max-w-xl mx-auto">
            {[
              'Calculate accurate ROI — direct savings and indirect value',
              'Quantify improvements in efficiency, quality, and governance maturity',
              'Present a business case your board, CFO, or investors will approve',
              'Track actual vs. projected returns after implementation',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0 mt-1" aria-hidden />
                <span className="body-default text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <BusinessCaseKitTiles />
      </section>

      <section className="section-padding bg-white border-t border-gray-200">
        <div className="container-custom max-w-3xl mx-auto text-center space-y-10">
          <div>
            <h2 className="heading-h2 mb-4">Need a custom ROI analysis for your business?</h2>
            <Button variant="primary" size="lg" asChild>
              <Link
                href="/consulting/booking"
                onClick={() =>
                  trackResourceCtaClick({
                    cta_text: 'Get Custom ROI Analysis',
                    destination: '/consulting/booking',
                    page: PAGE,
                  })
                }
              >
                Get Custom ROI Analysis
              </Link>
            </Button>
          </div>
          <div>
            <p className="body-large text-gray-600 mb-4">Prefer to start yourself?</p>
            <Button variant="outline" size="lg" asChild>
              <Link
                href="/consulting/tools/roi"
                onClick={() =>
                  trackResourceCtaClick({
                    cta_text: 'Try the ROI Calculator',
                    destination: '/consulting/tools/roi',
                    page: PAGE,
                  })
                }
              >
                Try the ROI Calculator
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <ResourcePageFooter page={PAGE} />

      <ResourceGateModal
        open={fullKitOpen}
        onOpenChange={setFullKitOpen}
        title="Download the Full Kit"
        templateCode="FULL_KIT"
        gateType="full_kit"
        onSuccessAfterSubmit={(url) => {
          if (url) window.open(url, '_blank', 'noopener,noreferrer');
        }}
      />
    </div>
  );
}
