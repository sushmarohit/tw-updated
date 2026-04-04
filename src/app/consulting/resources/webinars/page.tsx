'use client';

import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Video, Calendar, Clock, Play } from 'lucide-react';

export default function WebinarsPage() {
  const { t } = useTranslation(['webinars', 'common']);

  const webinars = [
    {
      title: t('webinars:webinars.webinar1.title'),
      description: t('webinars:webinars.webinar1.description'),
      duration: t('webinars:webinars.webinar1.duration'),
      date: '2025-02-15',
      type: t('webinars:webinars.webinar1.type'),
    },
    {
      title: t('webinars:webinars.webinar2.title'),
      description: t('webinars:webinars.webinar2.description'),
      duration: t('webinars:webinars.webinar2.duration'),
      date: '2025-01-20',
      type: t('webinars:webinars.webinar2.type'),
    },
    {
      title: t('webinars:webinars.webinar3.title'),
      description: t('webinars:webinars.webinar3.description'),
      duration: t('webinars:webinars.webinar3.duration'),
      date: '2025-01-10',
      type: t('webinars:webinars.webinar3.type'),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="section-padding bg-gradient-to-br from-navy-500 to-teal-600 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-hero mb-6 text-white">{t('webinars:title')}</h1>
            <p className="body-large text-gray-100">
              {t('webinars:subtitle')}
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto space-y-6">
            {webinars.map((webinar, index) => (
              <div key={index} className="card">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Video className="w-8 h-8 text-teal-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="heading-h4">{webinar.title}</h2>
                      <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                        index === 0
                          ? 'bg-gold-100 text-gold-700' 
                          : 'bg-teal-100 text-teal-700'
                      }`}>
                        {webinar.type}
                      </span>
                    </div>
                    <p className="body-default text-gray-600 mb-4">{webinar.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {webinar.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(webinar.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </div>
                    </div>
                    <Button variant="outline" asChild>
                      <Link href="/consulting/contact?topic=webinars">
                        {index === 0 ? t('webinars:register') : t('webinars:watchRecording')}
                        {index !== 0 && <Play className="w-4 h-4 ml-2" />}
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom text-center">
          <h2 className="heading-h2 mb-4">{t('webinars:customTitle')}</h2>
          <p className="body-large text-gray-600 mb-8">
            {t('webinars:customDescription')}
          </p>
          <Button variant="primary" size="lg" asChild>
            <Link href="/consulting/contact?topic=webinars">{t('webinars:requestWebinar')}</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

