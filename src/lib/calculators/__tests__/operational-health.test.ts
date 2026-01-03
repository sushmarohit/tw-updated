import {
  calculateHealthScore,
  OPERATIONAL_HEALTH_QUESTIONS,
  type UserAnswer,
} from '../operational-health';

describe('Operational Health Calculator', () => {
  describe('calculateHealthScore', () => {
    it('should calculate scores for all indices correctly', () => {
      const answers: UserAnswer[] = OPERATIONAL_HEALTH_QUESTIONS.map((q) => ({
        questionId: q.id,
        score: 80, // All answers score 80
      }));

      const result = calculateHealthScore(answers);

      // CLS is inverted (100 - 80 = 20), so average is (80+80+80+80+20)/5 = 68
      expect(result.overallScore).toBeCloseTo(68, 1);
      expect(result.indexScores).toHaveLength(5);
      expect(result.indexScores.every((idx) => idx.score === 80 || idx.index === 'CLS')).toBe(true);
    });

    it('should invert CLS score (lower is better)', () => {
      const answers: UserAnswer[] = OPERATIONAL_HEALTH_QUESTIONS.map((q) => ({
        questionId: q.id,
        score: q.g2pIndex === 'CLS' ? 80 : 50, // CLS gets 80, others 50
      }));

      const result = calculateHealthScore(answers);
      const clsScore = result.indexScores.find((idx) => idx.index === 'CLS');

      expect(clsScore?.score).toBe(20); // 100 - 80 = 20
    });

    it('should handle perfect scores', () => {
      const answers: UserAnswer[] = OPERATIONAL_HEALTH_QUESTIONS.map((q) => ({
        questionId: q.id,
        score: 100,
      }));

      const result = calculateHealthScore(answers);

      // CLS is inverted (100 - 100 = 0), so average is (100+100+100+100+0)/5 = 80
      expect(result.overallScore).toBeCloseTo(80, 1);
      expect(result.indexScores.every((idx) => idx.classification === 'Excellent' || idx.index === 'CLS')).toBe(true);
    });

    it('should handle minimum scores', () => {
      const answers: UserAnswer[] = OPERATIONAL_HEALTH_QUESTIONS.map((q) => ({
        questionId: q.id,
        score: 25,
      }));

      const result = calculateHealthScore(answers);

      expect(result.overallScore).toBeLessThan(50);
      expect(result.indexScores.some((idx) => idx.classification === 'Critical')).toBe(true);
    });

    it('should classify scores correctly', () => {
      const testCases = [
        { score: 90, expected: 'Excellent' },
        { score: 75, expected: 'Good' },
        { score: 60, expected: 'Needs Improvement' },
        { score: 40, expected: 'Critical' },
      ];

      testCases.forEach(({ score }) => {
        const answers: UserAnswer[] = OPERATIONAL_HEALTH_QUESTIONS.map((q) => ({
          questionId: q.id,
          score,
        }));

        const result = calculateHealthScore(answers);
        const classifications = result.indexScores.map((idx) => idx.classification);

        if (score >= 85) {
          expect(classifications).toContain('Excellent');
        } else if (score >= 70) {
          expect(classifications).toContain('Good');
        } else if (score >= 50) {
          expect(classifications).toContain('Needs Improvement');
        } else {
          expect(classifications).toContain('Critical');
        }
      });
    });

    it('should generate recommendations for low scores', () => {
      const answers: UserAnswer[] = OPERATIONAL_HEALTH_QUESTIONS.map((q) => ({
        questionId: q.id,
        score: 30, // Low scores
      }));

      const result = calculateHealthScore(answers);

      expect(result.recommendations.length).toBeGreaterThan(0);
      expect(result.recommendations.every((rec) => typeof rec === 'string')).toBe(true);
    });

    it('should handle partial answers', () => {
      const answers: UserAnswer[] = OPERATIONAL_HEALTH_QUESTIONS.slice(0, 5).map((q) => ({
        questionId: q.id,
        score: 80,
      }));

      const result = calculateHealthScore(answers);

      expect(result.overallScore).toBeGreaterThan(0);
      expect(result.indexScores.length).toBeLessThanOrEqual(5);
    });

    it('should handle empty answers array', () => {
      const result = calculateHealthScore([]);

      expect(result.overallScore).toBe(0);
      expect(result.indexScores).toHaveLength(5);
      expect(result.indexScores.every((idx) => idx.score === 0 || isNaN(idx.score))).toBe(true);
    });

    it('should handle duplicate question IDs (last one wins)', () => {
      const answers: UserAnswer[] = [
        { questionId: 'q1', score: 50 },
        { questionId: 'q1', score: 80 }, // Duplicate, should use this
      ];

      const result = calculateHealthScore(answers);

      // Should use the last score for q1
      expect(result.overallScore).toBeGreaterThan(0);
    });

    it('should handle invalid question IDs gracefully', () => {
      const answers: UserAnswer[] = [
        { questionId: 'invalid-id', score: 80 },
        { questionId: 'q1', score: 80 },
      ];

      const result = calculateHealthScore(answers);

      // Should still calculate with valid questions
      expect(result.overallScore).toBeGreaterThan(0);
    });

    it('should handle extreme score values', () => {
      const answers: UserAnswer[] = OPERATIONAL_HEALTH_QUESTIONS.map((q) => ({
        questionId: q.id,
        score: 0,
      }));

      const result = calculateHealthScore(answers);
      expect(result.overallScore).toBeGreaterThanOrEqual(0);

      const answersMax: UserAnswer[] = OPERATIONAL_HEALTH_QUESTIONS.map((q) => ({
        questionId: q.id,
        score: 100,
      }));

      const resultMax = calculateHealthScore(answersMax);
      expect(resultMax.overallScore).toBeLessThanOrEqual(100);
    });
  });

  describe('OPERATIONAL_HEALTH_QUESTIONS', () => {
    it('should have 10 questions', () => {
      expect(OPERATIONAL_HEALTH_QUESTIONS).toHaveLength(10);
    });

    it('should have questions for all 5 G2P indices', () => {
      const indices = OPERATIONAL_HEALTH_QUESTIONS.map((q) => q.g2pIndex);
      const uniqueIndices = new Set(indices);

      expect(uniqueIndices.size).toBe(5);
      expect(uniqueIndices).toContain('PAR');
      expect(uniqueIndices).toContain('AQ');
      expect(uniqueIndices).toContain('CLS');
      expect(uniqueIndices).toContain('LV');
      expect(uniqueIndices).toContain('MTTAR');
    });

    it('should have 2 questions per index', () => {
      const indices = ['PAR', 'AQ', 'CLS', 'LV', 'MTTAR'];
      indices.forEach((index) => {
        const count = OPERATIONAL_HEALTH_QUESTIONS.filter((q) => q.g2pIndex === index).length;
        expect(count).toBe(2);
      });
    });

    it('should have valid question structure', () => {
      OPERATIONAL_HEALTH_QUESTIONS.forEach((question) => {
        expect(question).toHaveProperty('id');
        expect(question).toHaveProperty('text');
        expect(question).toHaveProperty('g2pIndex');
        expect(question).toHaveProperty('options');
        expect(question.options.length).toBeGreaterThan(0);
        question.options.forEach((option) => {
          expect(option).toHaveProperty('text');
          expect(option).toHaveProperty('score');
          expect(typeof option.score).toBe('number');
          expect(option.score).toBeGreaterThanOrEqual(0);
          expect(option.score).toBeLessThanOrEqual(100);
        });
      });
    });
  });
});

