export type CaseStudyTabKey =
  | 'process-excellence-solutions'
  | 'fundraise-execution'
  | 'franchise-scale-expansion';

export interface CaseStudyCard {
  slug: string;
  title: string;
  industryTag: string;
  hook: string;
  outcome: string;
}

export interface CaseStudyTab {
  key: CaseStudyTabKey;
  label: string;
  cards: CaseStudyCard[];
}

export interface CaseStudyDetail {
  slug: string;
  tab: CaseStudyTabKey;
  heroTitle: string;
  heroSubtitle: string;
  industry: string;
  ownerSituation: string;
  groundReality: string[];
  deliveredLabel: string;
  deliveredPoints: string[];
  outcomesLabel: string;
  outcomesPoints: string[];
  ctaBlock: string;
}

export const caseStudyTabs: CaseStudyTab[] = [
  {
    key: 'process-excellence-solutions',
    label: 'Process Excellence Solutions',
    cards: [
      {
        slug: 'pe-serviced-apartments-goa-ops',
        title: 'Guest experience was strong-but operations were leaking money.',
        industryTag: 'Serviced apartments',
        hook: 'Daily execution varied by shift, especially around reconciliation and complaint handling.',
        outcome: 'SOPs + daily closing discipline + complaint SLAs created predictable delivery.',
      },
      {
        slug: 'pe-morjim-restaurant-footfall',
        title: "Footfall dropped after launch-and marketing was 'half-hearted'.",
        industryTag: 'Restaurant & bar',
        hook: 'Spend was happening, but there was no reliable operating cadence for campaigns and conversion.',
        outcome:
          'Marketing execution got governed like operations: KPIs, attribution, cadence, accountability.',
      },
      {
        slug: 'pe-boutique-resort-meta-governance',
        title: "Agency spend was happening, but bookings weren't predictable.",
        industryTag: 'Boutique resort',
        hook: 'Monthly reporting was too slow and too abstract for weekly decisions.',
        outcome:
          'Weekly performance governance + data readiness + clear KPIs turned marketing into an operating system.',
      },
      {
        slug: 'pe-real-estate-data-hygiene',
        title: 'The project may be real-but the data was not investor-ready.',
        industryTag: 'Real estate development',
        hook: 'Core templates existed but decision-critical fields were incomplete or stale.',
        outcome:
          'Standardized project data pack + tracking discipline so decisions stop depending on guesswork.',
      },
    ],
  },
  {
    key: 'fundraise-execution',
    label: 'Fundraise Execution',
    cards: [
      {
        slug: 'fe-commercial-project-40cr',
        title: "Asset exists, location is strong-but fundraise needed 'DPR-grade' clarity.",
        industryTag: 'Commercial real estate project',
        hook: 'Construction and bookings were underway, but tranche logic and risk framing were weak.',
        outcome:
          'Rebuilt fundraise as milestone-based tranches + risk controls + sharper revenue logic.',
      },
      {
        slug: 'fe-insurance-broker-20cr',
        title: 'Strong scale-but the wrong capital story for the wrong mandate.',
        industryTag: 'Insurance brokerage',
        hook: 'Business quality was high, but mandate mismatch blocked serious movement.',
        outcome: 'Repositioned the raise: ticket sizing, structure, milestones, and investor-fit.',
      },
      {
        slug: 'fe-travel-tech-seed-model',
        title: "Deck existed, but problem statement + burn math didn't.",
        industryTag: 'Travel + travel-tech',
        hook: 'The pitch was directionally right but assumptions and sequencing were fragile under diligence.',
        outcome:
          'Tightened model sequencing (revenue-first), realistic burn, and milestone-linked ask.',
      },
      {
        slug: 'fe-logistics-app-idea-stage',
        title: 'Idea was promising-but not fundable yet.',
        industryTag: 'Logistics tech',
        hook: 'No operating proof, no clear use-of-funds, and no financing sequence for this stage.',
        outcome: "Built a 'make-it-fundable' plan: MVP, revenue proof, partners, and a clean ask.",
      },
    ],
  },
  {
    key: 'franchise-scale-expansion',
    label: 'Franchise Scale/Expansion',
    cards: [],
  },
];

