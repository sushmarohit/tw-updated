import { z } from 'zod';

/** Shared optional user info for calculator submissions */
export const calculatorUserInfoSchema = z
  .object({
    email: z.string().email().max(320).optional(),
    name: z.string().max(200).optional(),
    phone: z.string().max(50).optional(),
    companyName: z.string().max(200).optional(),
    companySize: z.string().max(100).optional(),
    industry: z.string().max(100).optional(),
  })
  .optional()
  .nullable();

export const operationalHealthBodySchema = z.object({
  answers: z
    .array(
      z.object({
        questionId: z.string().min(1),
        score: z.number().min(0).max(100),
      })
    )
    .min(1, 'At least one answer is required'),
  userInfo: calculatorUserInfoSchema,
});

export const costLeakageInputSchema = z.object({
  monthlyRevenue: z.number().min(0),
  slaBreachRate: z.number().min(0).max(100),
  manualReworkRate: z.number().min(0).max(100),
  processErrorRate: z.number().min(0).max(100),
  averageErrorCost: z.number().min(0),
});

export const breakevenInputSchema = z.object({
  investmentCost: z.number().min(0),
  monthlySavings: z.number().min(0),
  monthlyRevenueIncrease: z.number().min(0),
  rampUpTime: z.number().int().min(0),
});

export const scaleReadinessInputSchema = z.object({
  teamReadiness: z.number().min(0).max(100),
  sopMaturity: z.number().min(0).max(100),
  collaborationScore: z.number().min(0).max(100),
  kpiTracking: z.number().min(0).max(100),
  scalabilityScore: z.number().min(0).max(100),
});

export const burnoutRiskInputSchema = z.object({
  averageOvertime: z.number().min(0),
  deadlineMissRate: z.number().min(0).max(100),
  employeeEngagement: z.number().min(0).max(100),
  absenteeismRate: z.number().min(0).max(100),
  workloadScore: z.number().min(0).max(100),
});

export const roiInputSchema = z.object({
  totalCost: z.number().min(0),
  monthlyBenefits: z.number().min(0),
  implementationDuration: z.number().int().min(0),
  annualBenefits: z.number().min(0).optional(),
});

export const governanceMaturityInputSchema = z.object({
  policyClarity: z.number().min(0).max(100),
  processReviews: z.number().min(0).max(100),
  automation: z.number().min(0).max(100),
  riskManagement: z.number().min(0).max(100),
  accountability: z.number().min(0).max(100),
});

export const bottleneckInputSchema = z.object({
  averageApprovalTime: z.number().min(0),
  numberOfApprovalLayers: z.number().int().min(0),
  decisionDelayFrequency: z.number().min(0).max(100),
  escalationEffectiveness: z.number().min(0).max(100),
  autonomyLevel: z.number().min(0).max(100),
});

const withUserInfo = <T extends z.ZodTypeAny>(inputSchema: T) =>
  z.object({ input: inputSchema, userInfo: calculatorUserInfoSchema });

export const costLeakageBodySchema = withUserInfo(costLeakageInputSchema);
export const breakevenBodySchema = withUserInfo(breakevenInputSchema);
export const scaleReadinessBodySchema = withUserInfo(scaleReadinessInputSchema);
export const burnoutRiskBodySchema = withUserInfo(burnoutRiskInputSchema);
export const roiBodySchema = withUserInfo(roiInputSchema);
export const governanceMaturityBodySchema = withUserInfo(governanceMaturityInputSchema);
export const bottleneckBodySchema = withUserInfo(bottleneckInputSchema);

/** Allowed tool slugs for fundraise/franchise tool submissions */
export const TOOL_SUBMISSION_SLUGS = [
  'fundraise/runway-check',
  'fundraise/raise-amount',
  'fundraise/dilution',
  'fundraise/readiness',
  'fundraise/instrument-fit',
  'franchise/readiness',
  'franchise/checklist',
  'franchise/model-fit',
  'franchise/unit-economics',
  'franchise/capacity',
] as const;

export const toolSubmissionBodySchema = z.object({
  toolSlug: z.enum(TOOL_SUBMISSION_SLUGS),
  input: z.record(z.unknown()),
  result: z.record(z.unknown()),
  userInfo: calculatorUserInfoSchema,
});

export function firstValidationError(err: z.ZodError): string {
  const flat = err.flatten();
  const field = flat.fieldErrors;
  for (const key of Object.keys(field)) {
    const arr = (field as Record<string, string[] | undefined>)[key];
    if (Array.isArray(arr) && arr[0]) return arr[0];
  }
  return flat.formErrors?.[0] ?? 'Validation failed';
}
