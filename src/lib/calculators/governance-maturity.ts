/**
 * Governance Maturity Calculator
 * Assesses governance health across 5 dimensions
 */

export interface GovernanceMaturityInput {
  policyClarity: number; // 0-100
  processReviews: number; // 0-100
  automation: number; // 0-100
  riskManagement: number; // 0-100
  accountability: number; // 0-100
}

export interface GovernanceMaturityResult {
  overallMaturity: number; // 0-100
  maturityLevel: 'Initial' | 'Developing' | 'Mature' | 'Leading';
  dimensions: {
    policyClarity: { score: number; level: string };
    processReviews: { score: number; level: string };
    automation: { score: number; level: string };
    riskManagement: { score: number; level: string };
    accountability: { score: number; level: string };
  };
  improvements: {
    dimension: string;
    currentScore: number;
    targetScore: number;
    action: string;
  }[];
  recommendations: string[];
}

/**
 * Calculate governance maturity
 */
export function calculateGovernanceMaturity(
  input: GovernanceMaturityInput
): GovernanceMaturityResult {
  const { policyClarity, processReviews, automation, riskManagement, accountability } = input;

  // Equal weights for all dimensions
  const overallMaturity =
    (policyClarity + processReviews + automation + riskManagement + accountability) / 5;

  // Determine maturity level
  let maturityLevel: GovernanceMaturityResult['maturityLevel'];
  if (overallMaturity < 40) maturityLevel = 'Initial';
  else if (overallMaturity < 60) maturityLevel = 'Developing';
  else if (overallMaturity < 80) maturityLevel = 'Mature';
  else maturityLevel = 'Leading';

  // Get level for individual dimension
  const getLevel = (score: number): string => {
    if (score < 40) return 'Initial';
    if (score < 60) return 'Developing';
    if (score < 80) return 'Mature';
    return 'Leading';
  };

  // Identify improvements needed
  const improvements: GovernanceMaturityResult['improvements'] = [];
  const dimensions = [
    {
      name: 'Policy Clarity',
      score: policyClarity,
      target: 80,
      action: 'Document and communicate clear governance policies',
    },
    {
      name: 'Process Reviews',
      score: processReviews,
      target: 75,
      action: 'Establish regular process review cadences',
    },
    {
      name: 'Automation',
      score: automation,
      target: 80,
      action: 'Automate governance workflows and reporting',
    },
    {
      name: 'Risk Management',
      score: riskManagement,
      target: 75,
      action: 'Implement proactive risk monitoring and mitigation',
    },
    {
      name: 'Accountability',
      score: accountability,
      target: 80,
      action: 'Define clear accountability frameworks and ownership',
    },
  ];

  dimensions.forEach((dim) => {
    if (dim.score < dim.target) {
      improvements.push({
        dimension: dim.name,
        currentScore: dim.score,
        targetScore: dim.target,
        action: dim.action,
      });
    }
  });

  // Generate recommendations
  const recommendations: string[] = [];
  if (policyClarity < 60) {
    recommendations.push('Develop comprehensive governance policy documentation');
  }
  if (processReviews < 60) {
    recommendations.push('Implement quarterly governance reviews and retrospectives');
  }
  if (automation < 60) {
    recommendations.push('Deploy WFM Governance App for automated governance and reporting');
  }
  if (riskManagement < 60) {
    recommendations.push('Establish risk assessment and monitoring processes');
  }
  if (accountability < 60) {
    recommendations.push('Define RACI matrices and decision authorities');
  }
  if (overallMaturity < 60) {
    recommendations.push('Consider Governance Intelligence Program for comprehensive maturity');
  }
  if (overallMaturity >= 60 && overallMaturity < 80) {
    recommendations.push('Focus on continuous improvement and scaling governance practices');
  }

  return {
    overallMaturity: Math.round(overallMaturity * 10) / 10,
    maturityLevel,
    dimensions: {
      policyClarity: { score: policyClarity, level: getLevel(policyClarity) },
      processReviews: { score: processReviews, level: getLevel(processReviews) },
      automation: { score: automation, level: getLevel(automation) },
      riskManagement: { score: riskManagement, level: getLevel(riskManagement) },
      accountability: { score: accountability, level: getLevel(accountability) },
    },
    improvements,
    recommendations,
  };
}

