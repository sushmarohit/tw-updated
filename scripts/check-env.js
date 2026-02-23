/**
 * J.36 – Check that required production env vars are set.
 * Run before deploy or in CI: node scripts/check-env.js
 * Uses .env if present (e.g. loaded by Vercel at build time).
 */
const required = [
  'DATABASE_URL',
  'DIRECT_URL',
];

const optionalButRecommended = [
  'NEXT_PUBLIC_APP_URL',
  'SMTP_HOST',
  'EMAIL_FROM',
];

function checkEnv() {
  const missing = required.filter((key) => !process.env[key] || process.env[key].trim() === '');
  const missingOptional = optionalButRecommended.filter((key) => !process.env[key] || process.env[key].trim() === '');

  if (missing.length > 0) {
    console.error('Missing required environment variables:', missing.join(', '));
    console.error('Set them in Vercel: Settings → Environment Variables. See VERCEL_ENV_CHECKLIST.md');
    process.exit(1);
  }

  if (missingOptional.length > 0) {
    console.warn('Optional but recommended env vars not set:', missingOptional.join(', '));
    console.warn('See VERCEL_ENV_CHECKLIST.md');
  }

  console.log('Required env vars OK.');
}

checkEnv();
