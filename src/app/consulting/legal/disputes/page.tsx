'use client';

import { useTranslation } from 'react-i18next';

export default function DisputeResolutionPage() {
  const { t } = useTranslation('legal-disputes');
  return (
    <div className="min-h-screen bg-gray-50 section-padding">
      <div className="container-custom max-w-4xl">
        <div className="card">
          <h1 className="heading-h2 mb-6">{t('legal-disputes:title')}</h1>
          <p className="body-small text-gray-500 mb-8">{t('legal-disputes:lastUpdated')}</p>

          <div className="space-y-6">
            <section>
              <h2 className="heading-h4 mb-3">{t('legal-disputes:section1.title')}</h2>
              <p className="body-default text-gray-700">
                {t('legal-disputes:section1.description')}{' '}
                <a href="mailto:support@twelfthkey.com" className="text-teal-500 hover:underline">
                  support@twelfthkey.com
                </a>
                {' '}to discuss any concerns.
              </p>
            </section>

            <section>
              <h2 className="heading-h4 mb-3">{t('legal-disputes:section2.title')}</h2>
              <p className="body-default text-gray-700">
                {t('legal-disputes:section2.description')}
              </p>
            </section>

            <section>
              <h2 className="heading-h4 mb-3">{t('legal-disputes:section3.title')}</h2>
              <p className="body-default text-gray-700">
                {t('legal-disputes:section3.description')}
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

