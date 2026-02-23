/**
 * Raise Amount – size round from target runway and monthly burn
 */

export interface RaiseAmountInput {
  monthlyBurn: number;
  targetRunwayMonths: number;
  bufferPercent?: number; // e.g. 20 for 20% buffer
}

export interface RaiseAmountResult {
  amountToRaise: number;
  withBuffer: number;
  bufferPercent: number;
}

export function calculateRaiseAmount(input: RaiseAmountInput): RaiseAmountResult {
  const { monthlyBurn, targetRunwayMonths, bufferPercent = 20 } = input;
  const amountToRaise = monthlyBurn * targetRunwayMonths;
  const withBuffer = amountToRaise * (1 + bufferPercent / 100);
  return {
    amountToRaise: Math.round(amountToRaise),
    withBuffer: Math.round(withBuffer),
    bufferPercent,
  };
}
