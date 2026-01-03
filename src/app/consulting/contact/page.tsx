'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { trackFormSubmit } from '@/lib/analytics/events';
import { useTranslation } from 'react-i18next';

export default function ContactPage() {
  const { t } = useTranslation('common');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Here you would send to your API
      // const response = await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      trackFormSubmit('contact', true);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', company: '', message: '' });
    } catch (error) {
      trackFormSubmit('contact', false);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 section-padding">
      <div className="container-custom max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="heading-h2 mb-4">{t('getInTouch')}</h1>
          <p className="body-large text-gray-600">
            {t('contactSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
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
                      className="input"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
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
                <Button type="submit" variant="primary" disabled={isSubmitting} className="w-full">
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

          <div className="space-y-6">
            <div className="card">
              <Mail className="w-8 h-8 text-teal-500 mb-4" />
              <h3 className="heading-h4 mb-2">Email</h3>
              <a href="mailto:contact@twelfthkey.com" className="body-default text-teal-500 hover:underline">
                contact@twelfthkey.com
              </a>
            </div>
            <div className="card">
              <Phone className="w-8 h-8 text-teal-500 mb-4" />
              <h3 className="heading-h4 mb-2">Phone</h3>
              <a href="tel:+91XXXXXXXXXX" className="body-default text-teal-500 hover:underline">
                +91 XXXXXXXXXX
              </a>
            </div>
            <div className="card">
              <MapPin className="w-8 h-8 text-teal-500 mb-4" />
              <h3 className="heading-h4 mb-2">{t('address')}</h3>
              <p className="body-default text-gray-600">
                Mumbai, Maharashtra<br />
                India
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

