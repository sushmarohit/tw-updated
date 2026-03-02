'use client';

import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Users, Linkedin, Mail } from 'lucide-react';

export default function TeamPage() {
  const { t } = useTranslation(['about-team', 'common']);

  // Placeholder team members - in production, these would come from a CMS
  const teamMembers = [
    {
      name: t('about-team:members.member1.name'),
      role: t('about-team:members.member1.role'),
      bio: t('about-team:members.member1.bio'),
      linkedin: 'https://linkedin.com/in/adityamayekar',
      email: 'operations@twelfthkey.com',
    },
    {
      name: t('about-team:members.member2.name'),
      role: t('about-team:members.member2.role'),
      bio: t('about-team:members.member2.bio'),
      linkedin: '#',
      email: 'operations@twelfthkey.com',
    },
    {
      name: t('about-team:members.member3.name'),
      role: t('about-team:members.member3.role'),
      bio: t('about-team:members.member3.bio'),
      linkedin: '#',
      email: 'operations@twelfthkey.com',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="section-padding bg-gradient-to-br from-navy-500 to-teal-600 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-hero mb-6 text-white">{t('about-team:title')}</h1>
            <p className="body-large text-gray-100">
              {t('about-team:subtitle')}
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto mb-8">
            <h2 className="heading-h2 mb-6 text-center">{t('about-team:whyTitle')}</h2>
            <p className="body-large text-gray-700 mb-4">
              {t('about-team:whyDescription')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="card text-center">
                <div className="w-24 h-24 bg-navy-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-12 h-12 text-navy-500" />
                </div>
                <h3 className="heading-h4 mb-1">{member.name}</h3>
                <p className="body-small text-teal-500 mb-4">{member.role}</p>
                <p className="body-default text-gray-600 mb-6">{member.bio}</p>
                <div className="flex items-center justify-center gap-4">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-teal-500 transition-colors"
                    aria-label={`${member.name} LinkedIn`}
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href={`mailto:${member.email}`}
                    className="text-gray-500 hover:text-teal-500 transition-colors"
                    aria-label={`Email ${member.name}`}
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom text-center">
          <h2 className="heading-h2 mb-4">{t('about-team:joinTitle')}</h2>
          <p className="body-large text-gray-600 mb-8">
            {t('about-team:joinDescription')}
          </p>
          <Button variant="primary" size="lg" asChild>
            <Link href="/consulting/about/careers">{t('about-team:viewPositions')}</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

