'use client';

import { useTranslation } from 'react-i18next';

export default function DPAPage() {
  const { t } = useTranslation('legal-dpa');
  return (
    <div className="min-h-screen bg-gray-50 section-padding">
      <div className="container-custom max-w-4xl">
        <div className="card">
          <h1 className="heading-h2 mb-6">{t('legal-dpa:title')}</h1>
          <p className="body-small text-gray-500 mb-8">{t('legal-dpa:lastUpdated')}</p>

          <div className="space-y-6">
            <section>
              <h2 className="heading-h4 mb-3">{t('legal-dpa:section1.title')}</h2>
              <p className="body-default text-gray-700">
                {t('legal-dpa:section1.description')}
              </p>
            </section>

            <section>
              <h2 className="heading-h4 mb-3">{t('legal-dpa:section2.title')}</h2>
              <p className="body-default text-gray-700">
                {t('legal-dpa:section2.description')}
              </p>
            </section>

            <section>
              <h2 className="heading-h4 mb-3">{t('legal-dpa:section3.title')}</h2>
              <p className="body-default text-gray-700">
                {t('legal-dpa:section3.description')}
              </p>
            </section>

            <section>
              <h2 className="heading-h4 mb-3">{t('legal-dpa:section4.title')}</h2>
              <p className="body-default text-gray-700">
                {t('legal-dpa:section4.description')}{' '}
                <a href="mailto:compliance@twelfthkey.com" className="text-teal-500 hover:underline">
                  compliance@twelfthkey.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

