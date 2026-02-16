export interface ServiceLinkItem {
  title: string;
  href: string;
}

export interface ServiceCategory {
  slug: string;
  title: string;
  description: string;
  primaryCta: ServiceLinkItem;
  secondaryCta: ServiceLinkItem;
  items: ServiceLinkItem[];
}

export interface ServiceDetailPage {
  slug: string;
  title: string;
  heroSubheadline: string;
  outcomesLabel: string;
  outcomes: string[];
  timelineLabel: string;
  timeline: string;
  pricingLabel: string;
  pricing: string;
  primaryCta: ServiceLinkItem;
  secondaryCta: ServiceLinkItem;
}

const ROOT = '/consulting/services';

/** Map category slug to services-catalog translation key */
export const serviceCategorySlugToKey: Record<string, string> = {
  'process-excellence-solutions': 'processExcellence',
  'fundraise-support-strategy': 'fundraise',
  'franchise-scale-expansion': 'franchise',
};

export const serviceCategories: ServiceCategory[] = [
  {
    slug: 'process-excellence-solutions',
    title: 'Process Excellence Solutions',
    description:
      'Fix leakage, speed up execution, and make daily operations predictable—with SOPs, dashboards, and governance routines.',
    primaryCta: {
      title: 'Start Free Diagnostic',
      href: '/consulting/tools/health-check',
    },
    secondaryCta: {
      title: 'Book Discovery Call',
      href: '/consulting/booking',
    },
    items: [
      {
        title: 'Operational Health Index Report',
        href: `${ROOT}/process-excellence/operational-health-index-report`,
      },
      {
        title: 'Governance Reporting Setup',
        href: `${ROOT}/process-excellence/governance-reporting-setup`,
      },
      {
        title: 'OpEx Structuring',
        href: `${ROOT}/process-excellence/opex-structuring`,
      },
      {
        title: 'Analytics Visualization Suite',
        href: `${ROOT}/process-excellence/analytics-visualization-suite`,
      },
      {
        title: 'Fractional CBO Services',
        href: `${ROOT}/process-excellence/fractional-cbo-services`,
      },
    ],
  },
  {
    slug: 'fundraise-support-strategy',
    title: 'Fundraise Support & Strategy',
    description:
      'Investor-ready documents and fundraising support—clear story, clean numbers, strong readiness.',
    primaryCta: {
      title: 'Talk to an Expert',
      href: '/consulting/contact',
    },
    secondaryCta: {
      title: 'Get TwelfthKey Certified\u2122 Review',
      href: `${ROOT}/fundraise/twelfthkey-certified-verification-consultation`,
    },
    items: [
      {
        title: 'TwelfthKey Certified\u2122 Verification & Consultation',
        href: `${ROOT}/fundraise/twelfthkey-certified-verification-consultation`,
      },
      {
        title: 'Detailed Project Report (DPR) Development',
        href: `${ROOT}/fundraise/dpr-development`,
      },
      {
        title: 'Investor Pitch Deck Development',
        href: `${ROOT}/fundraise/investor-pitch-deck-development`,
      },
      {
        title: 'Support & Strategy (Advisory-Only)',
        href: `${ROOT}/fundraise/support-strategy-advisory`,
      },
      {
        title: 'Fundraise Execution (Full-Service)',
        href: `${ROOT}/fundraise/fundraise-execution-full-service`,
      },
    ],
  },
  {
    slug: 'franchise-scale-expansion',
    title: 'Franchise Scale/Expansion Strategy & Consultation',
    description:
      "Build a franchise-ready model that's repeatable, legally sound, and easy for franchisees to execute.",
    primaryCta: {
      title: 'Check Franchise Readiness',
      href: `${ROOT}/franchise/franchise-feasibility-business-model-design`,
    },
    secondaryCta: {
      title: 'Book Discovery Call',
      href: '/consulting/booking',
    },
    items: [
      {
        title: 'Franchise Feasibility & Business Model Design',
        href: `${ROOT}/franchise/franchise-feasibility-business-model-design`,
      },
      {
        title: 'Franchise Operations Manual (FOM) Development',
        href: `${ROOT}/franchise/franchise-operations-manual-development`,
      },
      {
        title: 'Franchise Legal & Compliance Setup',
        href: `${ROOT}/franchise/franchise-legal-compliance-setup`,
      },
      {
        title: 'Franchisee Recruitment & Onboarding Support',
        href: `${ROOT}/franchise/franchisee-recruitment-onboarding-support`,
      },
      {
        title: 'Franchise Growth & Performance Management',
        href: `${ROOT}/franchise/franchise-growth-performance-management`,
      },
      {
        title: 'Franchise Expansion Strategy & Master Franchising',
        href: `${ROOT}/franchise/franchise-expansion-strategy-master-franchising`,
      },
    ],
  },
];

