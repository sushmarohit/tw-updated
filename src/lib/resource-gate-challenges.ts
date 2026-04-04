/** Primary challenge options for gated resource downloads (Business Case Kit). */
export const RESOURCE_GATE_CHALLENGES = [
  { value: 'scaling-operations', label: 'Scaling operations without chaos' },
  { value: 'proving-roi', label: 'Proving ROI to board / investors' },
  { value: 'governance-clarity', label: 'Governance & decision-making clarity' },
  { value: 'dashboards-visibility', label: 'Dashboards & visibility' },
  { value: 'other', label: 'Other' },
] as const;

export type ResourceGateChallengeValue = (typeof RESOURCE_GATE_CHALLENGES)[number]['value'];
