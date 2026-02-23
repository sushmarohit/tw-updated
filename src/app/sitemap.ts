import type { MetadataRoute } from 'next';
import { serviceDetails } from '@/lib/services-catalog';
import { caseStudyTabs } from '@/lib/case-studies-catalog';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://twelfthkey.com';

type RouteEntry = { path: string; priority: number; changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' };

/**
 * Static routes for the TwelfthKey Consulting site.
 * Dynamic service and case-study URLs are added from catalogs.
 */
const STATIC_ROUTES: RouteEntry[] = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/consulting/how-we-help', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/consulting/process', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/consulting/faq', priority: 0.85, changeFrequency: 'weekly' },
  { path: '/consulting/services', priority: 0.9, changeFrequency: 'weekly' },
  // Framework (kept per user request)
  { path: '/consulting/framework', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/consulting/framework/g2p', priority: 0.85, changeFrequency: 'monthly' },
  { path: '/consulting/framework/cycle', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/consulting/framework/parse', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/consulting/framework/sage', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/consulting/framework/morph', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/consulting/framework/prism', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/consulting/framework/arc', priority: 0.8, changeFrequency: 'monthly' },
  // PraXio (kept per user request)
  { path: '/consulting/praxio', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/consulting/praxio/features', priority: 0.85, changeFrequency: 'monthly' },
  { path: '/consulting/praxio/pricing', priority: 0.85, changeFrequency: 'monthly' },
  { path: '/consulting/praxio/demo', priority: 0.85, changeFrequency: 'monthly' },
  { path: '/consulting/praxio/integrations', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/consulting/case-studies/hub', priority: 0.85, changeFrequency: 'weekly' },
  { path: '/consulting/tools', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/consulting/tools/hub', priority: 0.85, changeFrequency: 'weekly' },
  { path: '/consulting/tools/health-check', priority: 0.85, changeFrequency: 'monthly' },
  { path: '/consulting/tools/cost-leakage', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/consulting/tools/breakeven', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/consulting/tools/scale-readiness', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/consulting/tools/burnout-risk', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/consulting/tools/bottleneck-finder', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/consulting/tools/roi', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/consulting/tools/governance-maturity', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/consulting/resources', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/consulting/blog', priority: 0.75, changeFrequency: 'weekly' },
  { path: '/consulting/resources/playbooks', priority: 0.75, changeFrequency: 'monthly' },
  { path: '/consulting/resources/templates', priority: 0.75, changeFrequency: 'monthly' },
  { path: '/consulting/resources/webinars', priority: 0.75, changeFrequency: 'monthly' },
  { path: '/consulting/resources/business-case-kit', priority: 0.75, changeFrequency: 'monthly' },
  { path: '/consulting/about', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/consulting/about/team', priority: 0.75, changeFrequency: 'monthly' },
  { path: '/consulting/about/values', priority: 0.75, changeFrequency: 'monthly' },
  { path: '/consulting/about/careers', priority: 0.75, changeFrequency: 'monthly' },
  { path: '/consulting/contact', priority: 0.85, changeFrequency: 'monthly' },
  { path: '/consulting/booking', priority: 0.85, changeFrequency: 'monthly' },
  { path: '/consulting/legal', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/consulting/legal/privacy', priority: 0.7, changeFrequency: 'yearly' },
  { path: '/consulting/legal/terms', priority: 0.7, changeFrequency: 'yearly' },
  { path: '/consulting/legal/refund', priority: 0.7, changeFrequency: 'yearly' },
  { path: '/consulting/legal/cookies', priority: 0.7, changeFrequency: 'yearly' },
  { path: '/consulting/legal/accessibility', priority: 0.7, changeFrequency: 'yearly' },
  { path: '/consulting/legal/compliance', priority: 0.7, changeFrequency: 'yearly' },
  { path: '/consulting/legal/dpa', priority: 0.7, changeFrequency: 'yearly' },
  { path: '/consulting/legal/disputes', priority: 0.7, changeFrequency: 'yearly' },
  { path: '/consulting/legal/disclaimer', priority: 0.7, changeFrequency: 'yearly' },
];

const serviceRoutes: RouteEntry[] = serviceDetails.map((s) => ({
  path: `/consulting/services/${s.slug}`,
  priority: 0.85,
  changeFrequency: 'monthly' as const,
}));

const caseStudySlugs = caseStudyTabs.flatMap((tab) => tab.cards.map((c) => c.slug));
const caseStudyRoutes: RouteEntry[] = caseStudySlugs.map((slug) => ({
  path: `/consulting/case-studies/${slug}`,
  priority: 0.8,
  changeFrequency: 'monthly' as const,
}));

const ROUTES: RouteEntry[] = [...STATIC_ROUTES, ...serviceRoutes, ...caseStudyRoutes];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
