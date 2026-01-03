/**
 * ROI Calculator
 * Projects returns from operational investments
 */

export interface ROIInput {
  totalCost: number;
  monthlyBenefits: number;
  implementationDuration: number; // Months
  annualBenefits?: number; // Optional, calculated if not provided
}

export interface ROIResult {
  roi: number; // Percentage
  paybackPeriod: number; // Months
  netBenefit: number; // Annual
  totalBenefit: number; // Over 3 years
  breakEvenMonth: number;
  scenarios: {
    conservative: { roi: number; payback: number };
    realistic: { roi: number; payback: number };
    optimistic: { roi: number; payback: number };
  };
}

/**
 * Calculate ROI
 */
export function calculateROI(input: ROIInput): ROIResult {
  const { totalCost, monthlyBenefits, implementationDuration, annualBenefits } = input;

  // Calculate annual benefits
  const annualBenefit = annualBenefits || monthlyBenefits * 12;

  // ROI calculation
  const roi = ((annualBenefit - totalCost) / totalCost) * 100;

  // Payback period (months)
  // Handle edge case: zero or very small monthly benefits
  let paybackPeriod: number;
  if (monthlyBenefits <= 0 || (monthlyBenefits > 0 && totalCost / monthlyBenefits > 60)) {
    paybackPeriod = 999;
  } else {
    let cumulativeBenefit = 0;
    let month = implementationDuration;
    while (cumulativeBenefit < totalCost && month < 60) {
      cumulativeBenefit += monthlyBenefits;
      month++;
    }
    // If we hit the 60-month cap, return a very large number
    paybackPeriod = cumulativeBenefit < totalCost ? 999 : month;
  }

  // Break-even month
  const breakEvenMonth = paybackPeriod;

  // Net benefit (annual) - account for implementation duration
  // If implementation takes longer than 12 months, first year benefit is reduced
  let firstYearBenefit = annualBenefit;
  if (implementationDuration > 12) {
    // No benefits in first year if implementation takes more than 12 months
    firstYearBenefit = 0;
  } else if (implementationDuration > 0) {
    // Reduce first year benefit proportionally
    // Use monthlyBenefits directly if available, otherwise calculate from annualBenefit
    const effectiveMonthlyBenefits = monthlyBenefits || (annualBenefit / 12);
    const monthsWithBenefits = 12 - implementationDuration;
    firstYearBenefit = effectiveMonthlyBenefits * monthsWithBenefits;
  }
  const netBenefit = firstYearBenefit - totalCost;

  // Total benefit over 3 years
  const totalBenefit = annualBenefit * 3 - totalCost;

  // Scenario analysis
  const scenarios = {
    conservative: {
      roi: ((annualBenefit * 0.8 - totalCost) / totalCost) * 100, // 20% lower benefits
      payback: totalCost / (monthlyBenefits * 0.8),
    },
    realistic: {
      roi,
      payback: paybackPeriod,
    },
    optimistic: {
      roi: ((annualBenefit * 1.2 - totalCost) / totalCost) * 100, // 20% higher benefits
      payback: totalCost / (monthlyBenefits * 1.2),
    },
  };

  return {
    roi: Math.round(roi * 10) / 10,
    paybackPeriod: Math.round(paybackPeriod * 10) / 10,
    netBenefit: Math.round(netBenefit),
    totalBenefit: Math.round(totalBenefit),
    breakEvenMonth: Math.round(breakEvenMonth),
    scenarios: {
      conservative: {
        roi: Math.round(scenarios.conservative.roi * 10) / 10,
        payback: Math.round(scenarios.conservative.payback * 10) / 10,
      },
      realistic: {
        roi: Math.round(scenarios.realistic.roi * 10) / 10,
        payback: Math.round(scenarios.realistic.payback * 10) / 10,
      },
      optimistic: {
        roi: Math.round(scenarios.optimistic.roi * 10) / 10,
        payback: Math.round(scenarios.optimistic.payback * 10) / 10,
      },
    },
  };
}

