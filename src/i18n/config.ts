import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

// Default (en) namespaces bundled so client has them before first paint (no "namespace not loaded" / hydration mismatch)
import enBundled from '@/locales/en-bundled.json';

// Track initialization state to prevent re-initialization
let isInitializing = false;
let hasInitialized = false;

// Initialize i18n with SSR-safe configuration
const initI18n = () => {
  // Prevent multiple initializations
  if (hasInitialized || isInitializing) {
    return i18n;
  }

  isInitializing = true;

  // Only initialize if we're on the client side
  if (typeof window !== 'undefined') {
    i18n
      .use(Backend)
      .use(initReactI18next)
      // No LanguageDetector here: we use lng: 'en' for first paint so server and client match (no hydration).
      // ClientLangWrapper applies detected language after mount.
      .init({
        fallbackLng: 'en',
        lng: 'en',
        supportedLngs: ['en', 'hi'],
        debug: process.env.NODE_ENV === 'development',
        resources: { en: enBundled as Record<string, object> },
        // Required so i18next loads other languages (e.g. hi) from backend when switching
        partialBundledLanguages: true,
        interpolation: {
          escapeValue: false,
        },
        backend: {
          loadPath: '/locales/{{lng}}/{{ns}}.json',
        },
        defaultNS: 'common',
        // Must include every namespace under public/locales/en so changeLanguage loads them for hi (and other non-bundled languages)
        ns: [
          'common', 'hero', 'home', 'footer', 'trustBadges', 'exitIntent', 'calculators', 'navigation', 'resources', 'blog', 'playbooks', 'templates', 'webinars', 'roi-guide',
          'about', 'about-team', 'about-values', 'about-careers',
          'case-studies-hub', 'case-studies-banking', 'case-studies-ecommerce', 'case-studies-fintech', 'case-studies-msme', 'case-studies-telecom',
          'framework', 'framework-arc', 'framework-cycle', 'framework-g2p', 'framework-morph', 'framework-parse', 'framework-prism', 'framework-sage',
          'how-we-help', 'process', 'praxio', 'praxio-demo', 'praxio-features', 'praxio-integrations', 'praxio-pricing',
          'services', 'services-analytics', 'services-assessment', 'services-enterprise', 'services-foundation', 'services-fractional-cbo', 'services-governance',
          'tools', 'tools-bottleneck-finder', 'tools-breakeven', 'tools-burnout-risk', 'tools-cost-leakage', 'tools-governance-maturity', 'tools-health-check', 'tools-roi', 'tools-scale-readiness',
          'legal-accessibility', 'legal-compliance', 'legal-cookies', 'legal-disputes', 'legal-dpa', 'legal-privacy', 'legal-refund', 'legal-terms',
          'faq',
        ],
        react: {
          useSuspense: false, // Disable suspense for SSR compatibility
          bindI18nStore: 'added', // Re-render when backend adds new language resources
        },
      })
      .then(() => {
        hasInitialized = true;
        isInitializing = false;
      })
      .catch(() => {
        isInitializing = false;
      });
  } else {
    // Server-side: create i18n instance with same translations as client to avoid hydration mismatch
    // eslint-disable-next-line @typescript-eslint/no-var-requires -- Node-only; not bundled for client
    const path = require('path');
    // eslint-disable-next-line @typescript-eslint/no-var-requires -- Node-only; not bundled for client
    const fs = require('fs');

    i18n.use(initReactI18next).init({
      fallbackLng: 'en',
      lng: 'en',
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
      },
    });

    // Load locale files from public/locales so server-rendered HTML matches client
    try {
      const localesDir = path.join(process.cwd(), 'public', 'locales', 'en');
      if (fs.existsSync(localesDir)) {
        const files = fs.readdirSync(localesDir);
        for (const file of files) {
          if (file.endsWith('.json')) {
            const ns = file.replace(/\.json$/, '');
            const filePath = path.join(localesDir, file);
            const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
            i18n.addResourceBundle('en', ns, data);
          }
        }
      }
    } catch (_) {
      // Ignore if locales not available (e.g. during build in some environments)
    }

    hasInitialized = true;
    isInitializing = false;
  }
  
  return i18n;
};

// Initialize immediately
initI18n();

export default i18n;

