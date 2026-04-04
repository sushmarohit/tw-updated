'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ResourcePageFooter } from '@/components/resources/resource-page-footer';
import { trackResourceCtaClick } from '@/lib/analytics/events';

const PAGE = '/consulting/resources/roi-guide';

export default function ROIGuidePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="section-padding bg-gradient-to-br from-navy-500 to-teal-600 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-hero mb-6 text-white">ROI Guide: How to Think About Operational Investment Returns</h1>
            <p className="body-large text-gray-100 mb-8">
              Before you calculate a number, you need to understand what you&apos;re measuring. This guide covers the thinking
              — the working templates are in the Business Case Kit.
            </p>
            <Button variant="secondary" size="lg" asChild>
              <Link
                href="/consulting/resources/business-case-kit"
                onClick={() =>
                  trackResourceCtaClick({
                    cta_text: 'Download Business Case Kit',
                    destination: '/consulting/resources/business-case-kit',
                    page: PAGE,
                  })
                }
              >
                Download Business Case Kit
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom max-w-3xl mx-auto">
          <h2 className="heading-h2 mb-8 text-center">The Two Mistakes Founders Make</h2>
          <p className="body-large text-gray-700 text-center mb-10">
            Most founders evaluate operational investments one of two ways — and both are wrong in isolation.
          </p>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="card border-l-4 border-teal-500">
              <h3 className="heading-h4 mb-3">Mistake 1: Only Measuring Direct ROI</h3>
              <p className="body-default text-gray-700">
                You look at cost savings, declare the number too small to justify the investment, and don&apos;t proceed. This
                systematically undervalues operational improvements because it ignores compounding indirect value — freed founder
                time, investor readiness, scale enablement, and team retention.
              </p>
            </div>
            <div className="card border-l-4 border-gold-500">
              <h3 className="heading-h4 mb-3">Mistake 2: Only Claiming Strategic Value</h3>
              <p className="body-default text-gray-700">
                You list ten compelling indirect benefits, can&apos;t put a number on any of them, and lose credibility with your
                finance team, co-founder, or board. &quot;Better decisions&quot; is not a financial return.
              </p>
            </div>
          </div>
          <div className="rounded-xl bg-navy-500 text-white p-6 md:p-8">
            <p className="body-large text-gray-100">
              <strong className="text-white">The answer is a Dual-Lens approach:</strong> calculate Direct ROI as your headline,
              document Indirect Value as your supporting case. Never mix the two into one number.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom max-w-3xl mx-auto">
          <h2 className="heading-h2 mb-4">Before You Open a Spreadsheet, Answer These 5 Questions</h2>
          <div className="space-y-10 mt-10">
            <div>
              <h3 className="heading-h4 mb-3 text-teal-600">Step 1 — What is the total cost of the problem today?</h3>
              <p className="body-default text-gray-700 mb-3">Not the cost of fixing it — the cost of not fixing it. Include:</p>
              <ul className="list-disc pl-5 body-default text-gray-700 space-y-2">
                <li>Labour hours wasted on rework</li>
                <li>Founder time spent firefighting</li>
                <li>Errors that cost money to correct</li>
                <li>Clients lost due to inconsistent delivery</li>
              </ul>
            </div>
            <div>
              <h3 className="heading-h4 mb-3 text-teal-600">Step 2 — What specifically will change after the intervention?</h3>
              <p className="body-default text-gray-700">
                Be precise. &quot;Processes will improve&quot; is not a change. &quot;Delivery cycle time will reduce from 18 days to 13
                days&quot; is a change.
              </p>
            </div>
            <div>
              <h3 className="heading-h4 mb-3 text-teal-600">Step 3 — What is the financial value of that change per year?</h3>
              <p className="body-default text-gray-700 mb-3">Convert every change into rupees:</p>
              <ul className="list-disc pl-5 body-default text-gray-700 space-y-2">
                <li>Time saved → hours × loaded hourly rate of the person</li>
                <li>Error reduced → average cost per error × errors per month × reduction %</li>
                <li>Revenue protected → average client value × churn reduction %</li>
              </ul>
            </div>
            <div>
              <h3 className="heading-h4 mb-3 text-teal-600">Step 4 — What are you actually investing?</h3>
              <p className="body-default text-gray-700">
                Consulting fee + tool costs + internal team time during implementation. Use realistic numbers — don&apos;t
                underestimate internal time cost.
              </p>
            </div>
            <div>
              <h3 className="heading-h4 mb-3 text-teal-600">Step 5 — What does the Conservative scenario look like?</h3>
              <p className="body-default text-gray-700">
                Assume only 50% of projected savings materialise. If the ROI is still positive in the Conservative scenario,
                proceed.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom max-w-3xl mx-auto">
          <h2 className="heading-h2 mb-8">The ROI Formula</h2>
          <div className="space-y-4 font-mono text-base md:text-lg bg-gray-100 border border-gray-200 rounded-xl p-6 text-navy-500">
            <p>ROI (%) = (Direct Annual Value − Total Investment) ÷ Total Investment × 100</p>
            <p>Payback Period = Total Investment ÷ (Direct Annual Value ÷ 12) [months]</p>
          </div>
          <div className="mt-8 rounded-xl border border-teal-200 bg-teal-50 p-6">
            <h3 className="font-semibold text-navy-500 mb-3">What good looks like for operational transformation</h3>
            <ul className="space-y-2 body-default text-gray-800">
              <li>✓ Well-structured programmes typically deliver 3x–6x return within 12 months</li>
              <li>✓ Payback periods for MSME-scale engagements: 3–6 months</li>
              <li>✓ If payback exceeds 12 months on Conservative assumptions — revisit scope or cost baseline</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom max-w-3xl mx-auto">
          <h2 className="heading-h2 mb-8">Direct vs. Indirect: What Goes Where</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="heading-h4 mb-4 text-teal-600">Direct ROI — put a number on it</h3>
              <ul className="space-y-2 body-default text-gray-700">
                <li>Labour hours saved × rate</li>
                <li>Rework cost eliminated</li>
                <li>Error resolution cost reduced</li>
                <li>Faster cycle time → more capacity</li>
                <li>Revenue protected via client retention</li>
              </ul>
            </div>
            <div>
              <h3 className="heading-h4 mb-4 text-gold-600">Indirect Value — document, don&apos;t quantify in headline</h3>
              <ul className="space-y-2 body-default text-gray-700">
                <li>Founder bandwidth freed for strategy</li>
                <li>Investor readiness / valuation uplift</li>
                <li>Team retention / avoided rehiring cost</li>
                <li>Scale / franchise readiness</li>
                <li>Reduced key-person dependency</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom max-w-3xl mx-auto">
          <h2 className="heading-h2 mb-6">Write This Sentence Before You Present Anything</h2>
          <div className="rounded-xl bg-white border-2 border-dashed border-gray-300 p-6 md:p-8 font-medium text-gray-800 leading-relaxed">
            &quot;A ₹[X] investment in [specific improvement] is projected to deliver ₹[Y] in direct annual savings — a [Z]x return —
            with full payback in [N] months, excluding an estimated ₹[W] in strategic value from [specific indirect benefit].&quot;
          </div>
          <p className="body-default text-gray-600 mt-6">
            If you can&apos;t fill in this sentence with real numbers, you&apos;re not ready to present the business case. The{' '}
            <Link href="/consulting/resources/business-case-kit" className="text-teal-600 font-medium hover:underline">
              Business Case Kit
            </Link>{' '}
            gives you the templates to get there.
          </p>
        </div>
      </section>

      <section className="section-padding bg-navy-500 text-white">
        <div className="container-custom max-w-3xl mx-auto text-center space-y-10">
          <div>
            <h2 className="heading-h2 mb-4 text-white">Build Your Full Business Case</h2>
            <p className="body-large text-gray-100 mb-6">
              Templates, CBA sheets, and real client ROI data — all in one kit.
            </p>
            <Button variant="secondary" size="lg" asChild>
              <Link
                href="/consulting/resources/business-case-kit"
                onClick={() =>
                  trackResourceCtaClick({
                    cta_text: 'Download Business Case Kit',
                    destination: '/consulting/resources/business-case-kit',
                    page: PAGE,
                  })
                }
              >
                Download Business Case Kit
              </Link>
            </Button>
          </div>
          <div className="pt-8 border-t border-white/20">
            <h2 className="heading-h2 mb-4 text-white">Get a Number in 10 Minutes</h2>
            <p className="body-large text-gray-100 mb-6">
              Use our free ROI Calculator to estimate returns from your specific operational investment.
            </p>
            <Button variant="outline" size="lg" className="bg-transparent text-white border-white hover:bg-white/10" asChild>
              <Link
                href="/consulting/tools/roi"
                onClick={() =>
                  trackResourceCtaClick({
                    cta_text: 'Try ROI Calculator',
                    destination: '/consulting/tools/roi',
                    page: PAGE,
                  })
                }
              >
                Try ROI Calculator
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <ResourcePageFooter page={PAGE} />
    </div>
  );
}
