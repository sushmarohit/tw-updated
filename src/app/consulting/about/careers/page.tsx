'use client';

import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MapPin, Clock, ArrowRight } from 'lucide-react';

export default function CareersPage() {
  const { t } = useTranslation(['about-careers', 'common']);

  // Placeholder job openings - in production, these would come from a CMS or ATS
  const jobOpenings = [
    {
      title: t('about-careers:jobs.job1.title'),
      location: t('about-careers:jobs.job1.location'),
      type: t('about-careers:jobs.job1.type'),
      department: t('about-careers:jobs.job1.department'),
      description: t('about-careers:jobs.job1.description'),
    },
    {
      title: t('about-careers:jobs.job2.title'),
      location: t('about-careers:jobs.job2.location'),
      type: t('about-careers:jobs.job2.type'),
      department: t('about-careers:jobs.job2.department'),
      description: t('about-careers:jobs.job2.description'),
    },
    {
      title: t('about-careers:jobs.job3.title'),
      location: t('about-careers:jobs.job3.location'),
      type: t('about-careers:jobs.job3.type'),
      department: t('about-careers:jobs.job3.department'),
      description: t('about-careers:jobs.job3.description'),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="section-padding bg-gradient-to-br from-navy-500 to-teal-600 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-hero mb-6 text-white">{t('about-careers:title')}</h1>
            <p className="body-large text-gray-100">
              {t('about-careers:subtitle')}
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto mb-12">
            <h2 className="heading-h2 mb-6 text-center">{t('about-careers:whyTitle')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: t('about-careers:benefits.benefit1.title'),
                  description: t('about-careers:benefits.benefit1.description'),
                },
                {
                  title: t('about-careers:benefits.benefit2.title'),
                  description: t('about-careers:benefits.benefit2.description'),
                },
                {
                  title: t('about-careers:benefits.benefit3.title'),
                  description: t('about-careers:benefits.benefit3.description'),
                },
              ].map((benefit, i) => (
                <div key={i} className="card text-center">
                  <h3 className="heading-h4 mb-2">{benefit.title}</h3>
                  <p className="body-default text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <h2 className="heading-h2 mb-8 text-center">{t('about-careers:openPositionsTitle')}</h2>
            <div className="space-y-6">
              {jobOpenings.map((job, index) => (
                <div key={index} className="card">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="heading-h4 mb-2">{job.title}</h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {job.type}
                        </div>
                        <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full font-semibold">
                          {job.department}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="body-default text-gray-600 mb-6">{job.description}</p>
                  <Button variant="outline" asChild>
                    <Link href="#">
                      {t('about-careers:applyNow')}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom text-center">
          <h2 className="heading-h2 mb-4">{t('about-careers:noMatchTitle')}</h2>
          <p className="body-large text-gray-600 mb-8">
            {t('about-careers:noMatchDescription')}
          </p>
          <Button variant="primary" size="lg" asChild>
            <Link href="/consulting/contact">{t('about-careers:submitResume')}</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

