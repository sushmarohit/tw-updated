'use client';

import { useTranslation } from 'react-i18next';

export default function TermsOfServicePage() {
  const { t } = useTranslation('legal-terms');
  return (
    <div className="min-h-screen bg-gray-50 section-padding">
      <div className="container-custom max-w-4xl">
        <div className="card">
          <h1 className="heading-h2 mb-6">{t('legal-terms:title')}</h1>
          <p className="body-small text-gray-500 mb-8">{t('legal-terms:lastUpdated')}</p>

          <div className="space-y-6">
            <section>
              <h2 className="heading-h4 mb-3">{t('legal-terms:section1.title')}</h2>
              <p className="body-default text-gray-700">
                {t('legal-terms:section1.description')}
              </p>
            </section>

            <section>
              <h2 className="heading-h4 mb-3">{t('legal-terms:section2.title')}</h2>
              <p className="body-default text-gray-700 mb-2">
                {t('legal-terms:section2.description')}
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li className="body-default text-gray-700">{t('legal-terms:section2.item1')}</li>
                <li className="body-default text-gray-700">{t('legal-terms:section2.item2')}</li>
                <li className="body-default text-gray-700">{t('legal-terms:section2.item3')}</li>
                <li className="body-default text-gray-700">{t('legal-terms:section2.item4')}</li>
              </ul>
            </section>

            <section>
              <h2 className="heading-h4 mb-3">{t('legal-terms:section3.title')}</h2>
              <p className="body-default text-gray-700">
                {t('legal-terms:section3.description')}
              </p>
            </section>

            <section>
              <h2 className="heading-h4 mb-3">{t('legal-terms:section4.title')}</h2>
              <p className="body-default text-gray-700">
                {t('legal-terms:section4.description')}
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
