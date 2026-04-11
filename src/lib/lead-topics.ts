/**
 * Query param `topic` on /consulting/contact and /consulting/booking for CRM-friendly routing.
 * Prefills message with a stable prefix; HubSpot/email rules can key off the bracketed slug.
 */

export const LEAD_TOPIC_KEYS = [
  'opex-playbook',
  'playbook-governance',
  'playbook-sop',
  'playbook-dashboard',
  'templates',
  'founder-explainers',
] as const;

export type LeadTopicKey = (typeof LEAD_TOPIC_KEYS)[number];

/** Topics that map to a gated PDF download after successful contact submit. */
export const PLAYBOOK_DOWNLOAD_TOPIC_KEYS = [
  'opex-playbook',
  'playbook-governance',
  'playbook-sop',
  'playbook-dashboard',
] as const;

export type PlaybookDownloadTopicKey = (typeof PLAYBOOK_DOWNLOAD_TOPIC_KEYS)[number];

/** Public filenames in /public (URL-encoded when building paths). */
const PLAYBOOK_PDF_FILENAME: Record<PlaybookDownloadTopicKey, string> = {
  'opex-playbook': 'Operational Excellence Implementation Playbook.pdf',
  'playbook-governance': 'Governance Maturity Assessment Guide.pdf',
  'playbook-sop': 'SOP Creation Template & Best Practices.pdf',
  'playbook-dashboard': 'Dashboard Design Playbook.pdf',
};

/** Service + sub-service hrefs must match `serviceCategories` (contact form option values). */
const TOPIC_CONTACT_PREFILL: Partial<
  Record<LeadTopicKey, { service: string; sub_service: string }>
> = {
  'opex-playbook': {
    service: 'process-excellence-solutions',
    sub_service: '/consulting/services/process-excellence/opex-structuring',
  },
  'playbook-governance': {
    service: 'process-excellence-solutions',
    sub_service: '/consulting/services/process-excellence/governance-reporting-setup',
  },
  'playbook-sop': {
    service: 'process-excellence-solutions',
    sub_service: '/consulting/services/process-excellence/opex-structuring',
  },
  'playbook-dashboard': {
    service: 'process-excellence-solutions',
    sub_service: '/consulting/services/process-excellence/analytics-visualization-suite',
  },
};

const TOPIC_MESSAGE_PREFIX: Record<LeadTopicKey, string> = {
  'opex-playbook':
    '[topic:opex-playbook] I want to download the Operational Excellence Implementation Playbook (PDF). Please use this submission to route my request and follow up if helpful.\n',
  'playbook-governance':
    '[topic:playbook-governance] I want to download the Governance Maturity Assessment Guide (PDF). Please use this submission to route my request and follow up if helpful.\n',
  'playbook-sop':
    '[topic:playbook-sop] I want to download the SOP Creation Template & Best Practices (PDF). Please use this submission to route my request and follow up if helpful.\n',
  'playbook-dashboard':
    '[topic:playbook-dashboard] I want to download the Dashboard Design Playbook (PDF). Please use this submission to route my request and follow up if helpful.\n',
  templates: '[topic:templates] Request: Templates / SOP or dashboard templates.\n',
  'founder-explainers':
    '[topic:founder-explainers] Request: Founder Explainers / video series access.\n',
};

export function parseLeadTopic(raw: string | null): LeadTopicKey | null {
  if (!raw) return null;
  const key = raw.trim().toLowerCase();
  return (LEAD_TOPIC_KEYS as readonly string[]).includes(key) ? (key as LeadTopicKey) : null;
}

/** Prefix to prepend to the message when topic is valid and message is empty. */
export function getLeadTopicMessagePrefix(topic: string | null): string | null {
  const key = parseLeadTopic(topic);
  if (!key) return null;
  return TOPIC_MESSAGE_PREFIX[key];
}

/** Prefill contact form service + sub_service for playbook/resource topics. */
export function getLeadTopicContactPrefill(
  topic: string | null
): { service: string; sub_service: string } | null {
  const key = parseLeadTopic(topic);
  if (!key) return null;
  return TOPIC_CONTACT_PREFILL[key] ?? null;
}

export function parsePlaybookDownloadTopic(
  topic: string | null
): PlaybookDownloadTopicKey | null {
  const key = parseLeadTopic(topic);
  if (!key) return null;
  return (PLAYBOOK_DOWNLOAD_TOPIC_KEYS as readonly string[]).includes(key)
    ? (key as PlaybookDownloadTopicKey)
    : null;
}

/** Path under site root for the PDF (e.g. /Operational%20….pdf), or null if not a playbook download. */
export function getPlaybookPdfPublicPath(topic: string | null): string | null {
  const key = parsePlaybookDownloadTopic(topic);
  if (!key) return null;
  const filename = PLAYBOOK_PDF_FILENAME[key];
  return `/${encodeURIComponent(filename)}`;
}

/** Filename for Content-Disposition-style download (no path). */
export function getPlaybookPdfFilename(topic: string | null): string | null {
  const key = parsePlaybookDownloadTopic(topic);
  if (!key) return null;
  return PLAYBOOK_PDF_FILENAME[key];
}
