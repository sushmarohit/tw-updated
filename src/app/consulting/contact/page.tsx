'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { trackFormSubmit } from '@/lib/analytics/events';
import { useTranslation } from 'react-i18next';

const SERVICE_OPTIONS = [
  'businessOperationalAssessment',
  'operationalExcellenceFoundation',
  'governanceIntelligenceProgram',
  'analyticsVisualizationSuite',
  'enterpriseOpsCommandCenter',
  'fractionalCBO',
] as const;

const INTERESTED_IN_OPTIONS = [
  { value: 'process-excellence', labelKey: 'interestedInProcessExcellence' },
  { value: 'fundraise', labelKey: 'interestedInFundraise' },
  { value: 'franchise', labelKey: 'interestedInFranchise' },
  { value: 'tools', labelKey: 'interestedInTools' },
  { value: 'general-inquiry', labelKey: 'interestedInGeneralInquiry' },
] as const;

const HEARD_ABOUT_OPTIONS = [
  { value: '', labelKey: '' },
  { value: 'search', labelKey: 'heardAboutUsSearch' },
  { value: 'referral', labelKey: 'heardAboutUsReferral' },
  { value: 'linkedin', labelKey: 'heardAboutUsLinkedin' },
  { value: 'advertisement', labelKey: 'heardAboutUsAdvertisement' },
  { value: 'other', labelKey: 'heardAboutUsOther' },
] as const;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function isValidEmail(value: string): boolean {
  return value.length > 0 && EMAIL_REGEX.test(value.trim());
}

export default function ContactPage() {
  const { t } = useTranslation('common');
  const { t: tNav } = useTranslation('navigation');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    interested_in: [] as string[],
    heard_about_us: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [emailTouched, setEmailTouched] = useState(false);

  const emailValid = isValidEmail(formData.email);
  const emailError = emailTouched && formData.email.length > 0 && !emailValid;

  const allFieldsFilled =
    formData.name.trim() !== '' &&
    formData.email.trim() !== '' &&
    formData.message.trim() !== '';

  const canSubmit = allFieldsFilled && emailValid && !isSubmitting;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      await response.json().catch(() => ({}));

      if (!response.ok) {
        trackFormSubmit('contact', false);
        setSubmitStatus('error');
        return;
      }

      trackFormSubmit('contact', true, { email: formData.email, name: formData.name });
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        interested_in: [],
        heard_about_us: '',
        message: '',
      });
    } catch (error) {
      trackFormSubmit('contact', false);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 section-padding flex flex-col items-center">
      <div className="w-full max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="heading-h2 mb-4">{t('getInTouch')}</h1>
          <p className="body-large text-gray-600">
            {t('contactSubtitle')}
          </p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block font-semibold mb-2">
                  {t('name')} *
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  className="input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="email" className="block font-semibold mb-2">
                  {t('email')} *
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  className={`input ${emailError ? 'border-error focus:ring-error' : ''}`}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onBlur={() => setEmailTouched(true)}
                  aria-invalid={emailError}
                />
                {emailError && (
                  <p className="mt-1 text-sm text-error-dark" role="alert">
                    {t('invalidEmail')}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block font-semibold mb-2">
                  {t('phone')}
                </label>
                <input
                  id="phone"
                  type="tel"
                  className="input"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="company" className="block font-semibold mb-2">
                  {t('company')}
                </label>
                <input
                  id="company"
                  type="text"
                  className="input"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label htmlFor="service" className="block font-semibold mb-2">
                {t('services')}
              </label>
              <select
                id="service"
                className="input"
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              >
                <option value="">{t('selectService')}</option>
                {SERVICE_OPTIONS.map((key) => (
                  <option key={key} value={key}>
                    {tNav(key)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <span className="block font-semibold mb-2">{t('interestedIn')}</span>
              <div className="flex flex-wrap gap-3" role="group" aria-labelledby="interested-in-label">
                <span id="interested-in-label" className="sr-only">{t('interestedIn')}</span>
                {INTERESTED_IN_OPTIONS.map((opt) => (
                  <label key={opt.value} className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.interested_in.includes(opt.value)}
                      onChange={(e) => {
                        const next = e.target.checked
                          ? [...formData.interested_in, opt.value]
                          : formData.interested_in.filter((x) => x !== opt.value);
                        setFormData({ ...formData, interested_in: next });
                      }}
                      className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                    />
                    <span className="body-default text-gray-700">{t(opt.labelKey)}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label htmlFor="heard_about_us" className="block font-semibold mb-2">
                {t('heardAboutUs')}
              </label>
              <select
                id="heard_about_us"
                className="input"
                value={formData.heard_about_us}
                onChange={(e) => setFormData({ ...formData, heard_about_us: e.target.value })}
              >
                {HEARD_ABOUT_OPTIONS.map((opt) => (
                  <option key={opt.value || 'none'} value={opt.value}>
                    {opt.labelKey ? t(opt.labelKey) : '—'}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block font-semibold mb-2">
                {t('message')} *
              </label>
              <textarea
                id="message"
                required
                rows={6}
                className="input"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>
            {submitStatus === 'success' && (
              <div className="p-4 bg-success-light border border-success rounded-lg text-success-dark">
                {t('messageSentSuccess')}
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="p-4 bg-error-light border border-error rounded-lg text-error-dark">
                {t('messageSendFailed')}
              </div>
            )}
            <Button type="submit" variant="primary" disabled={!canSubmit} className="w-full">
              {isSubmitting ? t('sending') : (
                <>
                  <Send className="w-4 h-4 mr-2 inline" />
                  {t('sendMessage')}
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

