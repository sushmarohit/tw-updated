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
  primaryCta: ServiceLinkItem;
  secondaryCta: ServiceLinkItem;
}

const ROOT = '/consulting/services';

/** Map category slug to services-catalog translation key */
export const serviceCategorySlugToKey: Record<string, string> = {
  'process-excellence-solutions': 'processExcellence',
  'fundraise-support-strategy': 'fundraise',
  'franchise-scale-expansion': 'franchise',
  'govt-project-liaison': 'govtLiaison',
};

export const serviceCategories: ServiceCategory[] = [
  {
    slug: 'process-excellence-solutions',
    title: 'Process Excellence Solutions',
    description:
      'Fix leakage, speed up execution, and make daily operations predictable—with SOPs, dashboards, and governance routines.',
    primaryCta: {
      title: 'Start Free Diagnostic',
      href: '/#operational-diagnostic-cta',
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
      {
        title: 'GTM Strategy & Structuring',
        href: `${ROOT}/process-excellence/gtm-strategy-structuring`,
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
      title: 'Book Discovery Call',
      href: '/consulting/booking',
    },
    items: [
      {
        title: 'TwelfthKey Fundraise Readiness Assessment™',
        href: `${ROOT}/fundraise/twelfthkey-certified-verification-consultation`,
      },
      {
        title: 'Detailed Project Report (DPR)',
        href: `${ROOT}/fundraise/dpr-development`,
      },
      {
        title: 'Investor Pitch Deck Development',
        href: `${ROOT}/fundraise/investor-pitch-deck-development`,
      },
      {
        title: 'Fundraise Process Advisory (Advisory-Only)',
        href: `${ROOT}/fundraise/support-strategy-advisory`,
      },
      {
        title: 'Fundraise Process Advisory — Full Engagement',
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
  {
    slug: 'govt-project-liaison',
    title: 'Govt. Project Liaison',
    description:
      'Clear documentation, structured follow-ups, and end-to-end coordination so approvals, registrations, and bidding work move forward without daily firefighting.',
    primaryCta: {
      title: 'Discuss Your Requirement',
      href: '/consulting/contact',
    },
    secondaryCta: {
      title: 'Book Discovery Call',
      href: '/consulting/booking',
    },
    items: [
      {
        title: 'Licence Acquisition & Certification',
        href: `${ROOT}/govt-project-liaison/licence-acquisition-certification`,
      },
      {
        title: 'Contractor Registration & Empanelment',
        href: `${ROOT}/govt-project-liaison/contractor-registration-empanelment`,
      },
      {
        title: 'Project Bidding & Liaison (End-to-End)',
        href: `${ROOT}/govt-project-liaison/project-bidding-liaison`,
      },
    ],
    // Legacy single item (commented for reference): { title: 'Govt. Liaison Support', href: '/consulting/contact?subject=Govt%20Project%20Liaison' },
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
    primaryCta: { title: 'Start Health Index', href: '/#operational-diagnostic-cta' },
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
    primaryCta: { title: 'Discuss Retainer Fit', href: '/consulting/contact' },
    secondaryCta: { title: 'Book Discovery Call', href: '/consulting/booking' },
  },
  {
    slug: 'process-excellence/gtm-strategy-structuring',
    title: 'GTM Strategy & Structuring',
    heroSubheadline:
      'Build a go-to-market plan that defines your market, channels, and launch—ready to execute.',
    outcomesLabel: 'What you get',
    outcomes: [
      'Market segmentation & ICP definition',
      'Channel strategy & prioritisation',
      'GTM roadmap with milestones',
      'Pricing strategy framework',
      'Sales playbook',
      'Launch plan',
      'KPI framework for GTM execution',
    ],
    timelineLabel: 'Timeline / Engagement',
    timeline: '30–45 days, one-time.',
    primaryCta: { title: 'Build My GTM Plan', href: '/consulting/contact' },
    secondaryCta: { title: 'Book Discovery Call', href: '/consulting/booking' },
  },
  {
    slug: 'fundraise/twelfthkey-certified-verification-consultation',
    title: 'TwelfthKey Fundraise Readiness Assessment™',
    heroSubheadline:
      'Know where you stand before you start raising—with a structured readiness report and expert advisory session.',
    outcomesLabel: 'What you get',
    outcomes: [
      'Comprehensive readiness assessment report',
      'TwelfthKey Assessed™ Digital Badge',
      'Fundraise Readiness Report',
      'Fundraise Readiness Index (internal use)',
      '90-minute advisory consultation',
    ],
    timelineLabel: 'Timeline / Engagement',
    timeline: '7–10 days, one-time.',
    primaryCta: {
      title: 'Get Readiness Assessment',
      href: '/consulting/contact',
    },
    secondaryCta: { title: 'Book Discovery Call', href: '/consulting/booking' },
  },
  {
    slug: 'fundraise/dpr-development',
    title: 'Detailed Project Report (DPR)',
    heroSubheadline:
      'A bank/investor-ready DPR with clear assumptions, realistic numbers, and a defensible plan.',
    outcomesLabel: 'What you get',
    outcomes: [
      '50–80 page DPR',
      'Executive Summary',
      'Market Analysis',
      'Business Model',
      'Revenue Projections (3–5 years)',
      'Financial Model',
      'Risk Assessment',
      'Capital Utilisation Plan',
    ],
    timelineLabel: 'Timeline / Engagement',
    timeline: '20–25 days, one-time.',
    primaryCta: { title: 'Build My DPR', href: '/consulting/contact' },
    secondaryCta: { title: 'Book Discovery Call', href: '/consulting/booking' },
  },
  {
    slug: 'fundraise/investor-pitch-deck-development',
    title: 'Investor Pitch Deck Development',
    heroSubheadline:
      "A pitch deck that's crisp, credible, and built to handle investor questions.",
    outcomesLabel: 'What you get',
    outcomes: [
      '12–15 slide pitch deck',
      'TAM/SAM/SOM',
      'Business Model',
      'Traction Metrics',
      'Competitive Analysis',
      'Financial Projections',
      'Multiple Design Variants',
      'Pitch Narrative Script',
    ],
    timelineLabel: 'Timeline / Engagement',
    timeline: '10–15 days, one-time.',
    primaryCta: { title: 'Build My Pitch Deck', href: '/consulting/contact' },
    secondaryCta: {
      title: 'Get Readiness Assessment',
      href: `${ROOT}/fundraise/twelfthkey-certified-verification-consultation`,
    },
  },
  {
    slug: 'fundraise/support-strategy-advisory',
    title: 'Fundraise Process Advisory (Advisory-Only)',
    heroSubheadline:
      'You run the raise. We handle readiness, structure, and process support.',
    outcomesLabel: 'What you get',
    outcomes: [
      'Strategic fundraise process roadmap',
      'Investor presentation coaching (3–5 sessions)',
      'Financial model optimisation',
      'Due diligence documentation support',
      'Term sheet orientation and market benchmarking',
      'Monthly strategy calls',
    ],
    timelineLabel: 'Timeline / Engagement',
    timeline: '30–60 days, retainer.',
    primaryCta: { title: 'Explore Advisory', href: '/consulting/contact' },
    secondaryCta: { title: 'Book Strategy Call', href: '/consulting/booking' },
  },
  {
    slug: 'fundraise/fundraise-execution-full-service',
    title: 'Fundraise Process Advisory — Full Engagement',
    heroSubheadline:
      'End-to-end fundraising advisory and facilitation—so you stay focused on running the business.',
    outcomesLabel: 'What you get',
    outcomes: [
      'Fundraise process strategy and advisory',
      'Investor network facilitation and introductions',
      'Pitch refinement and coaching',
      'Financial modelling iterations',
      'Term sheet orientation and comparative framework preparation',
      'Due diligence coordination and documentation support',
    ],
    timelineLabel: 'Timeline / Engagement',
    timeline: '60–90 days, outcome-based.',
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
    primaryCta: { title: 'Build Expansion Roadmap', href: '/consulting/contact' },
    secondaryCta: { title: 'Book Discovery Call', href: '/consulting/booking' },
  },
  // V5.2: Govt. Project Liaison sub-services
  {
    slug: 'govt-project-liaison/licence-acquisition-certification',
    title: 'Licence Acquisition & Certification',
    heroSubheadline:
      'Get the right licences without getting stuck in paperwork, follow-ups, and missed renewals.',
    outcomesLabel: 'What you get',
    outcomes: [
      'Documentation checklist',
      'Filing support',
      'Authority coordination',
      'Handover documentation',
      'Renewal tracker',
      'Compliance checklist',
    ],
    timelineLabel: 'Timeline / Engagement',
    timeline: 'One-time, scope-based.',
    primaryCta: { title: 'Discuss Your Requirement', href: '/consulting/contact' },
    secondaryCta: { title: 'Book Discovery Call', href: '/consulting/booking' },
  },
  {
    slug: 'govt-project-liaison/contractor-registration-empanelment',
    title: 'Contractor Registration & Empanelment',
    heroSubheadline:
      'Get empanelled with the right departments, classes, and categories so you can bid with confidence.',
    outcomesLabel: 'What you get',
    outcomes: [
      'Prerequisite checks',
      'Application filing support',
      'Class/category confirmation',
      'Validity calendar',
      'Upgrade roadmap',
    ],
    timelineLabel: 'Timeline / Engagement',
    timeline: 'One-time, scope-based.',
    primaryCta: { title: 'Discuss Your Requirement', href: '/consulting/contact' },
    secondaryCta: { title: 'Book Discovery Call', href: '/consulting/booking' },
  },
  {
    slug: 'govt-project-liaison/project-bidding-liaison',
    title: 'Project Bidding & Liaison (End-to-End)',
    heroSubheadline:
      'From tender discovery to bid submission to post-work-order coordination, handled as one execution stream.',
    outcomesLabel: 'What you get',
    outcomes: [
      'Tender discovery and tracking',
      'Bid preparation support',
      'Submission coordination',
      'Post-work-order follow-through',
    ],
    timelineLabel: 'Timeline / Engagement',
    timeline: 'Ongoing support.',
    primaryCta: { title: 'Discuss Your Requirement', href: '/consulting/contact' },
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
  'process-excellence/gtm-strategy-structuring': 'gtmStrategyStructuring',
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
  'govt-project-liaison/licence-acquisition-certification': 'govtLicenceAcquisitionCertification',
  'govt-project-liaison/contractor-registration-empanelment': 'govtContractorRegistrationEmpanelment',
  'govt-project-liaison/project-bidding-liaison': 'govtProjectBiddingLiaison',
};

export function getServiceCategoryBySlug(slug: string) {
  return serviceCategories.find((category) => category.slug === slug);
}

export function getServiceDetailBySlug(slug: string) {
  return serviceDetails.find((service) => service.slug === slug);
}
