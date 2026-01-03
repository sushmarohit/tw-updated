import { calculateScaleReadiness, type ScaleReadinessInput } from '../scale-readiness';

describe('Scale Readiness Calculator', () => {
  describe('calculateScaleReadiness', () => {
    it('should calculate readiness correctly for normal inputs', () => {
      const input: ScaleReadinessInput = {
        teamReadiness: 75,
        sopMaturity: 80,
        collaborationScore: 70,
        kpiTracking: 75,
        scalabilityScore: 80,
      };

      const result = calculateScaleReadiness(input);

      expect(result.overallScore).toBeGreaterThan(0);
      expect(result.overallScore).toBeLessThanOrEqual(100);
      expect(['Not Ready', 'Partially Ready', 'Ready', 'Highly Ready']).toContain(result.readiness);
    });

    it('should classify readiness levels correctly', () => {
      const testCases = [
        { scores: [30, 30, 30, 30, 30], expected: 'Not Ready' },
        { scores: [60, 60, 60, 60, 60], expected: 'Partially Ready' },
        { scores: [75, 75, 75, 75, 75], expected: 'Ready' },
        { scores: [90, 90, 90, 90, 90], expected: 'Highly Ready' },
      ];

      testCases.forEach(({ scores, expected }) => {
        const input: ScaleReadinessInput = {
          teamReadiness: scores[0],
          sopMaturity: scores[1],
          collaborationScore: scores[2],
          kpiTracking: scores[3],
          scalabilityScore: scores[4],
        };

        const result = calculateScaleReadiness(input);
        expect(result.readiness).toBe(expected);
      });
    });

    it('should identify bottlenecks correctly', () => {
      const input: ScaleReadinessInput = {
        teamReadiness: 50, // Low
        sopMaturity: 80,
        collaborationScore: 50, // Low
        kpiTracking: 80,
        scalabilityScore: 80,
      };

      const result = calculateScaleReadiness(input);
      expect(result.bottlenecks.length).toBeGreaterThan(0);
      expect(result.bottlenecks.some((b) => b.includes('Team') || b.includes('Collaboration'))).toBe(true);
    });

    it('should identify gaps correctly', () => {
      const input: ScaleReadinessInput = {
        teamReadiness: 50,
        sopMaturity: 60,
        collaborationScore: 70,
        kpiTracking: 50,
        scalabilityScore: 70,
      };

      const result = calculateScaleReadiness(input);
      expect(result.gaps.length).toBeGreaterThan(0);
      result.gaps.forEach((gap) => {
        expect(gap).toHaveProperty('area');
        expect(gap).toHaveProperty('currentScore');
        expect(gap).toHaveProperty('targetScore');
        expect(gap).toHaveProperty('priority');
        expect(gap.currentScore).toBeLessThan(gap.targetScore);
      });
    });

    it('should generate recommendations', () => {
      const input: ScaleReadinessInput = {
        teamReadiness: 60,
        sopMaturity: 50,
        collaborationScore: 60,
        kpiTracking: 50,
        scalabilityScore: 60,
      };

      const result = calculateScaleReadiness(input);
      expect(result.recommendations.length).toBeGreaterThan(0);
      expect(result.recommendations.every((rec) => typeof rec === 'string')).toBe(true);
    });

    it('should handle perfect scores', () => {
      const input: ScaleReadinessInput = {
        teamReadiness: 100,
        sopMaturity: 100,
        collaborationScore: 100,
        kpiTracking: 100,
        scalabilityScore: 100,
      };

      const result = calculateScaleReadiness(input);
      expect(result.overallScore).toBe(100);
      expect(result.readiness).toBe('Highly Ready');
      expect(result.bottlenecks).toHaveLength(0);
    });

    it('should handle zero scores', () => {
      const input: ScaleReadinessInput = {
        teamReadiness: 0,
        sopMaturity: 0,
        collaborationScore: 0,
        kpiTracking: 0,
        scalabilityScore: 0,
      };

      const result = calculateScaleReadiness(input);
      expect(result.overallScore).toBe(0);
      expect(result.readiness).toBe('Not Ready');
      expect(result.bottlenecks.length).toBe(5);
    });

    it('should handle negative values gracefully', () => {
      const input: ScaleReadinessInput = {
        teamReadiness: -10,
        sopMaturity: 75,
        collaborationScore: 75,
        kpiTracking: 75,
        scalabilityScore: 75,
      };

      // Should not throw, but may produce unexpected results
      expect(() => calculateScaleReadiness(input)).not.toThrow();
    });

    it('should handle values over 100', () => {
      const input: ScaleReadinessInput = {
        teamReadiness: 150,
        sopMaturity: 75,
        collaborationScore: 75,
        kpiTracking: 75,
        scalabilityScore: 75,
      };

      const result = calculateScaleReadiness(input);
      expect(result.overallScore).toBeGreaterThan(75);
    });

    it('should prioritize gaps correctly', () => {
      const input: ScaleReadinessInput = {
        teamReadiness: 30, // High priority
        sopMaturity: 55, // Medium priority
        collaborationScore: 70, // Low priority
        kpiTracking: 75,
        scalabilityScore: 75,
      };

      const result = calculateScaleReadiness(input);
      const highPriorityGaps = result.gaps.filter((gap) => gap.priority === 'High');

      expect(highPriorityGaps.length).toBeGreaterThan(0);
      highPriorityGaps.forEach((gap) => {
        expect(gap.currentScore).toBeLessThan(50);
      });
    });

    it('should calculate weighted average correctly', () => {
      const input: ScaleReadinessInput = {
        teamReadiness: 100,
        sopMaturity: 0,
        collaborationScore: 0,
        kpiTracking: 0,
        scalabilityScore: 0,
      };

      const result = calculateScaleReadiness(input);
      // Should be around 25 (100 * 0.25 weight)
      expect(result.overallScore).toBeCloseTo(25, 1);
    });
  });
});

