/**
 * Fundraise Readiness – score from 5 dimensions (0–100 each), average = overall
 */

export interface FundraiseReadinessInput {
  financialsReady: number;   // 0–100
  deckPitchReady: number;    // 0–100
  teamInvestorFit: number;   // 0–100
  marketTraction: number;    // 0–100
  legalDueDiligence: number; // 0–100
}

export interface FundraiseReadinessResult {
  overallScore: number;
  grade: string; // A–D
  label: string; // ready / almost / needs-work / not-ready
}

export function calculateFundraiseReadiness(input: FundraiseReadinessInput): FundraiseReadinessResult {
  const scores = [
    input.financialsReady,
    input.deckPitchReady,
    input.teamInvestorFit,
    input.marketTraction,
    input.legalDueDiligence,
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
