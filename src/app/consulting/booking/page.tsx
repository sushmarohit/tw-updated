'use client';

import { useTranslation } from 'react-i18next';

export default function BookingPage() {
  const { t } = useTranslation('common');
  const bookingUrl = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_BOOKING_URL;

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
          {bookingUrl ? (
            <iframe
              src={bookingUrl}
              title={t('bookYourDiscoveryCall')}
              className="w-full border-0 rounded-lg"
              style={{ minHeight: '700px' }}
            />
          ) : (
            <div className="text-center py-8">
              <p className="body-default text-gray-600 mb-4">
                {t('bookingNotConfigured')}
              </p>
              <a href="mailto:contact@twelfthkey.com" className="text-teal-500 hover:underline">
                contact@twelfthkey.com
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
