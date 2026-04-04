export function CbaPanel() {
  return (
    <div className="space-y-8 pt-4 border-t border-gray-100">
      <div>
        <h4 className="heading-h4 mb-3">Template 1 — Single Initiative CBA</h4>
        <p className="body-default text-gray-600 mb-3">Use case: Evaluate one specific operational improvement initiative.</p>
        <pre className="whitespace-pre-wrap text-xs sm:text-sm bg-gray-50 p-4 rounded-lg border border-gray-200 font-mono overflow-x-auto">
          {`COST-BENEFIT ANALYSIS | SINGLE INITIATIVE
─────────────────────────────────────────
Initiative Name:    ___________________
Department:         ___________________
Prepared by:        ___________________
Date:               ___________
Analysis Period:    ___ months

SECTION A: COSTS
─────────────────────────────────────────
ONE-TIME COSTS:
  Consulting / Engagement Fee:     ₹ ___________
  Tool / Software setup:           ₹ ___________
  Training cost:                   ₹ ___________
  Internal time cost (setup):      ₹ ___________
  Other:                           ₹ ___________
  TOTAL ONE-TIME:                  ₹ ___________

RECURRING ANNUAL COSTS:
  Tool / Software subscriptions:   ₹ ___________/year
  Ongoing maintenance / reviews:   ₹ ___________/year
  Internal time (ongoing):         ₹ ___________/year
  TOTAL RECURRING (Year 1):        ₹ ___________

TOTAL YEAR 1 INVESTMENT:           ₹ ___________

SECTION B: BENEFITS
─────────────────────────────────────────
DIRECT / QUANTIFIABLE (Annual):
  Labour savings:                  ₹ ___________
  Rework cost eliminated:          ₹ ___________
  Error / defect cost reduced:     ₹ ___________
  Process cost reduction:          ₹ ___________
  Revenue protected:               ₹ ___________
  Additional capacity revenue:     ₹ ___________
  TOTAL DIRECT ANNUAL BENEFIT:     ₹ ___________

INDIRECT / STRATEGIC (state, don't add to ROI):
  [ ] Founder bandwidth freed: ___ hrs/month
  [ ] Improved investor readiness
  [ ] Reduced key-person dependency
  [ ] Improved team retention
  [ ] Scale / franchise readiness

SECTION C: ANALYSIS
─────────────────────────────────────────
Net Benefit (Year 1):
  = Direct Annual Benefit − Year 1 Investment = ₹ ___________

ROI (%):
  = Net Benefit ÷ Year 1 Investment × 100 = ___%

Payback Period:
  = Year 1 Investment ÷ (Direct Annual Benefit ÷ 12) = ___ months

Benefit-Cost Ratio:
  = Direct Annual Benefit ÷ Year 1 Investment = ___x

SECTION D: RECOMMENDATION
─────────────────────────────────────────
Decision: [ ] Proceed  [ ] Proceed with modifications  [ ] Do not proceed
Rationale: ________________________________________________
Key assumptions:
1. ___________________________________________
2. ___________________________________________
Risks to projected benefits:
1. ___________________________________________
2. ___________________________________________`}
        </pre>
      </div>

      <div>
        <h4 className="heading-h4 mb-3">Template 2 — Full Engagement CBA (Multi-Initiative)</h4>
        <p className="body-default text-gray-600 mb-3">Use case: Build the complete business case for a full TwelfthKey OpEx engagement.</p>
        <pre className="whitespace-pre-wrap text-xs sm:text-sm bg-gray-50 p-4 rounded-lg border border-gray-200 font-mono overflow-x-auto">
          {`WORKSTREAM BENEFIT SUMMARY

WORKSTREAM             | ONE-TIME | RECURRING/YR | ANNUAL BENEFIT | NET Y1 | PAYBACK
───────────────────────────────────────────────────────────────────────────────────
Process Documentation  | ₹___     | ₹___         | ₹___           | ₹___   | ___mo
KPI Dashboard Build    | ₹___     | ₹___         | ₹___           | ₹___   | ___mo
Governance / RACI Build| ₹___     | ₹___         | ₹___           | ₹___   | ___mo
Review Cadence Setup   | ₹___     | ₹___         | ₹___           | ₹___   | ___mo
Role Clarity Work      | ₹___     | ₹___         | ₹___           | ₹___   | ___mo
───────────────────────────────────────────────────────────────────────────────────
TOTALS                 | ₹___     | ₹___         | ₹___           | ₹___   | ___mo

ENGAGEMENT HEADLINE:
  Total Investment (Year 1):       ₹ ___________
  Total Direct Annual Value:       ₹ ___________
  ROI:                             ___%
  Payback Period:                  ___ months
  Benefit-Cost Ratio:              ___x

SENSITIVITY:
  Conservative (50% realisation):  ___% ROI | ___ months payback
  Base Case (75% realisation):     ___% ROI | ___ months payback
  Optimistic (100% realisation):   ___% ROI | ___ months payback`}
        </pre>
      </div>

      <div>
        <h4 className="heading-h4 mb-3">Template 3 — Founder&apos;s Quick ROI Estimator</h4>
        <p className="body-default text-gray-600 mb-3">Use case: 10-minute directional number before committing to full analysis.</p>
        <pre className="whitespace-pre-wrap text-xs sm:text-sm bg-gray-50 p-4 rounded-lg border border-gray-200 font-mono overflow-x-auto">
          {`STEP 1: YOUR OPERATIONAL COST BASE
  Monthly payroll (ops-heavy team):        ₹ ___________
  Monthly cost of rework / errors:         ₹ ___________
  Monthly cost of delays / late delivery:  ₹ ___________
  Your hours per week firefighting:        ___ hours
  Your effective hourly value:             ₹ ___________/hr

  TOTAL MONTHLY COST BASE:                 ₹ ___________

STEP 2: CONSERVATIVE IMPROVEMENT TARGETS
  Cost reduction (20% of cost base):       ₹ ___________/month
  Time saving (founder hours × rate × 50%):₹ ___________/month
  Rework elimination (80% of rework cost): ₹ ___________/month

  TOTAL MONTHLY VALUE CREATED:             ₹ ___________
  ANNUALISED:                              ₹ ___________

STEP 3: QUICK ROI
  TwelfthKey Engagement Cost:              ₹ ___________
  Annual Value Created:                    ₹ ___________
  ROI:        Annual Value ÷ Engagement Cost = ___x
  Payback:    Engagement Cost ÷ Monthly Value = ___ months

  Under 6 months  → The case is clear. Proceed.
  6–12 months     → Strong case. Validate assumptions.
  Over 12 months  → Revisit scope or assumptions.`}
        </pre>
      </div>
    </div>
  );
}
