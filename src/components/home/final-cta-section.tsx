'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export function FinalCTASection() {
  const { t } = useTranslation('home');

  return (
    <section className="section-padding bg-gradient-to-br from-gold-300 to-gold-400 text-navy-500">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="heading-h2 mb-4">{t('finalCta.title')}</h2>
          <p className="body-large mb-8">
            {t('finalCta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Button variant="primary" asChild size="lg" className="bg-navy-500 hover:bg-navy-600 text-white">
              <Link href="/consulting/booking">{t('finalCta.bookCall')}</Link>
            </Button>
            <Button variant="secondary" asChild size="lg" className="bg-white border-navy-500 text-navy-500 hover:bg-navy-500 hover:text-white">
              <Link href="/consulting/tools/health-check">{t('finalCta.tryDiagnostic')}</Link>
            </Button>
            <Button variant="outline" asChild size="lg" className="bg-transparent border-navy-500 text-navy-500 hover:bg-navy-500 hover:text-white">
              <Link href="/consulting/services">{t('finalCta.exploreServices')}</Link>
            </Button>
          </div>
          <p className="body-small text-navy-600">
            {t('finalCta.disclaimer')}
          </p>
        </div>
      </div>
    </section>
  );
}

