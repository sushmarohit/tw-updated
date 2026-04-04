export function ImpactPanel() {
  return (
    <div className="space-y-8 pt-4 border-t border-gray-100">
      <div>
        <h4 className="heading-h4 mb-3">Three Dimensions of Operational Impact</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-navy-500 text-white">
                <th className="text-left p-3">Dimension</th>
                <th className="text-left p-3">What It Measures</th>
                <th className="text-left p-3">Primary Metrics</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Efficiency', 'How fast and resource-lightly the business operates', 'Cycle time, throughput, cost per unit'],
                ['Quality', 'How reliably outputs meet the required standard', 'Error rate, rework rate, on-time delivery, CSAT'],
                ['Governance Maturity', 'How structurally sound the operating system is', 'GMI score, process compliance rate, decision log rate'],
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
        <h4 className="heading-h4 mb-3">Dimension 1 — Measuring Efficiency Impact</h4>
        <p className="body-small text-gray-600 mb-2">Before / After Baseline template for each metric:</p>
        <pre className="whitespace-pre-wrap text-xs sm:text-sm bg-gray-50 p-4 rounded-lg border border-gray-200 font-mono overflow-x-auto">
          {`METRIC: _________________________

BASELINE (before improvement):
  Value:            ___ [units]
  Measurement date: ___________
  How measured:     ___________

POST-IMPLEMENTATION:
  Value:            ___ [units]
  Measurement date: ___________

CHANGE:
  Absolute change:    ___ [units]
  % Change:           ___%
  Annualised value:   ₹ ___ (change × frequency × ₹ value per unit)

ATTRIBUTION:
  [What specifically changed to drive this improvement]`}
        </pre>
        <h5 className="font-semibold text-gray-900 mt-4 mb-2">Core efficiency metrics to track</h5>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-teal-600 text-white">
                <th className="text-left p-3">Metric</th>
                <th className="text-left p-3">How to Measure</th>
                <th className="text-left p-3">Target Improvement</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Process Cycle Time', 'Avg. time from trigger to output', '−25%'],
                ['Founder Hours in Operations', 'Weekly hours founder spends on ops tasks', '−50% within 12 weeks'],
                ['Cost Per Process Execution', 'Total cost ÷ monthly process run count', '−20%'],
                ['Rework Hours per Week', 'Hours spent correcting errors', '−80%'],
                ['Approval Bottleneck Time', 'Avg. wait time for decisions', '−60%'],
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
        <h4 className="heading-h4 mb-3">Dimension 2 — Measuring Quality Impact</h4>
        <p className="font-semibold text-gray-900 mb-2">Output quality</p>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-navy-500 text-white">
                <th className="text-left p-3">Metric</th>
                <th className="text-left p-3">Target</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Error / Defect Rate', '< 5%'],
                ['Rework Rate', '< 5%'],
                ['First-Time-Right Rate', '> 95%'],
              ].map(([a, b]) => (
                <tr key={String(a)} className="border-b border-gray-200">
                  <td className="p-3">{a}</td>
                  <td className="p-3">{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="font-semibold text-gray-900 mb-2">Delivery quality</p>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-navy-500 text-white">
                <th className="text-left p-3">Metric</th>
                <th className="text-left p-3">Target</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['On-Time Delivery Rate', '≥ 95%'],
                ['SLA Compliance Rate', '≥ 98%'],
                ['Escalation Rate', '< 5%'],
              ].map(([a, b]) => (
                <tr key={String(a)} className="border-b border-gray-200">
                  <td className="p-3">{a}</td>
                  <td className="p-3">{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="font-semibold text-gray-900 mb-2">Customer quality perception</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-navy-500 text-white">
                <th className="text-left p-3">Metric</th>
                <th className="text-left p-3">Target</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['CSAT Score', '≥ 4.2 / 5'],
                ['NPS', '≥ 40'],
                ['Complaint Rate', '< 2%'],
              ].map(([a, b]) => (
                <tr key={String(a)} className="border-b border-gray-200">
                  <td className="p-3">{a}</td>
                  <td className="p-3">{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h4 className="heading-h4 mb-3">Dimension 3 — Measuring Governance Maturity Impact</h4>
        <p className="body-default text-gray-700 mb-3">
          Track GMI score at three points: <strong>Baseline</strong> — start of engagement; <strong>Mid-point</strong> — 6 weeks;
          <strong>Close</strong> — 12 weeks.
        </p>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-teal-600 text-white">
                <th className="text-left p-3">Metric</th>
                <th className="text-left p-3">Target</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Process Compliance Rate', '≥ 90%'],
                ['SOP Coverage Rate', '100%'],
                ['Action Item Closure Rate', '≥ 95%'],
                ['Review Cadence Adherence', '100%'],
              ].map(([a, b]) => (
                <tr key={String(a)} className="border-b border-gray-200">
                  <td className="p-3">{a}</td>
                  <td className="p-3">{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h4 className="heading-h4 mb-3">Impact Measurement Calendar</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-navy-500 text-white">
                <th className="text-left p-3">Timing</th>
                <th className="text-left p-3">What to Measure</th>
                <th className="text-left p-3">Owner</th>
                <th className="text-left p-3">Output</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Day 0', 'All baseline metrics', 'TwelfthKey + Ops Head', 'Baseline Report'],
                ['Week 3', 'Efficiency metrics (quick wins validation)', 'Ops Head', 'Weekly Review Dashboard'],
                ['Week 6', 'Full snapshot — all 3 dimensions', 'TwelfthKey + CEO', 'Mid-Point Review Deck'],
                ['Week 12', 'Full impact report', 'TwelfthKey', 'Final Impact Report'],
                ['Month 6', 'Sustainability check', 'Ops Head', 'Quarterly Governance Review'],
                ['Month 12', 'Annual impact statement', 'CEO', 'Investor / Board Pack'],
              ].map(([a, b, c, d]) => (
                <tr key={String(a)} className="border-b border-gray-200">
                  <td className="p-3 font-medium">{a}</td>
                  <td className="p-3 text-gray-700">{b}</td>
                  <td className="p-3 text-gray-700">{c}</td>
                  <td className="p-3 text-gray-700">{d}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h4 className="heading-h4 mb-3">Presenting Impact Credibly — the 5-sentence structure</h4>
        <ol className="list-decimal pl-5 space-y-2 body-default text-gray-700">
          <li>&quot;Before the engagement, [metric] was at [X].&quot;</li>
          <li>&quot;After [specific intervention], [metric] improved to [Y].&quot;</li>
          <li>&quot;This improvement was driven by [specific action].&quot;</li>
          <li>&quot;This translates to ₹[Z] in [annual savings / revenue protection / cost avoidance].&quot;</li>
          <li>&quot;This gain is sustained through [compliance monitoring / review cadence / SOP ownership].&quot;</li>
        </ol>
        <p className="mt-3 text-sm text-gray-600">
          Never present percentages without absolute numbers. &quot;25% cycle time reduction&quot; is defensible. &quot;25% better&quot; is not.
        </p>
      </div>
    </div>
  );
}
