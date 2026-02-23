/**
 * Instrument Fit – debt vs equity recommendation from stage and revenue
 */

export interface InstrumentFitInput {
  annualRevenue: number;   // 0 = pre-revenue
  growthRatePercent: number; // e.g. 15
  hasCollateral: boolean;  // e.g. inventory, receivables
}

export interface InstrumentFitResult {
  recommendation: 'equity' | 'debt' | 'hybrid';
  confidence: 'high' | 'medium' | 'low';
  reason: string;
}

export function calculateInstrumentFit(input: InstrumentFitInput): InstrumentFitResult {
  const { annualRevenue, growthRatePercent, hasCollateral } = input;
  const isPreRevenue = annualRevenue <= 0;
  const highGrowth = growthRatePercent >= 30;
  if (isPreRevenue || highGrowth) {
    return {
      recommendation: 'equity',
      confidence: isPreRevenue ? 'high' : 'medium',
      reason: isPreRevenue
        ? 'Pre-revenue or early stage: equity is the standard fit.'
        : 'High growth favours equity to preserve cash and align with investors.',
    };
  }
  if (hasCollateral && annualRevenue >= 500000 && growthRatePercent < 20) {
    return {
      recommendation: 'debt',
      confidence: 'high',
      reason: 'Revenue and collateral support debt; avoids dilution.',
    };
  }
  return {
    recommendation: 'hybrid',
    confidence: 'medium',
    reason: 'Mix of debt (e.g. venture debt) and equity can balance cost and dilution.',
  };
}
