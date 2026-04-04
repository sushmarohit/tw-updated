export type ExplainerFilter = 'all' | 'operations' | 'governance' | 'roi' | 'tools';

export type FounderExplainerVideo = {
  slug: string;
  /** YouTube video ID when published (unlisted). Empty until content team adds IDs. */
  youtubeVideoId: string;
  episodeCode: string;
  title: string;
  duration: string;
  tagsLine: string;
  description: string;
  ctaHref: string;
  ctaText: string;
  /** Which filter chips include this video (excluding "all"). */
  filters: Exclude<ExplainerFilter, 'all'>[];
};

export type FounderExplainerSeries = {
  id: string;
  label: string;
  description: string;
  videos: FounderExplainerVideo[];
};

export const FOUNDER_EXPLAINER_SERIES: FounderExplainerSeries[] = [
  {
    id: 'operations-fundamentals',
    label: 'Operations Fundamentals',
    description:
      'The core ideas behind operational excellence — explained simply for founders building their first systems.',
    videos: [
      {
        slug: 'what-is-operational-excellence',
        youtubeVideoId: '',
        episodeCode: '1.1',
        title: "What Is Operational Excellence — And Why It's Not What You Think",
        duration: '7 min',
        tagsLine: 'Operations · Foundations',
        description:
          "Most founders think operational excellence means cutting costs or hiring more people. It means neither. This video explains what it actually is, why it matters for your specific business stage, and how TwelfthKey's G2P Framework approaches it.",
        ctaHref: '/consulting/tools/health-check',
        ctaText: 'Start Free Diagnostic',
        filters: ['operations'],
      },
      {
        slug: 'five-signs-operations-problem',
        youtubeVideoId: '',
        episodeCode: '1.2',
        title: 'The 5 Signs Your Business Has an Operations Problem',
        duration: '6 min',
        tagsLine: 'Operations · Diagnosis',
        description:
          'A visual walkthrough of the five warning signs that your business is running on founder energy rather than on systems. Use this as a self-check — if you see yourself in two or more of these, it is time to act.',
        ctaHref: '/consulting/blog/5-signs-operational-excellence',
        ctaText: 'Read the Full Article',
        filters: ['operations'],
      },
      {
        slug: 'map-business-process-30-minutes',
        youtubeVideoId: '',
        episodeCode: '1.3',
        title: 'How to Map Any Business Process in 30 Minutes',
        duration: '8 min',
        tagsLine: 'Operations · Process Mapping',
        description:
          'A live walkthrough of the SIPOC framework — the fastest way to scope and map any process before writing a single SOP. Worked through a real sales process example from start to finish.',
        ctaHref: '/consulting/resources/templates',
        ctaText: 'Download SIPOC Template',
        filters: ['operations'],
      },
      {
        slug: 'good-sop-live-walkthrough',
        youtubeVideoId: '',
        episodeCode: '1.4',
        title: 'What a Good SOP Looks Like — Live Walkthrough',
        duration: '6 min',
        tagsLine: 'Operations · SOPs',
        description:
          'We read through SOP-SALES-001 (Lead Qualification SOP) live, explaining what each field is for, what makes it usable versus ignored, and the three most common mistakes founders make when writing SOPs.',
        ctaHref: '/consulting/resources/templates',
        ctaText: 'Download SOP Template',
        filters: ['operations'],
      },
    ],
  },
  {
    id: 'governance-made-simple',
    label: 'Governance Made Simple',
    description:
      "Governance isn't compliance paperwork. These videos explain what it actually means — and how to build it in your business.",
    videos: [
      {
        slug: 'governance-maturity-explained',
        youtubeVideoId: '',
        episodeCode: '2.1',
        title: 'Governance Maturity Explained in 6 Minutes',
        duration: '6 min',
        tagsLine: 'Governance · Foundations',
        description:
          'The 5 levels of governance maturity, with real Indian MSME business examples at each stage. By the end of this video, you will know exactly which level your business is at — and what moving up one level actually looks like in practice.',
        ctaHref: '/consulting/blog/governance-maturity-guide',
        ctaText: 'Read the Full Guide',
        filters: ['governance'],
      },
      {
        slug: 'weekly-leadership-review-30-min',
        youtubeVideoId: '',
        episodeCode: '2.2',
        title: 'How to Run a Weekly Leadership Review in 30 Minutes',
        duration: '7 min',
        tagsLine: 'Governance · Review Cadence',
        description:
          "A step-by-step walkthrough of the weekly leadership review format. Covers the agenda, dashboard prep, how to handle RED metrics, how to run the action log, and what makes these sessions actually useful vs. another meeting that wastes everyone's time.",
        ctaHref: '/consulting/resources/templates',
        ctaText: 'Download Review Cadence Template',
        filters: ['governance'],
      },
      {
        slug: 'decision-rights-matrix',
        youtubeVideoId: '',
        episodeCode: '2.3',
        title: 'What Is a Decision Rights Matrix — And Why You Need One',
        duration: '5 min',
        tagsLine: 'Governance · Decision-Making',
        description:
          "What it is, why founder-dependent decision-making kills scale, and a live fill-in of a Decision Rights Matrix for a sample business. Watch this if your team is constantly waiting for you to approve things that shouldn't need you.",
        ctaHref: '/consulting/resources/templates',
        ctaText: 'Download Decision Rights Matrix',
        filters: ['governance'],
      },
    ],
  },
  {
    id: 'roi-business-case',
    label: 'ROI & Business Case',
    description:
      'How to calculate, present, and defend the financial case for fixing your operations — so the decision gets made, not deferred.',
    videos: [
      {
        slug: 'calculate-roi-fixing-operations',
        youtubeVideoId: '',
        episodeCode: '3.1',
        title: 'How to Calculate the ROI of Fixing Your Operations',
        duration: '8 min',
        tagsLine: 'ROI · Business Case',
        description:
          'A step-by-step walkthrough of the 5-step ROI thought process — worked through a real scenario: a ₹20Cr services business with a rework problem and a delivery inconsistency. Numbers, not theory.',
        ctaHref: '/consulting/resources/business-case-kit',
        ctaText: 'Download ROI Framework',
        filters: ['roi'],
      },
      {
        slug: 'direct-vs-indirect-roi',
        youtubeVideoId: '',
        episodeCode: '3.2',
        title: 'Direct vs. Indirect ROI — What Most Founders Miss',
        duration: '6 min',
        tagsLine: 'ROI · Business Case',
        description:
          'The Dual-Lens model explained visually. Why only measuring direct savings undervalues the investment — and why only claiming strategic value loses credibility. How to present both in a way that works for both founders and finance heads.',
        ctaHref: '/consulting/resources/roi-guide',
        ctaText: 'Read the ROI Guide',
        filters: ['roi'],
      },
      {
        slug: 'business-case-cfo-approve',
        youtubeVideoId: '',
        episodeCode: '3.3',
        title: 'How to Build a Business Case Your CFO Will Approve',
        duration: '7 min',
        tagsLine: 'ROI · Business Case',
        description:
          'A live walkthrough of the Single Initiative CBA Template — filling it in for a real scenario. Includes the one-sentence business case formula and how to present the conservative, base case, and optimistic scenarios.',
        ctaHref: '/consulting/resources/business-case-kit',
        ctaText: 'Download CBA Template',
        filters: ['roi'],
      },
    ],
  },
  {
    id: 'tools-dashboards',
    label: 'Tools & Dashboards',
    description:
      'Practical, screen-recorded walkthroughs for building the visibility tools your business needs — starting today, not next quarter.',
    videos: [
      {
        slug: 'first-kpi-dashboard-48-hours',
        youtubeVideoId: '',
        episodeCode: '4.1',
        title: 'Build Your First KPI Dashboard in 48 Hours',
        duration: '9 min',
        tagsLine: 'Dashboards · Tools',
        description:
          'A screen-recorded walkthrough of building the Executive Overview Dashboard (DASH-EXEC-001) in Looker Studio — from blank canvas to live dashboard, using Google Sheets as the data source. No prior BI experience needed.',
        ctaHref: '/consulting/resources/templates',
        ctaText: 'Download Dashboard Starter Kit',
        filters: ['tools'],
      },
      {
        slug: 'six-kpis-founders-track-weekly',
        youtubeVideoId: '',
        episodeCode: '4.2',
        title: 'The 6 KPIs Every Founder Should Track Weekly',
        duration: '5 min',
        tagsLine: 'Dashboards · KPIs',
        description:
          'The 6 most important business health metrics for any MSME founder — what each means, how to collect it without a data team, and what to do the moment one turns red. Simple, actionable, immediate.',
        ctaHref: '/consulting/resources/templates',
        ctaText: 'Download KPI Library Template',
        filters: ['tools'],
      },
    ],
  },
];

export function getAllFounderExplainerVideos(): FounderExplainerVideo[] {
  return FOUNDER_EXPLAINER_SERIES.flatMap((s) => s.videos);
}

export function getFounderExplainerBySlug(slug: string): FounderExplainerVideo | undefined {
  return getAllFounderExplainerVideos().find((v) => v.slug === slug);
}

export function getAllFounderExplainerSlugs(): string[] {
  return getAllFounderExplainerVideos().map((v) => v.slug);
}

export function videoMatchesFilter(video: FounderExplainerVideo, filter: ExplainerFilter): boolean {
  if (filter === 'all') return true;
  return video.filters.includes(filter);
}
