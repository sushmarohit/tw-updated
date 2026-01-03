/**
 * Team Burnout Risk Finder
 * Identifies burnout triggers before they impact performance
 */

export interface BurnoutRiskInput {
  averageOvertime: number; // Hours per week
  deadlineMissRate: number; // Percentage (0-100)
  employeeEngagement: number; // 0-100
  absenteeismRate: number; // Percentage (0-100)
  workloadScore: number; // 0-100 (higher = more workload)
}

export interface BurnoutRiskResult {
  overallRisk: 'Low' | 'Moderate' | 'High' | 'Critical';
  riskScore: number; // 0-100
  factors: {
    overtime: { risk: string; score: number };
    deadlines: { risk: string; score: number };
    engagement: { risk: string; score: number };
    absenteeism: { risk: string; score: number };
    workload: { risk: string; score: number };
  };
  recommendations: string[];
  urgency: 'Low' | 'Medium' | 'High' | 'Critical';
}

/**
 * Calculate burnout risk
 */
export function calculateBurnoutRisk(input: BurnoutRiskInput): BurnoutRiskResult {
  const { averageOvertime, deadlineMissRate, employeeEngagement, absenteeismRate, workloadScore } = input;

  // Calculate individual risk scores (0-100, higher = more risk)
  const overtimeRisk = Math.min(100, (averageOvertime / 20) * 100); // 20+ hours = 100% risk
  const deadlineRisk = deadlineMissRate; // Direct mapping
  const engagementRisk = 100 - employeeEngagement; // Inverted
  const absenteeismRisk = absenteeismRate * 2; // Amplified
  const workloadRisk = workloadScore; // Direct mapping

  // Weighted average
  const weights = {
    overtime: 0.25,
    deadlines: 0.20,
    engagement: 0.25,
    absenteeism: 0.15,
    workload: 0.15,
  };

  const overallRiskScore =
    overtimeRisk * weights.overtime +
    deadlineRisk * weights.deadlines +
    engagementRisk * weights.engagement +
    absenteeismRisk * weights.absenteeism +
    workloadRisk * weights.workload;

  // Determine risk level
  let overallRisk: BurnoutRiskResult['overallRisk'];
  if (overallRiskScore < 30) overallRisk = 'Low';
  else if (overallRiskScore < 50) overallRisk = 'Moderate';
  else if (overallRiskScore < 70) overallRisk = 'High';
  else overallRisk = 'Critical';

  // Determine urgency (map Moderate to Medium)
  const urgency: BurnoutRiskResult['urgency'] = overallRisk === 'Moderate' ? 'Medium' : overallRisk;

  // Factor risk levels
  const getRiskLevel = (score: number): string => {
    if (score < 30) return 'Low';
    if (score < 50) return 'Moderate';
    if (score < 70) return 'High';
    return 'Critical';
  };

  // Generate recommendations
  const recommendations: string[] = [];
  if (overtimeRisk > 50) {
    recommendations.push('Reduce overtime by improving capacity planning and workload distribution');
  }
  if (deadlineRisk > 40) {
    recommendations.push('Improve project planning and resource allocation to meet deadlines');
  }
  if (engagementRisk > 50) {
    recommendations.push('Conduct employee engagement surveys and address feedback');
  }
  if (absenteeismRisk > 30) {
    recommendations.push('Investigate root causes of absenteeism and implement wellness programs');
  }
  if (workloadRisk > 60) {
    recommendations.push('Redistribute workload and consider hiring additional resources');
  }
  if (overallRiskScore > 60) {
    recommendations.push('URGENT: Implement team burnout prevention program immediately');
  }

  return {
    overallRisk,
    riskScore: Math.round(overallRiskScore * 10) / 10,
    factors: {
      overtime: { risk: getRiskLevel(overtimeRisk), score: Math.round(overtimeRisk) },
      deadlines: { risk: getRiskLevel(deadlineRisk), score: Math.round(deadlineRisk) },
      engagement: { risk: getRiskLevel(engagementRisk), score: Math.round(engagementRisk) },
      absenteeism: { risk: getRiskLevel(absenteeismRisk), score: Math.round(absenteeismRisk) },
      workload: { risk: getRiskLevel(workloadRisk), score: Math.round(workloadRisk) },
    },
    recommendations,
    urgency,
  };
}

