/**
 * Franchise Capacity Planner – units to open, time per unit → timeline
 */

export interface CapacityInput {
  targetUnits: number;
  monthsPerUnitLaunch: number; // e.g. 2 = can open 1 unit every 2 months
  teamCapacity: number; // max parallel launches, e.g. 2
}

export interface CapacityResult {
  totalMonths: number;
  unitsPerMonth: number;
  suggestedTimeline: string;
}

export function calculateCapacity(input: CapacityInput): CapacityResult {
  const { targetUnits, monthsPerUnitLaunch, teamCapacity } = input;
  const unitsPerMonth = teamCapacity / monthsPerUnitLaunch;
  const totalMonths = unitsPerMonth > 0
    ? Math.ceil(targetUnits / unitsPerMonth)
    : 999;
  const suggestedTimeline =
    totalMonths <= 12
      ? `${totalMonths} months`
      : `${Math.floor(totalMonths / 12)} year(s) ${totalMonths % 12} months`;
  return {
    totalMonths,
    unitsPerMonth: Math.round(unitsPerMonth * 100) / 100,
    suggestedTimeline,
  };
}
