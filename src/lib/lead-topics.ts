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

const TOPIC_MESSAGE_PREFIX: Record<LeadTopicKey, string> = {
  'opex-playbook':
    '[topic:opex-playbook] Request: Operational Excellence Implementation Playbook (45-page PDF).\n',
  'playbook-governance':
    '[topic:playbook-governance] Request: Governance Maturity Assessment Guide.\n',
  'playbook-sop': '[topic:playbook-sop] Request: SOP Creation Template & Best Practices.\n',
  'playbook-dashboard': '[topic:playbook-dashboard] Request: Dashboard Design Playbook.\n',
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
