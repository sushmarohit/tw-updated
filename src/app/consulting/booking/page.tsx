'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { trackBookingCompleted } from '@/lib/analytics/events';

export default function BookingPage() {
  const { t } = useTranslation('common');
  const bookingUrl = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_BOOKING_URL;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferred_date: '',
    preferred_time_slot: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setSubmitStatus('error');
        trackBookingCompleted(false);
        return;
      }
      trackBookingCompleted(true, formData.email || undefined);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', preferred_date: '', preferred_time_slot: '', message: '' });
    } catch {
      setSubmitStatus('error');
      trackBookingCompleted(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 section-padding">
      <div className="container-custom max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="heading-h2 mb-4">{t('bookYourDiscoveryCall')}</h1>
          <p className="body-large text-gray-600">
            {t('schedule45MinuteCall')}
          </p>
        </div>

        <div className="card mb-8">
          {bookingUrl ? (
            <>
              <div className="flex justify-end mb-2">
                <a
                  href={bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-teal-600 hover:text-teal-700 hover:underline"
                >
                  {t('openBookingInNewTab')} →
                </a>
              </div>
              <iframe
                src={bookingUrl}
                title={t('bookYourDiscoveryCall')}
                className="w-full border-0 rounded-lg"
                style={{ minHeight: '700px' }}
              />
            </>
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

        <div className="card">
          <h2 className="heading-h3 mb-2">{t('bookingRequestTitle')}</h2>
          <p className="body-default text-gray-600 mb-6">{t('bookingRequestSubtitle')}</p>
          <form onSubmit={handleRequestSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="booking-name" className="block font-semibold mb-1">{t('name')} *</label>
                <input
                  id="booking-name"
                  type="text"
                  required
                  className="input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="booking-email" className="block font-semibold mb-1">{t('email')} *</label>
                <input
                  id="booking-email"
                  type="email"
                  required
                  className="input"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="booking-phone" className="block font-semibold mb-1">{t('phone')}</label>
                <input
                  id="booking-phone"
                  type="tel"
                  className="input"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="booking-date" className="block font-semibold mb-1">{t('preferredDate')}</label>
                <input
                  id="booking-date"
                  type="text"
                  placeholder={t('placeholderPreferredDate')}
                  className="input"
                  value={formData.preferred_date}
                  onChange={(e) => setFormData({ ...formData, preferred_date: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label htmlFor="booking-time" className="block font-semibold mb-1">{t('preferredTimeSlot')}</label>
              <input
                id="booking-time"
                type="text"
                placeholder={t('placeholderPreferredTime')}
                className="input"
                value={formData.preferred_time_slot}
                onChange={(e) => setFormData({ ...formData, preferred_time_slot: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="booking-message" className="block font-semibold mb-1">{t('message')}</label>
              <textarea
                id="booking-message"
                rows={3}
                className="input"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>
            {submitStatus === 'success' && (
              <p className="p-3 bg-success-light border border-success rounded-lg text-success-dark text-sm">
                {t('bookingRequestSuccess')}
              </p>
            )}
            {submitStatus === 'error' && (
              <p className="p-3 bg-error-light border border-error rounded-lg text-error-dark text-sm">
                {t('bookingRequestError')}
              </p>
            )}
            <Button type="submit" variant="primary" disabled={isSubmitting}>
              {isSubmitting ? t('sending') : t('submitBookingRequest')}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
