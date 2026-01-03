'use client';

import { useTranslation } from 'react-i18next';

export default function PrivacyPolicyPage() {
  const { t } = useTranslation('legal-privacy');
  return (
    <div className="min-h-screen bg-gray-50 section-padding">
      <div className="container-custom max-w-4xl">
        <div className="card">
          <h1 className="heading-h2 mb-6">{t('legal-privacy:title')}</h1>
          <p className="body-small text-gray-500 mb-8">{t('legal-privacy:lastUpdated')}</p>

          <div className="space-y-6">
            <section>
              <h2 className="heading-h4 mb-3">{t('legal-privacy:section1')}</h2>
              <p className="body-default text-gray-700 mb-2">
                {t('legal-privacy:section1Text')}
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li className="body-default text-gray-700">{t('legal-privacy:section1Item1')}</li>
                <li className="body-default text-gray-700">{t('legal-privacy:section1Item2')}</li>
                <li className="body-default text-gray-700">{t('legal-privacy:section1Item3')}</li>
                <li className="body-default text-gray-700">{t('legal-privacy:section1Item4')}</li>
              </ul>
            </section>

            <section>
              <h2 className="heading-h4 mb-3">{t('legal-privacy:section2')}</h2>
              <p className="body-default text-gray-700 mb-2">
                {t('legal-privacy:section2Text')}
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li className="body-default text-gray-700">{t('legal-privacy:section2Item1')}</li>
                <li className="body-default text-gray-700">{t('legal-privacy:section2Item2')}</li>
                <li className="body-default text-gray-700">{t('legal-privacy:section2Item3')}</li>
                <li className="body-default text-gray-700">{t('legal-privacy:section2Item4')}</li>
              </ul>
            </section>

            <section>
              <h2 className="heading-h4 mb-3">{t('legal-privacy:section3')}</h2>
              <p className="body-default text-gray-700">
                {t('legal-privacy:section3Text')}
              </p>
            </section>

            <section>
              <h2 className="heading-h4 mb-3">{t('legal-privacy:section4')}</h2>
              <p className="body-default text-gray-700 mb-2">
                {t('legal-privacy:section4Text')}
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li className="body-default text-gray-700">{t('legal-privacy:section4Item1')}</li>
                <li className="body-default text-gray-700">{t('legal-privacy:section4Item2')}</li>
                <li className="body-default text-gray-700">{t('legal-privacy:section4Item3')}</li>
                <li className="body-default text-gray-700">{t('legal-privacy:section4Item4')}</li>
                <li className="body-default text-gray-700">{t('legal-privacy:section4Item5')}</li>
              </ul>
            </section>

            <section>
              <h2 className="heading-h4 mb-3">{t('legal-privacy:section5')}</h2>
              <p className="body-default text-gray-700">
                {t('legal-privacy:section5Text')}{' '}
                <a href="mailto:privacy@twelfthkey.com" className="text-teal-500 hover:underline">
                  privacy@twelfthkey.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

