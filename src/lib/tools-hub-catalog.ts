/**
 * Single source of truth for tools hub tabs and tool entries (navbar mega-menu + hub page).
 */

export type ToolsHubTabId = 'processExcellence' | 'fundraise' | 'franchise';

export type ToolsHubLucideIcon =
  | 'TrendingUp'
  | 'Target'
  | 'BarChart3'
  | 'DollarSign'
  | 'Store';

export type ToolsHubToolColor = 'teal' | 'gold';

export type ToolsHubToolEntry = {
  href: string;
  /** Passed to `t(\`tools:${messageKey}.name\`)` (and `.description`, `.time`). */
  messageKey: string;
  color: ToolsHubToolColor;
  lucideIcon: ToolsHubLucideIcon;
};

export const toolsHubTabOrder: ToolsHubTabId[] = ['processExcellence', 'fundraise', 'franchise'];

export const toolsHubCatalog: Record<ToolsHubTabId, ToolsHubToolEntry[]> = {
  processExcellence: [
    {
      href: '/consulting/tools/cost-leakage?from=processExcellence',
      messageKey: 'costLeakageEstimator',
      color: 'gold',
      lucideIcon: 'TrendingUp',
    },
    {
      href: '/consulting/tools/breakeven?from=processExcellence',
      messageKey: 'breakEvenPointCalculator',
      color: 'teal',
      lucideIcon: 'Target',
    },
    {
      href: '/consulting/tools/roi?from=processExcellence',
      messageKey: 'roiCalculator',
      color: 'gold',
      lucideIcon: 'DollarSign',
    },
  ],
  fundraise: [
    {
      href: '/consulting/tools/fundraise/readiness?from=fundraise',
      messageKey: 'fundraise.readiness',
      color: 'teal',
      lucideIcon: 'Target',
    },
    {
      href: '/consulting/tools/fundraise/dilution?from=fundraise',
      messageKey: 'fundraise.dilution',
      color: 'gold',
      lucideIcon: 'TrendingUp',
    },
    {
      href: '/consulting/tools/fundraise/raise-amount?from=fundraise',
      messageKey: 'fundraise.raiseAmount',
      color: 'teal',
      lucideIcon: 'DollarSign',
    },
  ],
  franchise: [
    {
      href: '/consulting/tools/franchise/readiness?from=franchise',
      messageKey: 'franchise.readiness',
      color: 'teal',
      lucideIcon: 'Store',
    },
    {
      href: '/consulting/tools/franchise/unit-economics?from=franchise',
      messageKey: 'franchise.unitEconomics',
      color: 'gold',
      lucideIcon: 'DollarSign',
    },
    {
      href: '/consulting/tools/franchise/capacity?from=franchise',
      messageKey: 'franchise.capacity',
      color: 'teal',
      lucideIcon: 'BarChart3',
    },
  ],
};
