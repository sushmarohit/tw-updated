'use client';

import { Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export function CoreOfferingsSection() {
  const { t } = useTranslation('home');

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-8">
          <h2 className="heading-h2 mb-4">{t('coreOfferings.title')}</h2>
          <p className="body-large text-gray-600 max-w-2xl mx-auto">
            {t('coreOfferings.subtitle')}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card text-center">
            <div className="w-16 h-16 bg-gold-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-8 h-8 text-gold-300" aria-hidden="true" />
            </div>
            <h3 className="heading-h4 mb-3">{t('coreOfferings.fractionalCbo.title')}</h3>
            <p className="body-default text-gray-600 mb-6">{t('coreOfferings.fractionalCbo.description')}</p>
            <Button variant="outline" asChild>
              <Link href="/consulting/services/fractional-cbo">{t('coreOfferings.fractionalCbo.cta')}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

