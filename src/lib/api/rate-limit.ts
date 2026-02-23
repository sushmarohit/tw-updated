/**
 * In-memory rate limiter for API routes.
 * Use for contact and calculator POST endpoints. Resets per window.
 * Note: In serverless, each instance has its own store; for multi-instance limits use Redis/KV.
 */

const store = new Map<string, { count: number; resetAt: number }>();

const WINDOW_MS = 60 * 1000; // 1 minute
const CONTACT_LIMIT = 10;
const CALCULATOR_LIMIT = 30;
const BOOKING_LIMIT = 5;
const NEWSLETTER_LIMIT = 5;

function getClientId(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  return (forwarded?.split(',')[0]?.trim() || realIp || 'unknown').toLowerCase();
}

function checkLimit(key: string, limit: number): { ok: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const entry = store.get(key);
  if (!entry) {
    const resetAt = now + WINDOW_MS;
    store.set(key, { count: 1, resetAt });
    return { ok: true, remaining: limit - 1, resetAt };
  }
  if (now >= entry.resetAt) {
    const resetAt = now + WINDOW_MS;
    store.set(key, { count: 1, resetAt });
    return { ok: true, remaining: limit - 1, resetAt };
  }
  entry.count += 1;
  const remaining = Math.max(0, limit - entry.count);
  return { ok: entry.count <= limit, remaining, resetAt: entry.resetAt };
}

export function rateLimitContact(request: Request): { ok: boolean; remaining: number; resetAt: number } {
  const id = getClientId(request);
  return checkLimit(`contact:${id}`, CONTACT_LIMIT);
}

export function rateLimitCalculator(request: Request): { ok: boolean; remaining: number; resetAt: number } {
  const id = getClientId(request);
  return checkLimit(`calculator:${id}`, CALCULATOR_LIMIT);
}

export function rateLimitBooking(request: Request): { ok: boolean; remaining: number; resetAt: number } {
  const id = getClientId(request);
  return checkLimit(`booking:${id}`, BOOKING_LIMIT);
}

export function rateLimitNewsletter(request: Request): { ok: boolean; remaining: number; resetAt: number } {
  const id = getClientId(request);
  return checkLimit(`newsletter:${id}`, NEWSLETTER_LIMIT);
}
