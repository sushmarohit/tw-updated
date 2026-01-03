/**
 * Operational Health Diagnostic Calculator
 * Calculates G2P indices: PAR, AQ, CLS, LV, MTTAR
 */

export type G2PIndex = 'PAR' | 'AQ' | 'CLS' | 'LV' | 'MTTAR';

export interface Question {
  id: string;
  text: string;
  g2pIndex: G2PIndex;
  options: {
    text: string;
    score: number;
  }[];
}

export interface UserAnswer {
  questionId: string;
  score: number;
}

export interface IndexScore {
  index: G2PIndex;
  score: number;
  classification: 'Excellent' | 'Good' | 'Needs Improvement' | 'Critical';
}

export interface HealthScoreResult {
  overallScore: number;
  indexScores: IndexScore[];
  recommendations: string[];
}

// Questions for Operational Health Diagnostic
export const OPERATIONAL_HEALTH_QUESTIONS: Question[] = [
  // PAR Questions
  {
    id: 'q1',
    text: 'How frequently do your projects or tasks complete on schedule?',
    g2pIndex: 'PAR',
    options: [
      { text: 'Always (95%+ on time)', score: 100 },
      { text: 'Mostly (80-95% on time)', score: 80 },
      { text: 'Sometimes (50-80% on time)', score: 50 },
      { text: 'Rarely (<50% on time)', score: 25 },
    ],
  },
  {
    id: 'q2',
    text: 'How fast can your team adapt plans in case of unforeseen issues?',
    g2pIndex: 'PAR',
    options: [
      { text: 'Immediately, minimal impact', score: 100 },
      { text: 'Within 1-2 days with some impact', score: 80 },
      { text: 'Over a week causing major delays', score: 50 },
      { text: 'Plans usually fail after issues arise', score: 25 },
    ],
  },
  // AQ Questions
  {
    id: 'q3',
    text: 'What level of decision-making authority do teams have without management approval?',
    g2pIndex: 'AQ',
    options: [
      { text: 'Full autonomy within limits', score: 100 },
      { text: 'Moderate autonomy', score: 75 },
      { text: 'Limited autonomy requiring many approvals', score: 50 },
      { text: 'Almost none, all escalated', score: 25 },
    ],
  },
  {
    id: 'q4',
    text: 'How well can teams resolve day-to-day operational problems independently?',
    g2pIndex: 'AQ',
    options: [
      { text: 'Most problems self-resolved', score: 100 },
      { text: 'Some need manager help', score: 75 },
      { text: 'Many escalated to management', score: 50 },
      { text: 'Problems often unresolved', score: 25 },
    ],
  },
  // CLS Questions (inverted - lower is better)
  {
    id: 'q5',
    text: 'How often are decision-makers overwhelmed by information complexity?',
    g2pIndex: 'CLS',
    options: [
      { text: 'Rarely', score: 100 },
      { text: 'Sometimes', score: 75 },
      { text: 'Often', score: 50 },
      { text: 'Almost always', score: 25 },
    ],
  },
  {
    id: 'q6',
    text: 'Are your operational dashboards and metrics easy to interpret?',
    g2pIndex: 'CLS',
    options: [
      { text: 'Very clear and actionable', score: 100 },
      { text: 'Mostly clear', score: 75 },
      { text: 'Often confusing', score: 50 },
      { text: 'Not helpful', score: 25 },
    ],
  },
  // LV Questions
  {
    id: 'q7',
    text: 'How fast does your organization incorporate feedback into improvements?',
    g2pIndex: 'LV',
    options: [
      { text: 'Within days', score: 100 },
      { text: 'Within weeks', score: 75 },
      { text: 'Within months', score: 50 },
      { text: 'Rarely or never', score: 25 },
    ],
  },
  {
    id: 'q8',
    text: 'How often do you run formal retrospectives or process reviews?',
    g2pIndex: 'LV',
    options: [
      { text: 'Every project cycle', score: 100 },
      { text: 'Quarterly', score: 75 },
      { text: 'Semi-annually', score: 50 },
      { text: 'Rarely or never', score: 25 },
    ],
  },
  // MTTAR Questions
  {
    id: 'q9',
    text: 'How frequently are operational issues detected and resolved automatically without manual help?',
    g2pIndex: 'MTTAR',
    options: [
      { text: 'Most issues auto-resolved', score: 100 },
      { text: 'Some auto-resolution', score: 75 },
      { text: 'Rarely auto-resolved', score: 50 },
      { text: 'Manual firefighting typical', score: 25 },
    ],
  },
  {
    id: 'q10',
    text: 'What is the average time taken to resolve recurring operational problems?',
    g2pIndex: 'MTTAR',
    options: [
      { text: '< 4 hours', score: 100 },
      { text: '4-24 hours', score: 75 },
      { text: '1-3 days', score: 50 },
      { text: '> 3 days', score: 25 },
    ],
  },
];

