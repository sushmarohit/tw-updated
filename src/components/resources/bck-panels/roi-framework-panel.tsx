import Link from 'next/link';

export function RoiFrameworkPanel() {
  return (
    <div className="space-y-8 pt-4 border-t border-gray-100">
      <div>
        <h4 className="heading-h4 mb-3">The Dual-Lens Approach</h4>
        <p className="body-default text-gray-600 mb-4">
          Every operational investment is evaluated on two dimensions in parallel:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-navy-500 text-white">
                <th className="text-left p-3 font-semibold">Lens</th>
                <th className="text-left p-3 font-semibold">What It Captures</th>
                <th className="text-left p-3 font-semibold">Who Cares Most</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <tr className="border-b border-gray-200">
                <td className="p-3 font-medium">Direct ROI</td>
                <td className="p-3 text-gray-700">Cost savings, time savings, error reduction — measurable and short-term</td>
                <td className="p-3 text-gray-700">CFO / Finance Head</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">Indirect ROI</td>
                <td className="p-3 text-gray-700">Founder bandwidth freed, investor readiness, scale enablement — strategic and compounding</td>
                <td className="p-3 text-gray-700">CEO / Founder / Board</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h4 className="heading-h4 mb-3">Step 1 — Calculate Total Investment Cost</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-teal-600 text-white">
                <th className="text-left p-3">Component</th>
                <th className="text-left p-3">Definition</th>
                <th className="text-left p-3">How to Estimate</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Engagement Fee', 'TwelfthKey consulting fee', 'Per package'],
                ['Tool Costs', 'Software subscriptions required', 'Monthly tool cost × engagement period'],
                [
                  'Internal Time Cost',
                  'Team hours on implementation × hourly rate',
                  'Estimate 5–10 hrs/week per dept head during sprints',
                ],
                [
                  'Transition Cost',
                  'Temporary productivity dip during change',
                  'Typically 10–15% of team capacity for weeks 3–6',
                ],
              ].map(([a, b, c]) => (
                <tr key={String(a)} className="border-b border-gray-200">
                  <td className="p-3 font-medium">{a}</td>
                  <td className="p-3 text-gray-700">{b}</td>
                  <td className="p-3 text-gray-700">{c}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h4 className="heading-h4 mb-3">Step 2 — Calculate Direct Annual Value</h4>
        <p className="body-default text-gray-700 mb-2">
          <strong>Direct Annual Value</strong> = Cost Savings + Time Savings + Error Reduction Value + Revenue Protection
        </p>
        <ul className="list-disc pl-5 space-y-2 body-default text-gray-700">
          <li>
            <strong>Cost savings:</strong> Reduction in operational costs (target: 20% of relevant cost base); rework cost
            elimination; vendor savings
          </li>
          <li>
            <strong>Time savings (convert to ₹):</strong> Cycle time reduction (target: 25%); founder hours freed from
            firefighting; meeting time reduced through structured reviews
          </li>
          <li>
            <strong>Error reduction value:</strong> Average rework cost × incidents per month × reduction %; escalation cost ×
            reduction %
          </li>
          <li>
            <strong>Revenue protection:</strong> On-time delivery improvement → reduced client attrition; faster delivery cycle →
            additional capacity
          </li>
        </ul>
      </div>

      <div>
        <h4 className="heading-h4 mb-3">Step 3 — Calculate Indirect Annual Value</h4>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-navy-500 text-white">
                <th className="text-left p-3">Indirect Benefit</th>
                <th className="text-left p-3">Estimation Method</th>
                <th className="text-left p-3">Conservative Value</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Founder bandwidth freed', 'Hours/month freed × opportunity cost', '20–40 hrs/month × ₹5,000–₹15,000/hr effective rate'],
                ['Investor readiness', 'Valuation premium for operationally structured businesses', "10–20% uplift — document separately, don't add to headline ROI"],
                ['Leadership retention', 'Avoided cost of senior hire replacement', '6–9 months salary per retained senior team member'],
                ['Franchise / scale readiness', 'Avoided cost of failed expansion attempts', 'Estimate 1–2 failed expansion costs avoided'],
              ].map(([a, b, c]) => (
                <tr key={String(a)} className="border-b border-gray-200">
                  <td className="p-3 font-medium">{a}</td>
                  <td className="p-3 text-gray-700">{b}</td>
                  <td className="p-3 text-gray-700">{c}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="body-default text-gray-700">
          Indirect value is presented separately — never added to Direct ROI in the headline number. Label it:{' '}
          <strong>&quot;Strategic Value Beyond the Numbers.&quot;</strong>
        </p>
      </div>

      <div>
        <h4 className="heading-h4 mb-3">Step 4 — Calculate ROI and Payback</h4>
        <div className="space-y-3 font-mono text-sm bg-gray-50 p-4 rounded-lg border border-gray-200">
          <p>ROI (%) = (Direct Annual Value − Total Investment) ÷ Total Investment × 100</p>
          <p>Payback Period = Total Investment ÷ (Direct Annual Value ÷ 12) [months]</p>
        </div>
      </div>

      <div>
        <h4 className="heading-h4 mb-3">Step 5 — Sensitivity Analysis (always present three scenarios)</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-teal-600 text-white">
                <th className="text-left p-3">Scenario</th>
                <th className="text-left p-3">Assumption</th>
                <th className="text-left p-3">Present As</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Conservative', '50% of projected savings materialise', 'What you defend'],
                ['Base Case', '75% of projected savings materialise', 'What you expect'],
                ['Optimistic', '100% of projected savings materialise', 'The ceiling'],
              ].map(([a, b, c]) => (
                <tr key={String(a)} className="border-b border-gray-200">
                  <td className="p-3 font-medium">{a}</td>
                  <td className="p-3 text-gray-700">{b}</td>
                  <td className="p-3 text-gray-700">{c}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h4 className="heading-h4 mb-3">Step 6 — The One-Sentence Summary</h4>
        <blockquote className="border-l-4 border-gold-500 pl-4 body-default text-gray-800 italic">
          &quot;A ₹[X] investment in operational transformation is projected to deliver ₹[Y] in direct annual savings — a [Z]x return
          — with full payback in [N] months. This excludes an estimated ₹[W] in strategic value from [specific indirect
          benefits].&quot;
        </blockquote>
      </div>

      <p className="body-default text-gray-700">
        For the conceptual thinking behind this framework,{' '}
        <Link href="/consulting/resources/roi-guide" className="text-teal-600 font-medium hover:underline">
          Read the ROI Guide
        </Link>
        .
      </p>
    </div>
  );
}
