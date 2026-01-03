'use client';

import { useTranslation } from 'react-i18next';

export default function CookiePolicyPage() {
  const { t } = useTranslation('legal-cookies');
  return (
    <div className="min-h-screen bg-gray-50 section-padding">
      <div className="container-custom max-w-4xl">
        <div className="card">
          <h1 className="heading-h2 mb-6">{t('legal-cookies:title')}</h1>
          <p className="body-small text-gray-500 mb-8">{t('legal-cookies:lastUpdated')}</p>

          <div className="space-y-6">
            <section>
              <h2 className="heading-h4 mb-3">{t('legal-cookies:whatAreCookies.title')}</h2>
              <p className="body-default text-gray-700">
                {t('legal-cookies:whatAreCookies.description')}
              </p>
            </section>

            <section>
              <h2 className="heading-h4 mb-3">{t('legal-cookies:typesOfCookies.title')}</h2>
              <div className="space-y-4">
                {[
                  {
                    type: t('legal-cookies:typesOfCookies.essential.type'),
                    desc: t('legal-cookies:typesOfCookies.essential.desc'),
                  },
                  {
                    type: t('legal-cookies:typesOfCookies.analytics.type'),
                    desc: t('legal-cookies:typesOfCookies.analytics.desc'),
                  },
                  {
                    type: t('legal-cookies:typesOfCookies.functional.type'),
                    desc: t('legal-cookies:typesOfCookies.functional.desc'),
                  },
                ].map((cookie, i) => (
                  <div key={i} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold mb-2">{cookie.type}</h3>
                    <p className="body-default text-gray-600">{cookie.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="heading-h4 mb-3">{t('legal-cookies:managingCookies.title')}</h2>
              <p className="body-default text-gray-700">
                {t('legal-cookies:managingCookies.description')}
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
