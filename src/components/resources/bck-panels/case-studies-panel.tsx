import Link from 'next/link';
import { Button } from '@/components/ui/button';

function OutcomesTable({ rows }: { rows: [string, string, string, string][] }) {
  return (
    <div className="overflow-x-auto mt-3">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-navy-500 text-white">
            <th className="text-left p-2">Metric</th>
            <th className="text-left p-2">Before</th>
            <th className="text-left p-2">After</th>
            <th className="text-left p-2">Change</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([m, b, a, c]) => (
            <tr key={m} className="border-b border-gray-200">
              <td className="p-2 font-medium">{m}</td>
              <td className="p-2 text-gray-700">{b}</td>
              <td className="p-2 text-gray-700">{a}</td>
              <td className="p-2 text-gray-700">{c}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function CaseStudiesPanel() {
  return (
    <div className="space-y-10 pt-4 border-t border-gray-100">
      <article>
        <h4 className="heading-h4 mb-2">Case Study 1 — Augrev | Hospitality</h4>
        <h5 className="font-semibold text-gray-900 mt-3">The Problem</h5>
        <p className="body-default text-gray-700">
          Augrev was running operations entirely on WhatsApp messages and personal memory. No documented process for delivery,
          no clear ownership of tasks, no structured review rhythm. The founder was the single point of contact for every
          client question, every delivery decision, and every escalation.
        </p>
        <p className="body-default text-gray-600 italic mt-2">
          &quot;We were running operations on WhatsApp and memory.&quot; — Founder, Augrev
        </p>
        <h5 className="font-semibold text-gray-900 mt-3">The Intervention</h5>
        <p className="body-default text-gray-700">
          8-week OpEx sprint: current-state assessment → SOP documentation for top 5 delivery processes → ownership assigned
          per function → weekly review cadence established → KPI tracker built → governance handover with team training.
        </p>
        <h5 className="font-semibold text-gray-900 mt-3">Outcomes</h5>
        <OutcomesTable
          rows={[
            ['Founder hrs/week in ops', '~30 hours', '~12 hours', '−60%'],
            ['Delivery predictability', 'Inconsistent', 'Predictable week-on-week', 'Structural shift'],
            ['Decision escalations to founder', 'Almost all decisions', 'Strategic decisions only', 'Dependency removed'],
          ]}
        />
        <h5 className="font-semibold text-gray-900 mt-3">Direct Annual Value Estimate</h5>
        <ul className="list-disc pl-5 body-default text-gray-700 space-y-1">
          <li>Founder bandwidth freed: 18 hrs/week × ₹5,000/hr effective rate × 48 weeks = ₹43.2L/year</li>
          <li>Rework and re-delivery cost reduction: estimated ₹8–12L/year</li>
          <li>Client retention from predictable delivery: 1–2 clients retained that would otherwise have churned</li>
        </ul>
      </article>

      <article>
        <h4 className="heading-h4 mb-2">Case Study 2 — Anexx | B2B Services</h4>
        <h5 className="font-semibold text-gray-900 mt-3">The Problem</h5>
        <p className="body-default text-gray-700">
          {
            "Work kept looping back. A task completed, sent forward, and returned for corrections — because inputs weren't clear, ownership wasn't defined, and approvals happened verbally with no documented trail."
          }
        </p>
        <p className="body-default text-gray-600 italic mt-2">
          {`"Our biggest issue wasn't effort — it was rework." — Founder, Anexx`}
        </p>
        <h5 className="font-semibold text-gray-900 mt-3">The Intervention</h5>
        <p className="body-default text-gray-700">
          Process Excellence engagement: cross-functional handoff redesign → RACI Matrix implementation → Delegation of Authority
          framework → single source of truth for project tracking.
        </p>
        <h5 className="font-semibold text-gray-900 mt-3">Outcomes</h5>
        <OutcomesTable
          rows={[
            ['Rework rate', '~35% of tasks', '~8%', '−77%'],
            ['Approval turnaround time', '24–48+ hours', '2–4 hours', '−80%'],
            ['Information version conflicts', 'Frequent', 'Eliminated', 'Single source of truth'],
          ]}
        />
        <h5 className="font-semibold text-gray-900 mt-3">Direct Annual Value Estimate</h5>
        <ul className="list-disc pl-5 body-default text-gray-700 space-y-1">
          <li>Rework elimination: ₹50,000/month rework cost × 77% reduction = ₹46.2L/year</li>
          <li>Escalation handling time recovered: 10 hrs/week × ₹3,000/hr × 48 weeks = ₹14.4L/year</li>
        </ul>
      </article>

      <article>
        <h4 className="heading-h4 mb-2">Case Study 3 — Asta by Avim | Consumer Brand</h4>
        <h5 className="font-semibold text-gray-900 mt-3">The Problem</h5>
        <p className="body-default text-gray-700">
          Strong product-market fit, but execution was founder-dependent. Priorities shifted mid-week. Team members waited for
          decisions. Work started without clarity on what &quot;done&quot; looked like.
        </p>
        <p className="body-default text-gray-600 italic mt-2">
          &quot;Execution relied heavily on the founder; priorities changed mid-week and decisions waited for follow-ups.&quot; —
          Founder, Asta by Avim
        </p>
        <h5 className="font-semibold text-gray-900 mt-3">The Intervention</h5>
        <p className="body-default text-gray-700">
          Decision Rights Matrix → weekly priority-setting SOP → team accountability structure with owned metrics → founder
          calendar redesigned to 3 structured touchpoints per week.
        </p>
        <h5 className="font-semibold text-gray-900 mt-3">Outcomes</h5>
        <OutcomesTable
          rows={[
            ['Decisions requiring founder', '~85% of all decisions', '~30%', '−65%'],
            ['Founder time on strategy', '< 20% of working week', '> 50% of working week', '+30% strategic bandwidth'],
            ['Mid-week priority disruptions', 'Several per week', 'Structured exception only', 'Eliminated ad hoc chaos'],
          ]}
        />
      </article>

      <article>
        <h4 className="heading-h4 mb-2">Case Study 4 — CAV Projects | EPC / Infrastructure</h4>
        <h5 className="font-semibold text-gray-900 mt-3">The Problem</h5>
        <p className="body-default text-gray-700">
          Government liaison work with no system to track what was pending, with whom, and what the next action was. Projects
          moved only when someone remembered to chase.
        </p>
        <p className="body-default text-gray-600 italic mt-2">
          &quot;Nobody knows what&apos;s pending, with whom, and what the next step is.&quot; — Founder, CAV Projects
        </p>
        <h5 className="font-semibold text-gray-900 mt-3">The Intervention</h5>
        <p className="body-default text-gray-700">
          Single project tracker for all active workstreams → follow-up cadence SOP with auto-flagging → 30-minute weekly review
          rhythm → every interaction logged with date, contact, response, and next step.
        </p>
        <h5 className="font-semibold text-gray-900 mt-3">Outcomes</h5>
        <OutcomesTable
          rows={[
            ['Project status visibility', 'Founder only', 'Full team visibility', '100% access'],
            ['Follow-up gaps (> 5 days no action)', 'Frequent', 'Eliminated by cadence', 'Structural fix'],
            ['Daily firefighting calls', 'Multiple per day', 'Near-zero', 'Process-driven, not reactive'],
          ]}
        />
        <h5 className="font-semibold text-gray-900 mt-3">Direct Annual Value Estimate</h5>
        <ul className="list-disc pl-5 body-default text-gray-700 space-y-1">
          <li>One approval accelerated by 4 weeks on a ₹5Cr project → working capital benefit: ₹10–15L</li>
          <li>Founder firefighting reduced: 2 hrs/day × ₹10,000/hr × 250 days = ₹50L/year in bandwidth</li>
        </ul>
      </article>

      <article>
        <h4 className="heading-h4 mb-2">Case Study 5 — Manufacturing MSME | Maharashtra</h4>
        <p className="body-small text-gray-600 mb-2">Sector: Manufacturing | Revenue: ₹15–40Cr range | Engagement: Full OpEx + Analytics</p>
        <h5 className="font-semibold text-gray-900 mt-3">The Problem</h5>
        <p className="body-default text-gray-700">
          ₹20Cr+ revenue business running on the same informal processes as when it was ₹3Cr. No consolidated performance view.
          Verbal reporting in Monday meetings — numbers unverified, comparisons impossible, trends invisible.
        </p>
        <h5 className="font-semibold text-gray-900 mt-3">The Intervention</h5>
        <p className="body-default text-gray-700">
          Current-state assessment → Waste Identification Map across production, quality, finance, dispatch → KPI dashboards in
          Power BI (Executive + Operations) → SOP Library for 6 highest-rework processes → daily production stand-up + weekly
          leadership KPI review.
        </p>
        <h5 className="font-semibold text-gray-900 mt-3">Outcomes</h5>
        <OutcomesTable
          rows={[
            ['Production cycle time', '40% above benchmark', 'At benchmark', '−28%'],
            ['Rework rate', '22%', '7%', '−68%'],
            ['Finance reconciliation hours', '60 hrs/month', '18 hrs/month', '−70%'],
            ['Dashboard availability', 'None', 'Live daily', 'Full visibility'],
          ]}
        />
        <h5 className="font-semibold text-gray-900 mt-3">Direct Annual Value</h5>
        <ul className="list-disc pl-5 body-default text-gray-700 space-y-1">
          <li>Rework reduction on ₹20Cr revenue: ₹90L–₹1.2Cr/year</li>
          <li>Finance time saving: 42 hrs/month × ₹800/hr = ₹4L/year</li>
          <li>Cycle time improvement → 15% additional capacity unlocked: ₹3Cr/year potential at current margins</li>
          <li>
            <strong>ROI: 8x–12x in Year 1 | Payback: &lt; 2 months</strong>
          </li>
        </ul>
      </article>

      <div className="pt-4">
        <Button variant="outline" asChild>
          <Link href="/consulting/case-studies/hub">See All Case Studies</Link>
        </Button>
      </div>
    </div>
  );
}