export const caseStudyDetails: CaseStudyDetail[] = [
  {
    slug: 'pe-serviced-apartments-goa-ops',
    tab: 'process-excellence-solutions',
    heroTitle: 'Serviced apartments - SOPs that stopped daily leakage',
    heroSubtitle: 'Process Excellence Solutions case story',
    industry: 'Serviced apartments / apart-hotel (Goa, long-stay + OTA + direct)',
    ownerSituation:
      'Property had a strong "home away from home" promise, but daily execution depended on individuals-cash handling, payment reconciliation, and complaint handling could swing by shift.',
    groundReality: [
      'Payment modes were mixed (cash/UPI/bank transfer), and end-of-day closure depended on manual discipline.',
      "Guest issues were handled, but learning wasn't consistently captured as a repeatable system.",
    ],
    deliveredLabel: 'What we delivered (Process Excellence Solutions)',
    deliveredPoints: [
      'Front-office and cash-control SOPs anchored around a daily closing report, reconciliation discipline, and sign-offs.',
      'Complaint resolution SOP with time-bound SLAs (acknowledge fast, resolve/escalate within defined windows, document, review patterns).',
      'Weekly governance rhythm so SOPs do not become a document that nobody uses.',
    ],
    outcomesLabel: 'Owner-visible outcomes (what changed)',
    outcomesPoints: [
      'Fewer end-of-month surprises because mismatches got caught daily.',
      'Faster service recovery because complaints were classified, tracked, and reviewed for repeat causes.',
    ],
    ctaBlock:
      'If your property runs on staff goodwill instead of a system, book a discovery call.',
  },
  {
    slug: 'pe-morjim-restaurant-footfall',
    tab: 'process-excellence-solutions',
    heroTitle: 'Restaurant & bar - Footfall recovery by governing marketing like ops',
    heroSubtitle: 'Process Excellence + FCBO execution style case story',
    industry: 'Restaurant + nightlife venue (Morjim, Goa; day-to-night format)',
    ownerSituation:
      'New venue positioning was clear (sunset-to-party energy), but the last quarter showed low footfall and Meta campaigns felt unstructured.',
    groundReality: [
      'Campaigns ran without a reliable link between spend to inquiries to walk-ins/reservations.',
      'The owner needed a this-quarter revenue lift, not generic marketing activity.',
    ],
    deliveredLabel: 'What we delivered (Process Excellence + FCBO execution style)',
    deliveredPoints: [
      'Agency governance: KPIs defined (calls/DMs/reservations), weekly review cadence, creative testing rules, and clear accountability.',
      'Data readiness pack to demand before every review: Ads Manager export, creatives folder, lead log, GMB insights, basic attribution setup.',
      'Operating cadence: short weekly huddles (marketing + ops + staff levers) so promotions match on-ground capacity and conversion.',
    ],
    outcomesLabel: 'Owner-visible outcomes',
    outcomesPoints: [
      'Marketing stopped being a black box and became an execution pipeline with reviewable proof.',
      'The venue got a repeatable playbook for events/offers instead of one-off boosts.',
    ],
    ctaBlock:
      "If you're spending on ads but can't predict bookings, book a discovery call.",
  },
  {
    slug: 'pe-boutique-resort-meta-governance',
    tab: 'process-excellence-solutions',
    heroTitle: 'Boutique resort - Turning agency management into a measurable system',
    heroSubtitle: 'Process Excellence Solutions + ongoing execution case story',
    industry: 'Boutique resort (North Goa; experience-led positioning)',
    ownerSituation:
      'The business wanted performance and scalability this quarter, and hired support to manage/optimize Meta agency output across spend, lead gen, and revenue outcomes.',
    groundReality: [
      "Brand positioning was strong (distinct aesthetic + experience promise), but agency output wasn't tied to a decision dashboard the owner trusted.",
      'Reporting needed to move from monthly updates to weekly governance and action.',
    ],
    deliveredLabel: 'What we delivered (Process Excellence Solutions + ongoing execution)',
    deliveredPoints: [
      'Agency discussion framework: audit last 90-180 days performance, audience logic, creative testing, budget allocation, lead handling, and attribution.',
      'Mandatory readiness checklist: Ads exports, GA/website funnel data, pixel/UTMs, lead logs, creative calendar, channel mix, and forecasts.',
      "Weekly governance: agreed KPIs, SLAs (lead response, booking follow-ups), and escalation if outcomes don't move.",
    ],
    outcomesLabel: 'Owner-visible outcomes',
    outcomesPoints: [
      'Clear visibility on what is working, what is wasting spend, and what changes next week-not next month.',
      "Better coordination between marketing and on-ground operations so leads don't get lost.",
    ],
    ctaBlock:
      'If your resort marketing depends on hope and good creatives, book a discovery call.',
  },
  {
    slug: 'pe-real-estate-data-hygiene',
    tab: 'process-excellence-solutions',
    heroTitle: 'Real estate developer - Data hygiene + governance (even before fundraising)',
    heroSubtitle: 'Process Excellence Solutions project governance readiness case story',
    industry: 'Real estate development (project-based)',
    ownerSituation:
      'The project existed, but the spreadsheets and documentation were largely empty/partial, making it impossible to reliably assess bookings, costs, construction status, approvals, or debt details.',
    groundReality: [
      "Templates existed (sales velocity, work completion schedule, approvals status, cash flows), but most fields weren't filled-so decisions would be driven by assumptions.",
      'Debt references existed without amounts/terms, and approvals tracking was blank.',
    ],
    deliveredLabel: 'What we delivered (Process Excellence Solutions)',
    deliveredPoints: [
      'Standard project truth pack: what data must exist weekly (sales, collections, stage completion, approvals, borrowings, cash flow).',
      'Governance rhythm: who updates what, by when, what gets reviewed weekly, and what escalates to ownership.',
      'A single source-of-truth dashboard structure (so lenders/investors/internal teams see the same reality).',
    ],
    outcomesLabel: 'Owner-visible outcomes',
    outcomesPoints: [
      'Faster decision-making because the team stops recreating numbers for every meeting.',
      'Higher credibility with external stakeholders because the basics are clean and consistent.',
    ],
    ctaBlock:
      "If you're managing a project without a reliable review system, book a discovery call.",
  },
  {
    slug: 'fe-commercial-project-40cr',
    tab: 'fundraise-execution',
    heroTitle: 'Commercial real estate project - Rs40 Cr raise, structured like execution',
    heroSubtitle: 'Fundraise Execution case story',
    industry: 'Commercial real estate project (under construction)',
    ownerSituation:
      'Fundraise requirement was about Rs40 Cr, construction was about 25-30% complete, and there were existing bookings and existing debt-but the story needed tighter revenue visibility and milestone deployment clarity.',
    groundReality: [],
    deliveredLabel: 'What we delivered (Fundraise Execution)',
    deliveredPoints: [
      'Reframed the ask into milestone-linked tranches with clear release conditions.',
      'Pulled together the Key Highlights view (project size, completion status, bookings, debt, collateral logic) so an investor can understand the deal quickly.',
      'Built a clearer interest-servicing and exit logic (sales + alternative rental logic) to reduce perceived risk.',
    ],
    outcomesLabel: 'Owner-visible outcomes',
    outcomesPoints: [
      'The raise became easier to defend because it looked like a governed execution plan, not a vague number.',
      'Faster diligence conversations because the structure answers where money goes and what changes after each tranche.',
    ],
    ctaBlock:
      'If you have an asset but your fundraise story is messy, book a discovery call.',
  },
  {
    slug: 'fe-insurance-broker-20cr',
    tab: 'fundraise-execution',
    heroTitle: 'Insurance brokerage - Strong business, wrong mandate fit',
    heroSubtitle: 'Fundraise Execution repositioning case story',
    industry: 'Insurance brokerage (IRDA-licensed, multi-branch, scaled operations)',
    ownerSituation:
      'Business fundamentals were strong (scale, clients, insurer partnerships), but the fundraise did not align with a project funding / milestone mandate-so investor-fit and structure were the real blockers.',
    groundReality: [],
    deliveredLabel: 'What we delivered (Fundraise Execution)',
    deliveredPoints: [
      'Mismatch diagnosis: equity expansion ask versus investor mandate expecting asset/milestone-led deployment.',
      'Repositioning plan: restructure the raise with clearer milestones, governance rights, and ticket-size logic; map to more appropriate capital sources if mandate-fit is impossible.',
    ],
    outcomesLabel: 'Owner-visible outcomes',
    outcomesPoints: [
      'Founder got clarity on who will fund this and what must change in the story to close.',
      'Reduced time waste by not pushing the wrong deal into the wrong room.',
    ],
    ctaBlock:
      "If investors like your business but don't move forward, book a discovery call.",
  },
  {
    slug: 'fe-travel-tech-seed-model',
    tab: 'fundraise-execution',
    heroTitle: 'Travel business to travel-tech - Revenue-first model + realistic seed ask',
    heroSubtitle: 'Fundraise Execution case story',
    industry: 'Travel services + travel-tech aggregator concept (India)',
    ownerSituation:
      'Existing travel business credibility was there, but the tech-led seed plan had gaps-weak problem statement, unclear monetization sequencing, and a fundraise quantum that felt underquoted versus burn.',
    groundReality: [],
    deliveredLabel: 'What we delivered (Fundraise Execution)',
    deliveredPoints: [
      'Model sequencing: push revenue-first mechanics (CPC/CPA/affiliate) before heavier phases, so traction becomes provable.',
      'Financial sanity: realistic burn math, clearer runway, and milestone-linked tranches rather than a vague lump sum.',
      'Narrative sharpening: stronger customer pain framing beyond multi-language support.',
    ],
    outcomesLabel: 'Owner-visible outcomes',
    outcomesPoints: [
      'Pitch became tighter and more fundable because assumptions were defendable.',
      'The ask looked credible because it matched milestones and operating reality.',
    ],
    ctaBlock:
      "If your deck is ready but your numbers/story don't hold under questions, book a discovery call.",
  },
  {
    slug: 'fe-logistics-app-idea-stage',
    tab: 'fundraise-execution',
    heroTitle: 'Logistics app (idea stage) - Not fundable yet to a fundability path',
    heroSubtitle: 'Fundraise Execution case story',
    industry: 'Intercity parcel delivery app concept (pre-launch)',
    ownerSituation:
      'Concept was interesting, but the proposal had critical gaps: no active operations, no revenue visibility, missing funding quantum and use-of-funds clarity, and no proof of execution track record.',
    groundReality: [],
    deliveredLabel: 'What we delivered (Fundraise Execution)',
    deliveredPoints: [
      'A blunt fundability gap diagnosis (what fails first-order filters, and why).',
      'A make-it-fundable roadmap: MVP launch, minimum revenue proof, partner onboarding, and milestone evidence before approaching institutional capital.',
      'Clear guidance on who to approach at this stage (angels/seed) versus who not to approach.',
    ],
    outcomesLabel: 'Owner-visible outcomes',
    outcomesPoints: [
      'Founder stops burning time on the wrong capital source and focuses on measurable proof.',
      'Next steps become action-driven (launch to traction to structured raise), not deck-driven.',
    ],
    ctaBlock:
      "If you're being told come back later by investors, book a discovery call.",
  },
];

export function getCaseStudyBySlug(slug: string) {
  return caseStudyDetails.find((item) => item.slug === slug);
}

export function getCaseStudyTab(tabKey: string) {
  return caseStudyTabs.find((item) => item.key === tabKey);
}