export const serviceDetails: ServiceDetailPage[] = [
  {
    slug: 'process-excellence/operational-health-index-report',
    title: 'Operational Health Index Report',
    heroSubheadline:
      'A 15-day diagnostic that shows where execution breaks—and what to fix first.',
    outcomesLabel: 'Key outcomes',
    outcomes: [
      'Overall Health Score (0–100)',
      '5 governance indices breakdown',
      'Gap analysis',
      'Top 5 recommendations',
      'Executive summary',
      'Detailed PDF report',
    ],
    timelineLabel: 'Timeline / Engagement',
    timeline: '15 days, one-time.',
    pricingLabel: 'Pricing',
    pricing: '₹24,999 (website price).',
    primaryCta: { title: 'Start Health Index', href: '/consulting/tools/health-check' },
    secondaryCta: { title: 'Book Discovery Call', href: '/consulting/booking' },
  },
  {
    slug: 'process-excellence/governance-reporting-setup',
    title: 'Governance Reporting Setup',
    heroSubheadline:
      'Set up reporting that drives accountability—without Excel chaos.',
    outcomesLabel: 'What you get',
    outcomes: [
      'Weekly DPR templates',
      'SLA adherence tracker',
      'Escalation matrix',
      'Automated reporting engine',
      'Real-time dashboard',
      'Role-based access',
      'Training documentation',
    ],
    timelineLabel: 'Timeline / Engagement',
    timeline: '30 days, one-time.',
    pricingLabel: 'Pricing',
    pricing: '₹49,999 (website price).',
    primaryCta: { title: 'Set Up Reporting', href: '/consulting/contact' },
    secondaryCta: { title: 'Book Discovery Call', href: '/consulting/booking' },
  },
  {
    slug: 'process-excellence/opex-structuring',
    title: 'OpEx Structuring',
    heroSubheadline:
      "Build SOPs, role-clarity, and KPIs so execution doesn't depend on the founder.",
    outcomesLabel: 'What you get',
    outcomes: [
      'End-to-end SOPs',
      'Role clarity matrix (RACI)',
      'KPI framework',
      'Process efficiency roadmap',
      'Workflow optimization',
      'Cost-leakage mitigation plan',
      'Implementation playbook',
    ],
    timelineLabel: 'Timeline / Engagement',
    timeline: '45 days, one-time.',
    pricingLabel: 'Pricing',
    pricing: '₹99,999 (website price).',
    primaryCta: { title: 'Structure My Operations', href: '/consulting/contact' },
    secondaryCta: { title: 'Book Discovery Call', href: '/consulting/booking' },
  },
  {
    slug: 'process-excellence/analytics-visualization-suite',
    title: 'Analytics Visualization Suite',
    heroSubheadline:
      '13+ dashboards that turn your data into day-to-day decisions.',
    outcomesLabel: 'What you get',
    outcomes: [
      '13+ custom KPI dashboards',
      'Predictive analytics models',
      'Anomaly detection system',
      'Monthly governance scorecard',
      'Interactive visualizations',
      'Trend analysis',
      'Executive BI suite',
      'ERP/CRM integration',
    ],
    timelineLabel: 'Timeline / Engagement',
    timeline: '60 days, one-time.',
    pricingLabel: 'Pricing',
    pricing: '₹1,99,999 (website price).',
    primaryCta: { title: 'Build My Dashboards', href: '/consulting/contact' },
    secondaryCta: { title: 'Request Demo', href: '/consulting/praxio/demo' },
  },
  {
    slug: 'process-excellence/fractional-cbo-services',
    title: 'Fractional CBO Services',
    heroSubheadline:
      'CXO-level execution leadership—without full-time overhead.',
    outcomesLabel: 'What you get',
    outcomes: [
      'Ongoing leadership for tracking',
      'Ongoing leadership for reviews',
      'Ongoing leadership for governance',
      'Growth strategy support',
      'Orchestration across all Process Excellence services',
    ],
    timelineLabel: 'Timeline / Engagement',
    timeline: 'Ongoing, retainer engagement.',
    pricingLabel: 'Pricing',
    pricing: '₹49,999 (website price).',
    primaryCta: { title: 'Discuss Retainer Fit', href: '/consulting/contact' },
    secondaryCta: { title: 'Book Discovery Call', href: '/consulting/booking' },
  },
  {
    slug: 'fundraise/twelfthkey-certified-verification-consultation',
    title: 'TwelfthKey Certified\u2122 Verification & Consultation',
    heroSubheadline:
      'Get your DPR/Pitch Deck reviewed and strengthened—then show a TwelfthKey Certified\u2122 stamp of credibility.',
    outcomesLabel: 'What you get',
    outcomes: [
      'Comprehensive vetting report',
      'TwelfthKey Certified\u2122 digital badge',
      'Certificate of validation',
      'Feedback report (10–15 pages)',
      'Investor-readiness score',
      '90-minute consultation session',
    ],
    timelineLabel: 'Timeline / Engagement',
    timeline: '7–10 days, one-time.',
    pricingLabel: 'Pricing',
    pricing: '₹24,999 (website price).',
    primaryCta: {
      title: 'Get Certified Review',
      href: '/consulting/contact',
    },
    secondaryCta: { title: 'Book Consultation', href: '/consulting/booking' },
  },
  {
    slug: 'fundraise/dpr-development',
    title: 'DPR Development',
    heroSubheadline:
      'A bank/investor-ready DPR with clear assumptions, realistic numbers, and a defensible plan.',
    outcomesLabel: 'What you get',
    outcomes: [
      '50-80 page DPR',
      'Executive summary',
      'Market analysis',
      'Business model',
      'Revenue projections (3–5 years)',
      'Financial modeling',
      'Risk assessment',
      'Implementation timeline',
      'Capital utilization plan',
    ],
    timelineLabel: 'Timeline / Engagement',
    timeline: '20–25 days, one-time.',
    pricingLabel: 'Pricing',
    pricing: '₹49,999 (website price).',
    primaryCta: { title: 'Build My DPR', href: '/consulting/contact' },
    secondaryCta: { title: 'Talk to an Expert', href: '/consulting/contact' },
  },
  {
    slug: 'fundraise/investor-pitch-deck-development',
    title: 'Investor Pitch Deck Development',
    heroSubheadline:
      "A pitch deck that's crisp, credible, and built to handle investor questions.",
    outcomesLabel: 'What you get',
    outcomes: [
      '12-15 slide pitch deck',
      'Problem-solution framework',
      'Market sizing (TAM/SAM/SOM)',
      'Business model',
      'Traction metrics',
      'Competitive analysis',
      'Financial projections',
      'Multiple design variants',
      'Pitch narrative script',
    ],
    timelineLabel: 'Timeline / Engagement',
    timeline: '10–15 days, one-time.',
    pricingLabel: 'Pricing',
    pricing: '₹74,999 (website price).',
    primaryCta: { title: 'Build My Pitch Deck', href: '/consulting/contact' },
    secondaryCta: {
      title: 'Get Certified Review',
      href: `${ROOT}/fundraise/twelfthkey-certified-verification-consultation`,
    },
  },
  {
    slug: 'fundraise/support-strategy-advisory',
    title: 'Support & Strategy (Advisory-Only)',
    heroSubheadline:
      'You run the raise. We handle readiness, structure, and negotiation support.',
    outcomesLabel: 'What you get',
    outcomes: [
      'Strategic fundraising roadmap',
      'Investor presentation coaching (3–5 sessions)',
      'Financial model optimization',
      'Due diligence preparation',
      'Term sheet review',
      'Monthly strategy calls',
    ],
    timelineLabel: 'Timeline / Engagement',
    timeline: '30–60 days, retainer.',
    pricingLabel: 'Pricing',
    pricing: '₹99,999 (website price).',
    primaryCta: { title: 'Explore Advisory', href: '/consulting/contact' },
    secondaryCta: { title: 'Book Strategy Call', href: '/consulting/booking' },
  },
  {
    slug: 'fundraise/fundraise-execution-full-service',
    title: 'Fundraise Execution (Full-Service)',
    heroSubheadline:
      'End-to-end fundraising support—from strategy to DD—so you stay focused on running the business.',
    outcomesLabel: 'What you get',
    outcomes: [
      'Complete fundraising strategy',
      'Investor targeting & outreach',
      'Pitch refinement',
      'Financial modeling iterations',
      'Pitch coaching',
      'Term sheet negotiation',
      'Due diligence management',
    ],
    timelineLabel: 'Timeline / Engagement',
    timeline: '60–90 days, success-based.',
    pricingLabel: 'Commercial',
    pricing: 'Success fee range shown as 5% / 3% / 2% / 1% (per pricing sheet).',
    primaryCta: { title: 'Discuss Fundraise Fit', href: '/consulting/contact' },
    secondaryCta: { title: 'Book Discovery Call', href: '/consulting/booking' },
  },
  {
    slug: 'franchise/franchise-feasibility-business-model-design',
    title: 'Franchise Feasibility & Business Model Design',
    heroSubheadline:
      'Decide if franchising is right—and if yes, build unit economics that actually work.',
    outcomesLabel: 'What you get',
    outcomes: [
      'Franchise readiness assessment',
      'Business model canvas',
      'Unit economics analysis',
      'Franchise vs. owned evaluation',
      'Territory mapping',
      'Franchise pricing model',
      'ROI projections',
      'Scalability roadmap',
    ],
    timelineLabel: 'Timeline / Engagement',
    timeline: '30 days, one-time.',
    pricingLabel: 'Pricing',
    pricing: '₹99,999 (website price).',
    primaryCta: { title: 'Check Franchise Feasibility', href: '/consulting/contact' },
    secondaryCta: { title: 'Book Discovery Call', href: '/consulting/booking' },
  },
  {
    slug: 'franchise/franchise-operations-manual-development',
    title: 'Franchise Operations Manual (FOM) Development',
    heroSubheadline:
      'A complete playbook so franchisees can run your business the right way—consistently.',
    outcomesLabel: 'What you get',
    outcomes: [
      '150–200 page operations manual',
      'Brand standards',
      'Site selection criteria',
      'Pre-opening checklist',
      'Day-to-day SOPs',
      'Staff management procedures',
      'Inventory guidelines',
      'QC standards',
      'Marketing protocols',
      'Financial reporting',
      'Technology integration',
    ],
    timelineLabel: 'Timeline / Engagement',
    timeline: '45–60 days, one-time.',
    pricingLabel: 'Pricing',
    pricing: '₹1,49,999 (website price).',
    primaryCta: { title: 'Build My FOM', href: '/consulting/contact' },
    secondaryCta: { title: 'Book Discovery Call', href: '/consulting/booking' },
  },
  {
    slug: 'franchise/franchise-legal-compliance-setup',
    title: 'Franchise Legal & Compliance Setup',
    heroSubheadline:
      'Put the legal foundation in place—clean, compliant, and franchise-ready.',
    outcomesLabel: 'What you get',
    outcomes: [
      'Franchise Disclosure Document (FDD) support',
      'Franchise agreement drafting',
      'IP protection strategy',
      'Regulatory compliance checklist',
      'Master franchise agreements',
      'Franchisee onboarding legal checklist',
    ],
    timelineLabel: 'Timeline / Engagement',
    timeline: '20–30 days, one-time.',
    pricingLabel: 'Pricing',
    pricing: '₹1,99,999 (website price).',
    primaryCta: { title: 'Set Up Compliance', href: '/consulting/contact' },
    secondaryCta: { title: 'Book Discovery Call', href: '/consulting/booking' },
  },
  {
    slug: 'franchise/franchisee-recruitment-onboarding-support',
    title: 'Franchisee Recruitment & Onboarding Support',
    heroSubheadline:
      'Attract the right franchisees—and onboard them with a repeatable system.',
    outcomesLabel: 'What you get',
    outcomes: [
      'Franchisee selection criteria',
      'Recruitment marketing strategy',
      'Lead generation process',
      'Discovery Day toolkit',
      'Financial vetting checklist',
      'Training program curriculum',
      'Onboarding playbook',
      'CRM setup',
    ],
    timelineLabel: 'Timeline / Engagement',
    timeline: '30 days, one-time.',
    pricingLabel: 'Pricing',
    pricing: '₹74,999 (website price).',
    primaryCta: { title: 'Build Recruitment System', href: '/consulting/contact' },
    secondaryCta: { title: 'Book Discovery Call', href: '/consulting/booking' },
  },
  {
    slug: 'franchise/franchise-growth-performance-management',
    title: 'Franchise Growth & Performance Management',
    heroSubheadline:
      'Keep franchisees compliant, profitable, and consistent—quarter after quarter.',
    outcomesLabel: 'What you get',
    outcomes: [
      'Quarterly performance reviews',
      'Franchisee satisfaction surveys',
      'Best practice sharing',
      'Marketing campaign coordination',
      'New product rollout support',
      'Compliance audits',
      'Dispute resolution',
    ],
    timelineLabel: 'Timeline / Engagement',
    timeline: 'Ongoing, retainer.',
    pricingLabel: 'Pricing',
    pricing: '₹49,999 (website price).',
    primaryCta: { title: 'Discuss Retainer', href: '/consulting/contact' },
    secondaryCta: { title: 'Book Discovery Call', href: '/consulting/booking' },
  },
  {
    slug: 'franchise/franchise-expansion-strategy-master-franchising',
    title: 'Franchise Expansion Strategy & Master Franchising',
    heroSubheadline:
      'Plan multi-state expansion with a clear territory strategy and growth model.',
    outcomesLabel: 'What you get',
    outcomes: [
      'Multi-state expansion roadmap',
      'Master franchise model design',
      'Territory agreements',
      'International feasibility study',
      'Franchise development agreement',
      'Investor pitch deck',
      'Growth modeling',
    ],
    timelineLabel: 'Timeline / Engagement',
    timeline: '45 days, one-time.',
    pricingLabel: 'Pricing',
    pricing: '₹2,49,999 (website price).',
    primaryCta: { title: 'Build Expansion Roadmap', href: '/consulting/contact' },
    secondaryCta: { title: 'Book Discovery Call', href: '/consulting/booking' },
  },
];