/**
 * Calculate health scores from user answers
 */
export function calculateHealthScore(answers: UserAnswer[]): HealthScoreResult {
  // Group answers by G2P index
  const indexTotals: Record<G2PIndex, { sum: number; count: number }> = {
    PAR: { sum: 0, count: 0 },
    AQ: { sum: 0, count: 0 },
    CLS: { sum: 0, count: 0 },
    LV: { sum: 0, count: 0 },
    MTTAR: { sum: 0, count: 0 },
  };

  // Calculate totals per index
  answers.forEach((answer) => {
    const question = OPERATIONAL_HEALTH_QUESTIONS.find((q) => q.id === answer.questionId);
    if (question) {
      const index = question.g2pIndex;
      indexTotals[index].sum += answer.score;
      indexTotals[index].count += 1;
    }
  });

  // Calculate average scores
  const indexScores: IndexScore[] = Object.entries(indexTotals).map(([index, data]) => {
    const score = data.count > 0 ? data.sum / data.count : 0;
    
    // Invert CLS (lower is better, so invert the score)
    // Only invert if we have actual answers (count > 0)
    const finalScore = index === 'CLS' && data.count > 0 ? 100 - score : score;
    
    return {
      index: index as G2PIndex,
      score: Math.round(finalScore * 10) / 10,
      classification: classifyScore(finalScore),
    };
  });

  // Calculate overall score (average of all indices)
  const overallScore = Math.round(
    (indexScores.reduce((sum, idx) => sum + idx.score, 0) / indexScores.length) * 10
  ) / 10;

  // Generate recommendations
  const recommendations = generateRecommendations(indexScores);

  return {
    overallScore,
    indexScores,
    recommendations,
  };
}

/**
 * Classify score into category
 */
function classifyScore(score: number): IndexScore['classification'] {
  if (score >= 85) return 'Excellent';
  if (score >= 70) return 'Good';
  if (score >= 50) return 'Needs Improvement';
  return 'Critical';
}

/**
 * Generate recommendations based on scores
 */
function generateRecommendations(indexScores: IndexScore[]): string[] {
  const recommendations: string[] = [];

  indexScores.forEach((indexScore) => {
    if (indexScore.classification === 'Critical' || indexScore.classification === 'Needs Improvement') {
      const methodology = getMethodologyForIndex(indexScore.index);
      recommendations.push(
        `${indexScore.index} (${indexScore.score}/100): Apply ${methodology} methodology to improve ${indexScore.index.toLowerCase()}`
      );
    }
  });

  // Sort by priority (Critical first)
  return recommendations.sort((a, b) => {
    const aCritical = a.includes('Critical');
    const bCritical = b.includes('Critical');
    if (aCritical && !bCritical) return -1;
    if (!aCritical && bCritical) return 1;
    return 0;
  });
}

/**
 * Map G2P index to methodology
 */
function getMethodologyForIndex(index: G2PIndex): string {
  const mapping: Record<G2PIndex, string> = {
    PAR: 'CYCLE',
    AQ: 'PARSE',
    CLS: 'SAGE',
    LV: 'MORPH',
    MTTAR: 'ARC',
  };
  return mapping[index] || '';
}

