/**
 * Runway Check – estimate months of runway from cash and burn
 */

export interface RunwayInput {
  cashBalance: number;
  monthlyBurn: number;
}

export interface RunwayResult {
  runwayMonths: number;
  runwayLabel: string; // "critical" | "short" | "healthy" | "strong"
}

export function calculateRunway(input: RunwayInput): RunwayResult {
  const { cashBalance, monthlyBurn } = input;
  const runwayMonths = monthlyBurn > 0 ? cashBalance / monthlyBurn : 999;
  let runwayLabel: RunwayResult['runwayLabel'] = 'strong';
  if (runwayMonths < 3) runwayLabel = 'critical';
  else if (runwayMonths < 6) runwayLabel = 'short';
  else if (runwayMonths < 12) runwayLabel = 'healthy';
  return {
    runwayMonths: Math.round(runwayMonths * 10) / 10,
    runwayLabel,
  };
}