/** Map service detail slug to services-detail translation key */
export const serviceDetailSlugToKey: Record<string, string> = {
  'process-excellence/operational-health-index-report': 'operationalHealthIndexReport',
  'process-excellence/governance-reporting-setup': 'governanceReportingSetup',
  'process-excellence/opex-structuring': 'opexStructuring',
  'process-excellence/analytics-visualization-suite': 'analyticsVisualizationSuite',
  'process-excellence/fractional-cbo-services': 'fractionalCboServices',
  'fundraise/twelfthkey-certified-verification-consultation': 'twelfthkeyCertifiedVerificationConsultation',
  'fundraise/dpr-development': 'dprDevelopment',
  'fundraise/investor-pitch-deck-development': 'investorPitchDeckDevelopment',
  'fundraise/support-strategy-advisory': 'supportStrategyAdvisory',
  'fundraise/fundraise-execution-full-service': 'fundraiseExecutionFullService',
  'franchise/franchise-feasibility-business-model-design': 'franchiseFeasibilityBusinessModelDesign',
  'franchise/franchise-operations-manual-development': 'franchiseOperationsManualDevelopment',
  'franchise/franchise-legal-compliance-setup': 'franchiseLegalComplianceSetup',
  'franchise/franchisee-recruitment-onboarding-support': 'franchiseeRecruitmentOnboardingSupport',
  'franchise/franchise-growth-performance-management': 'franchiseGrowthPerformanceManagement',
  'franchise/franchise-expansion-strategy-master-franchising': 'franchiseExpansionStrategyMasterFranchising',
};

export function getServiceCategoryBySlug(slug: string) {
  return serviceCategories.find((category) => category.slug === slug);
}

export function getServiceDetailBySlug(slug: string) {
  return serviceDetails.find((service) => service.slug === slug);
}
