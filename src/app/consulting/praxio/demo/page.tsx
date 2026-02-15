'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Calendar, Video } from 'lucide-react';
import { trackFormSubmit } from '@/lib/analytics/events';

export default function PraxioDemoPage() {
  const { t } = useTranslation(['praxio-demo', 'common']);
  const bookingUrl = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_BOOKING_URL;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    teamSize: '',
    useCase: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Here you would send to your API
      trackFormSubmit('praxio_demo', true);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', company: '', teamSize: '', useCase: '' });
    } catch (error) {
      trackFormSubmit('praxio_demo', false);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 section-padding">
      <div className="container-custom max-w-3xl">
        <div className="text-center mb-8">
          <h1 className="heading-h2 mb-4">{t('praxio-demo:title')}</h1>
          <p className="body-large text-gray-600">
            {t('praxio-demo:subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="card">
            <Video className="w-12 h-12 text-teal-500 mx-auto mb-4" />
            <h2 className="heading-h4 mb-4 text-center">{t('praxio-demo:requestLiveDemo')}</h2>
            {bookingUrl ? (
              <iframe
                src={bookingUrl}
                title={t('praxio-demo:requestLiveDemo')}
                className="w-full border-0 rounded-lg"
                style={{ minHeight: '500px' }}
              />
            ) : (
              <p className="body-default text-gray-600 text-center">
                {t('praxio-demo:bookingNotConfigured')}
              </p>
            )}
          </div>

          <div className="card">
            <Calendar className="w-12 h-12 text-gold-300 mx-auto mb-4" />
            <h2 className="heading-h4 mb-4 text-center">{t('praxio-demo:startFreeTrial')}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-semibold mb-2">{t('praxio-demo:name')} *</label>
                <input
                  type="text"
                  required
                  className="input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block font-semibold mb-2">{t('praxio-demo:email')} *</label>
                <input
                  type="email"
                  required
                  className="input"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block font-semibold mb-2">{t('praxio-demo:company')}</label>
                <input
                  type="text"
                  className="input"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>
              <div>
                <label className="block font-semibold mb-2">{t('praxio-demo:teamSize')}</label>
                <select
                  className="input"
                  value={formData.teamSize}
                  onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                >
                  <option value="">{t('praxio-demo:selectTeamSize')}</option>
                  <option value="1-10">1-10</option>
                  <option value="11-50">11-50</option>
                  <option value="51-200">51-200</option>
                  <option value="200+">200+</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-2">{t('praxio-demo:primaryUseCase')}</label>
                <select
                  className="input"
                  value={formData.useCase}
                  onChange={(e) => setFormData({ ...formData, useCase: e.target.value })}
                >
                  <option value="">{t('praxio-demo:selectUseCase')}</option>
                  <option value="finance">{t('praxio-demo:finance')}</option>
                  <option value="operations">{t('praxio-demo:operations')}</option>
                  <option value="hr">{t('praxio-demo:hr')}</option>
                  <option value="sales">{t('praxio-demo:sales')}</option>
                  <option value="custom">{t('praxio-demo:custom')}</option>
                </select>
              </div>
              {submitStatus === 'success' && (
                <div className="p-4 bg-success-light border border-success rounded-lg text-success-dark">
                  {t('praxio-demo:requestSubmitted')}
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="p-4 bg-error-light border border-error rounded-lg text-error-dark">
                  {t('praxio-demo:failedToSubmit')}
                </div>
              )}
              <Button type="submit" variant="primary" disabled={isSubmitting} className="w-full">
                {isSubmitting ? t('praxio-demo:submitting') : t('praxio-demo:startFreeTrial')}
              </Button>
            </form>
          </div>
        </div>

        <div className="card bg-navy-50">
          <h3 className="heading-h4 mb-4">{t('praxio-demo:demoAgenda')}</h3>
          <div className="space-y-3">
            {[
              { time: t('praxio-demo:agenda1.time'), title: t('praxio-demo:agenda1.title') },
              { time: t('praxio-demo:agenda2.time'), title: t('praxio-demo:agenda2.title') },
              { time: t('praxio-demo:agenda3.time'), title: t('praxio-demo:agenda3.title') },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <span className="font-semibold text-teal-500">{item.time}</span>
                <p className="body-default text-gray-700 flex-1">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
