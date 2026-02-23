/**
 * Franchise Readiness – score from 5 dimensions
 */

export interface FranchiseReadinessInput {
  brandClarity: number;      // 0–100
  operationsDocumented: number; // 0–100
  unitEconomicsProven: number;  // 0–100
  legalCompliance: number;    // 0–100
  supportCapacity: number;   // 0–100
}

export interface FranchiseReadinessResult {
  overallScore: number;
  grade: string;
  label: string;
}

export function calculateFranchiseReadiness(input: FranchiseReadinessInput): FranchiseReadinessResult {
  const scores = [
    input.brandClarity,
    input.operationsDocumented,
    input.unitEconomicsProven,
    input.legalCompliance,
    input.supportCapacity,
  ];
  const overallScore = Math.round(
    scores.reduce((a, b) => a + b, 0) / scores.length
  );
  let grade = 'D';
  let label = 'not-ready';
  if (overallScore >= 80) {
    grade = 'A';
    label = 'ready';
  } else if (overallScore >= 65) {
    grade = 'B';
    label = 'almost';
  } else if (overallScore >= 50) {
    grade = 'C';
    label = 'needs-work';
  }
  return { overallScore, grade, label };
}
