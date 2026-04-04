/**
 * Canonical blog content aligned with the developer brief appendix (three posts).
 * Listing page still uses i18n titles/excerpts where possible; slugs must stay stable for SEO and links.
 */

export type BlogSection = {
  heading?: string;
  paragraphs: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTimeLabel: string;
  category: string;
  keywords: string[];
  sections: BlogSection[];
  /** Brief: in-body cross-links */
  crossLinks?: { afterSectionIndex: number; slug: string; label: string }[];
  endCta: { label: string; href: string };
  relatedSlugs: string[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: '5-signs-operational-excellence',
    title: '5 Signs Your Business Needs Operational Excellence',
    excerpt:
      'Learn to identify the key indicators that your operations need improvement and how to address them.',
    date: '2025-01-15',
    readTimeLabel: '5 min read',
    category: 'Operations',
    keywords: [
      'operational excellence India',
      'process improvement startup',
      'operational consulting India',
      'MSME operations',
    ],
    crossLinks: [
      {
        afterSectionIndex: 2,
        slug: 'governance-maturity-guide',
        label: 'Read: The Complete Guide to Governance Maturity',
      },
    ],
    sections: [
      {
        paragraphs: [
          "You've built something real. The team is growing, orders are coming in, and the business is moving. But somewhere along the way, you stopped leading—and started firefighting. Every day feels reactive. Nothing runs without you.",
          "That's not a people problem. That's an operations problem.",
          'Here are five signs your business is telling you it is time to fix how it runs:',
        ],
      },
      {
        heading: "1. You're the bottleneck",
        paragraphs: [
          'Every decision—big or small—passes through you. Approvals pile up. Teams wait. Work slows down the moment you step away. If your business cannot move without you in the room, it is not really running—it is just surviving.',
          'This is the most common sign we see in growing Indian MSMEs: the founder becomes the single point of failure. The fix is not working harder—it is building systems that run without you.',
        ],
      },
      {
        heading: '2. The same problems keep coming back',
        paragraphs: [
          'You solved the delivery delay last month. It is back. You addressed the miscommunication between sales and operations. It happened again. Recurring problems are a symptom of processes that were never standardized.',
          'Operational excellence means building solutions that stick—through documented SOPs, defined ownership, and process compliance tracking.',
        ],
      },
      {
        heading: '3. Your costs keep climbing, but margins do not',
        paragraphs: [
          'High operational costs with low or stagnant margins is a quiet crisis. It usually means your processes have hidden waste—rework, manual steps, redundant approvals, or idle time.',
          'A structured OpEx framework targets waste through cutting friction—not through cutting people.',
        ],
      },
      {
        heading: "4. You have no visibility into what's actually happening",
        paragraphs: [
          'You rely on gut feel more than data. When a problem surfaces, your team scrambles to find numbers. There are no dashboards, no weekly metrics, no single source of truth.',
          'Without operational visibility, you cannot course-correct early. You only find out something went wrong after it already cost you.',
        ],
      },
      {
        heading: '5. Growth feels like it is breaking things',
        paragraphs: [
          'Every time you add a client, a product, or a team member, something else slips. Onboarding becomes inconsistent. Quality dips. Delivery timelines stretch. That is because your business grew—but your systems did not.',
          'Operational excellence is what creates the infrastructure for sustainable growth. It is the difference between scaling and just expanding.',
        ],
      },
      {
        paragraphs: [
          'If you spotted even two of these signs, your operations need attention—not tomorrow, but now.',
          'The good news? These are fixable—and faster than most founders expect.',
        ],
      },
    ],
    endCta: {
      label: 'Start with a free operational diagnostic',
      href: '/#operational-diagnostic-cta',
    },
    relatedSlugs: ['governance-maturity-guide'],
  },
  {
    slug: 'governance-maturity-guide',
    title: 'The Complete Guide to Governance Maturity',
    excerpt:
      "Understanding governance indices and how they measure your organization's governance health.",
    date: '2025-01-10',
    readTimeLabel: '8 min read',
    category: 'Governance',
    keywords: [
      'governance maturity MSME',
      'operational excellence India',
      'governance consulting India',
      'SOP compliance',
    ],
    sections: [
      {
        paragraphs: [
          'Most business owners hear "governance" and picture compliance paperwork or board meetings. In reality, governance is simply the answer to one question: Does your business run by design, or by default?',
          'Governance maturity is how TwelfthKey measures the answer—and it tells you more about your business health than your P&L alone.',
        ],
      },
      {
        heading: 'What governance maturity actually means',
        paragraphs: [
          'Governance maturity is the degree to which your business has defined, structured, and consistently follows the rules of how it operates—from decision-making to process ownership to accountability structures.',
          "A business at low governance maturity runs on memory, habit, and the founder's personal bandwidth. A business at high governance maturity runs on systems, documentation, and clear accountabilities—even when the founder is not in the room.",
        ],
      },
      {
        heading: 'The five levels of governance maturity',
        paragraphs: [
          "TwelfthKey's Governance Maturity Index maps businesses across five progressive stages: Reactive, Defined, Managed, Optimised, and Integrated.",
          'At Level 1 (Reactive), there are no formal processes and decisions are ad hoc. At Level 2 (Defined), core processes are documented but inconsistently followed—many three- to five-year-old businesses get stuck here.',
          'At Level 3 (Managed), processes are followed consistently, roles are clear, and KPIs are tracked regularly. Level 4 (Optimised) means the business actively improves its own processes with data. Level 5 (Integrated) connects governance, strategy, and execution so the business can replicate itself—franchising, fundraising, or leadership transition.',
        ],
      },
      {
        heading: 'Why most MSMEs are stuck at Level 2',
        paragraphs: [
          'The jump from Defined to Managed is the hardest—and the most common sticking point. It requires process ownership (someone accountable for each process), consistent compliance, and visible metrics the business can trust.',
          'Without these, even well-documented SOPs collect dust.',
        ],
      },
      {
        heading: 'Six dimensions we assess',
        paragraphs: [
          'Your governance maturity score is built across six dimensions: Decision Architecture; Process Documentation; Role Clarity; Performance Visibility; Accountability Structures; and Continuous Improvement.',
          'Together they form a baseline for your operational roadmap.',
        ],
      },
      {
        heading: 'What improving governance actually looks like',
        paragraphs: [
          "It does not start with a 200-page manual. It starts with one question: Who owns this?",
          'Governance improvement is a progressive build—scoped engagements, clear owners, and measurable compliance—not a one-off report.',
        ],
      },
    ],
    endCta: {
      label: 'Try the governance maturity tool',
      href: '/consulting/tools/governance-maturity',
    },
    relatedSlugs: ['5-signs-operational-excellence', 'fractional-cbo-vs-full-time-coo'],
  },
  {
    slug: 'fractional-cbo-vs-full-time-coo',
    title: 'Fractional CBO vs Full-Time COO: Making the Right Choice',
    excerpt:
      'A detailed comparison to help you decide which leadership model fits your business stage and budget.',
    date: '2025-01-05',
    readTimeLabel: '6 min read',
    category: 'Leadership',
    keywords: [
      'fractional COO India',
      'fractional CBO',
      'operational leadership startup',
      'MSME consulting',
    ],
    crossLinks: [
      {
        afterSectionIndex: 1,
        slug: '5-signs-operational-excellence',
        label: 'Read: 5 Signs Your Business Needs Operational Excellence',
      },
    ],
    sections: [
      {
        paragraphs: [
          'At some point, every founder hits a ceiling. The business is too complex to run alone, but hiring a full-time senior operations leader feels premature—or unaffordable. That is where the Fractional CBO model enters the picture.',
          'Here is how to think through the choice clearly.',
        ],
      },
      {
        heading: 'What each role actually does',
        paragraphs: [
          'A full-time COO is an executive employee who owns operations end-to-end—people, processes, systems, and execution. They are embedded in the org chart and carry broad responsibility across functions.',
          'A Fractional CBO (Chief Business Officer) brings senior-level operational and business strategy leadership on a part-time, structured engagement. The role is narrower by design—focused on the highest-leverage areas of operations, governance, and growth.',
        ],
      },
      {
        heading: 'Side-by-side: what to expect',
        paragraphs: [
          'Cost: a fractional model is typically a structured retainer—a fraction of full-time cost—versus full salary, benefits, and equity for a COO.',
          'Time: fractional is part-time and sprint-oriented; a COO is often 40+ hours per week.',
          'Best for: fractional fits businesses building systems, post-chaos clarity, and scoped outcomes; full-time fits large teams needing daily on-ground supervision.',
          'Speed to impact: fractional can be high when scoped; full-time may be slower due to onboarding and culture fit.',
          'Risk: fractional exit is cleaner if priorities shift; a wrong full-time hire is expensive and disruptive.',
        ],
      },
      {
        heading: 'When a Fractional CBO is the right call',
        paragraphs: [
          'Choose fractional when you are between roughly ₹5–50 Cr in revenue and need senior operational expertise without full-time overhead;',
          'when the business has traction but runs on founder dependency and informal systems;',
          'when you need a specific outcome—governance build, process standardization, or an OpEx roadmap—rather than a generalist daily manager;',
          'or when you are fundraise-ready or franchise-ready and need operations to be investment-grade before a raise or expansion.',
        ],
      },
      {
        heading: 'When a full-time COO makes more sense',
        paragraphs: [
          'Consider full-time when you have 50+ employees and need daily on-ground leadership;',
          'when operations span multiple geographies or verticals with complexity that needs constant oversight;',
          'or when the COO role is part of succession planning and you need someone to grow into permanent leadership.',
        ],
      },
      {
        heading: 'The honest truth most founders miss',
        paragraphs: [
          'Many MSMEs hire a full-time COO too early—or hire the wrong profile because they could not afford the right one. The result is a senior salary spent on execution work a team lead could handle, while the strategic gap stays open.',
          'The fractional CBO model separates strategic operational leadership from day-to-day management—and prices both appropriately for your stage.',
          'You do not need a full-time executive to build world-class operations. You need the right expertise, at the right depth, for the right duration.',
        ],
      },
    ],
    endCta: {
      label: 'Book a discovery call',
      href: '/consulting/booking',
    },
    relatedSlugs: ['5-signs-operational-excellence'],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getAllBlogSlugs(): string[] {
  return BLOG_POSTS.map((p) => p.slug);
}
