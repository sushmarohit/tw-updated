import { calculateGovernanceMaturity, type GovernanceMaturityInput } from '../governance-maturity';

describe('Governance Maturity Calculator', () => {
  describe('calculateGovernanceMaturity', () => {
    it('should calculate maturity correctly for normal inputs', () => {
      const input: GovernanceMaturityInput = {
        policyClarity: 75,
        processReviews: 80,
        automation: 70,
        riskManagement: 75,
        accountability: 80,
      };

      const result = calculateGovernanceMaturity(input);

      expect(result.overallMaturity).toBeGreaterThan(0);
      expect(result.overallMaturity).toBeLessThanOrEqual(100);
      expect(['Initial', 'Developing', 'Mature', 'Leading']).toContain(result.maturityLevel);
    });

    it('should classify maturity levels correctly', () => {
      const testCases = [
        { scores: [30, 30, 30, 30, 30], expected: 'Initial' },
        { scores: [50, 50, 50, 50, 50], expected: 'Developing' },
        { scores: [75, 75, 75, 75, 75], expected: 'Mature' },
        { scores: [90, 90, 90, 90, 90], expected: 'Leading' },
      ];

      testCases.forEach(({ scores, expected }) => {
        const input: GovernanceMaturityInput = {
          policyClarity: scores[0],
          processReviews: scores[1],
          automation: scores[2],
          riskManagement: scores[3],
          accountability: scores[4],
        };

        const result = calculateGovernanceMaturity(input);
        expect(result.maturityLevel).toBe(expected);
      });
    });

    it('should calculate dimension levels correctly', () => {
      const input: GovernanceMaturityInput = {
        policyClarity: 45,
        processReviews: 65,
        automation: 85,
        riskManagement: 55,
        accountability: 75,
      };

      const result = calculateGovernanceMaturity(input);

      expect(result.dimensions).toHaveProperty('policyClarity');
      expect(result.dimensions).toHaveProperty('processReviews');
      expect(result.dimensions).toHaveProperty('automation');
      expect(result.dimensions).toHaveProperty('riskManagement');
      expect(result.dimensions).toHaveProperty('accountability');

      Object.values(result.dimensions).forEach((dim) => {
        expect(dim).toHaveProperty('score');
        expect(dim).toHaveProperty('level');
        expect(['Initial', 'Developing', 'Mature', 'Leading']).toContain(dim.level);
      });
    });

    it('should identify improvements needed', () => {
      const input: GovernanceMaturityInput = {
        policyClarity: 50, // Below target (80)
        processReviews: 60, // Below target (75)
        automation: 70, // Below target (80)
        riskManagement: 70, // Below target (75)
        accountability: 60, // Below target (80)
      };

      const result = calculateGovernanceMaturity(input);
      expect(result.improvements.length).toBeGreaterThan(0);

      result.improvements.forEach((improvement) => {
        expect(improvement).toHaveProperty('dimension');
        expect(improvement).toHaveProperty('currentScore');
        expect(improvement).toHaveProperty('targetScore');
        expect(improvement).toHaveProperty('action');
        expect(improvement.currentScore).toBeLessThan(improvement.targetScore);
      });
    });

    it('should generate recommendations', () => {
      const input: GovernanceMaturityInput = {
        policyClarity: 50,
        processReviews: 50,
        automation: 50,
        riskManagement: 50,
        accountability: 50,
      };

      const result = calculateGovernanceMaturity(input);
      expect(result.recommendations.length).toBeGreaterThan(0);
      expect(result.recommendations.every((rec) => typeof rec === 'string')).toBe(true);
    });

    it('should handle perfect scores', () => {
      const input: GovernanceMaturityInput = {
        policyClarity: 100,
        processReviews: 100,
        automation: 100,
        riskManagement: 100,
        accountability: 100,
      };

      const result = calculateGovernanceMaturity(input);
      expect(result.overallMaturity).toBe(100);
      expect(result.maturityLevel).toBe('Leading');
      expect(result.improvements).toHaveLength(0);
    });

    it('should handle zero scores', () => {
      const input: GovernanceMaturityInput = {
        policyClarity: 0,
        processReviews: 0,
        automation: 0,
        riskManagement: 0,
        accountability: 0,
      };

      const result = calculateGovernanceMaturity(input);
      expect(result.overallMaturity).toBe(0);
      expect(result.maturityLevel).toBe('Initial');
      expect(result.improvements.length).toBe(5);
    });

    it('should calculate equal weights correctly', () => {
      const input: GovernanceMaturityInput = {
        policyClarity: 100,
        processReviews: 0,
        automation: 0,
        riskManagement: 0,
        accountability: 0,
      };

      const result = calculateGovernanceMaturity(input);
      // Should be average: 100 / 5 = 20
      expect(result.overallMaturity).toBeCloseTo(20, 1);
    });

    it('should prioritize improvements correctly', () => {
      const input: GovernanceMaturityInput = {
        policyClarity: 30, // High priority (below 50)
        processReviews: 55, // Medium priority (50-70)
        automation: 75, // Low priority (above 70)
        riskManagement: 40, // High priority
        accountability: 60, // Medium priority
      };

      const result = calculateGovernanceMaturity(input);
      const highPriority = result.improvements.filter((imp) => imp.currentScore < 50);

      expect(highPriority.length).toBeGreaterThan(0);
      highPriority.forEach((imp) => {
        expect(imp.currentScore).toBeLessThan(50);
      });
    });

    it('should handle values over 100', () => {
      const input: GovernanceMaturityInput = {
        policyClarity: 150,
        processReviews: 75,
        automation: 75,
        riskManagement: 75,
        accountability: 75,
      };

      const result = calculateGovernanceMaturity(input);
      expect(result.overallMaturity).toBeGreaterThan(75);
    });

    it('should handle negative values gracefully', () => {
      const input: GovernanceMaturityInput = {
        policyClarity: -10,
        processReviews: 75,
        automation: 75,
        riskManagement: 75,
        accountability: 75,
      };

      // Should not throw, but may produce unexpected results
      expect(() => calculateGovernanceMaturity(input)).not.toThrow();
    });

    it('should recommend Governance Intelligence Program for low maturity', () => {
      const input: GovernanceMaturityInput = {
        policyClarity: 40,
        processReviews: 40,
        automation: 40,
        riskManagement: 40,
        accountability: 40,
      };

      const result = calculateGovernanceMaturity(input);
      expect(result.recommendations.some((rec) => rec.includes('Governance Intelligence Program'))).toBe(true);
    });

    it('should recommend continuous improvement for mature organizations', () => {
      const input: GovernanceMaturityInput = {
        policyClarity: 70,
        processReviews: 70,
        automation: 70,
        riskManagement: 70,
        accountability: 70,
      };

      const result = calculateGovernanceMaturity(input);
      if (result.overallMaturity >= 60 && result.overallMaturity < 80) {
        expect(result.recommendations.some((rec) => rec.includes('continuous improvement') || rec.includes('scaling'))).toBe(true);
      }
    });
  });
});

