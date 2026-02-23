/**
 * Dilution – pre-money, investment → post-money and % dilution
 */

export interface DilutionInput {
  preMoneyValuation: number;
  investmentAmount: number;
}

export interface DilutionResult {
  postMoneyValuation: number;
  dilutionPercent: number;
  founderEquityPercent: number;
}

export function calculateDilution(input: DilutionInput): DilutionResult {
  const { preMoneyValuation, investmentAmount } = input;
  const postMoneyValuation = preMoneyValuation + investmentAmount;
  const dilutionPercent = postMoneyValuation > 0
    ? (investmentAmount / postMoneyValuation) * 100
    : 0;
  const founderEquityPercent = 100 - dilutionPercent;
  return {
    postMoneyValuation: Math.round(postMoneyValuation),
    dilutionPercent: Math.round(dilutionPercent * 10) / 10,
    founderEquityPercent: Math.round(founderEquityPercent * 10) / 10,
  };
}
