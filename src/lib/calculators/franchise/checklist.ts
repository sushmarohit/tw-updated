/**
 * Franchise Checklist – % complete from yes/no items
 */

export interface FranchiseChecklistInput {
  legalAgreements: boolean;
  operationsManual: boolean;
  trainingProgram: boolean;
  siteSelectionCriteria: boolean;
  marketingKit: boolean;
  franchiseeSupport: boolean;
}

export interface FranchiseChecklistResult {
  completed: number;
  total: number;
  percentComplete: number;
  nextSteps: string[];
}

const ITEMS: (keyof FranchiseChecklistInput)[] = [
  'legalAgreements',
  'operationsManual',
  'trainingProgram',
  'siteSelectionCriteria',
  'marketingKit',
  'franchiseeSupport',
];

const NEXT_STEPS: Record<keyof FranchiseChecklistInput, string> = {
  legalAgreements: 'Draft franchise agreement and FDD',
  operationsManual: 'Document SOPs and operations manual',
  trainingProgram: 'Design franchisee onboarding and training',
  siteSelectionCriteria: 'Define site selection and territory criteria',
  marketingKit: 'Create brand and marketing kit for franchisees',
  franchiseeSupport: 'Set up ongoing franchisee support structure',
};

export function calculateFranchiseChecklist(input: FranchiseChecklistInput): FranchiseChecklistResult {
  const completed = ITEMS.filter((k) => input[k]).length;
  const total = ITEMS.length;
  const percentComplete = Math.round((completed / total) * 100);
  const nextSteps = ITEMS.filter((k) => !input[k]).map((k) => NEXT_STEPS[k]);
  return { completed, total, percentComplete, nextSteps };
}
