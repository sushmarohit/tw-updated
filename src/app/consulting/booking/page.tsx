'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { useTranslation } from 'react-i18next';

export default function BookingPage() {
  const { t } = useTranslation('common');

  useEffect(() => {
    // Calendly will auto-initialize when script loads
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 section-padding">
      <div className="container-custom max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="heading-h2 mb-4">{t('bookYourDiscoveryCall')}</h1>
          <p className="body-large text-gray-600">
            {t('schedule45MinuteCall')}
          </p>
        </div>

        <div className="card">
          {process.env.NEXT_PUBLIC_CALENDLY_URL ? (
            <div
              className="calendly-inline-widget"
              data-url={process.env.NEXT_PUBLIC_CALENDLY_URL}
              style={{ minHeight: '700px', width: '100%' }}
            />
          ) : (
            <div className="text-center py-12">
              <p className="body-default text-gray-600 mb-4">
                {t('calendlyNotConfigured')}
              </p>
              <a href="mailto:contact@twelfthkey.com" className="text-teal-500 hover:underline">
                contact@twelfthkey.com
              </a>
            </div>
          )}
        </div>

        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="lazyOnload"
        />
      </div>
    </div>
  );
}

