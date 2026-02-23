/**
 * Franchise Model Fit – scalability and unit economics score
 */

export interface ModelFitInput {
  grossMarginPercent: number;
  repeatCustomerRate: number;
  standardizableOperations: number;
  brandStrength: number;
}

export interface ModelFitResult {
  overallScore: number;
  fitLabel: string;
}

export function calculateModelFit(input: ModelFitInput): ModelFitResult {
  const scores = [
    input.grossMarginPercent,
    input.repeatCustomerRate,
    input.standardizableOperations,
    input.brandStrength,
  ];
  const overallScore = Math.round(
    scores.reduce((a, b) => a + b, 0) / scores.length
  );
  let fitLabel = 'weak';
  if (overallScore >= 70) fitLabel = 'strong';
  else if (overallScore >= 50) fitLabel = 'moderate';
  return { overallScore, fitLabel };
}
