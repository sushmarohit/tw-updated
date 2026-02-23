/**
 * Franchise Unit Economics – per-unit revenue, costs → margin and payback
 */

export interface UnitEconomicsInput {
  revenuePerUnit: number;   // per month or per year per unit
  costPerUnit: number;      // COGS + opex per unit
  upfrontFranchiseFee: number;
  period: 'monthly' | 'yearly'; // revenue/cost period
}

export interface UnitEconomicsResult {
  marginPerUnit: number;
  marginPercent: number;
  paybackMonths: number;   // franchise fee payback
}

export function calculateUnitEconomics(input: UnitEconomicsInput): UnitEconomicsResult {
  const { revenuePerUnit, costPerUnit, upfrontFranchiseFee, period } = input;
  const marginPerUnit = revenuePerUnit - costPerUnit;
  const marginPercent = revenuePerUnit > 0
    ? (marginPerUnit / revenuePerUnit) * 100
    : 0;
  const monthlyMargin = period === 'yearly' ? marginPerUnit / 12 : marginPerUnit;
  const paybackMonths = monthlyMargin > 0
    ? upfrontFranchiseFee / monthlyMargin
    : 999;
  return {
    marginPerUnit: Math.round(marginPerUnit * 100) / 100,
    marginPercent: Math.round(marginPercent * 10) / 10,
    paybackMonths: Math.round(paybackMonths * 10) / 10,
  };
}
