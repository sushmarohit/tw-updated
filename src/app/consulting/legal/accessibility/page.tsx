'use client';

import { useTranslation } from 'react-i18next';

export default function AccessibilityStatementPage() {
  const { t } = useTranslation('legal-accessibility');
  return (
    <div className="min-h-screen bg-gray-50 section-padding">
      <div className="container-custom max-w-4xl">
        <div className="card">
          <h1 className="heading-h2 mb-6">{t('legal-accessibility:title')}</h1>
          <p className="body-small text-gray-500 mb-8">{t('legal-accessibility:lastUpdated')}</p>

          <div className="space-y-6">
            <section>
              <h2 className="heading-h4 mb-3">{t('legal-accessibility:commitment')}</h2>
              <p className="body-default text-gray-700">
                {t('legal-accessibility:commitmentText')}
              </p>
            </section>

            <section>
              <h2 className="heading-h4 mb-3">{t('legal-accessibility:wcag')}</h2>
              <p className="body-default text-gray-700 mb-2">
                {t('legal-accessibility:wcagDescription')}
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li className="body-default text-gray-700">{t('legal-accessibility:wcag1')}</li>
                <li className="body-default text-gray-700">{t('legal-accessibility:wcag2')}</li>
                <li className="body-default text-gray-700">{t('legal-accessibility:wcag3')}</li>
                <li className="body-default text-gray-700">{t('legal-accessibility:wcag4')}</li>
                <li className="body-default text-gray-700">{t('legal-accessibility:wcag5')}</li>
              </ul>
            </section>

            <section>
              <h2 className="heading-h4 mb-3">{t('legal-accessibility:feedback')}</h2>
              <p className="body-default text-gray-700">
                {t('legal-accessibility:feedbackText')}{' '}
                <a href="mailto:accessibility@twelfthkey.com" className="text-teal-500 hover:underline">
                  accessibility@twelfthkey.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
