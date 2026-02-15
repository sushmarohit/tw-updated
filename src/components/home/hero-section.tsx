'use client';

import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function HeroSection() {
  const { t } = useTranslation(['hero', 'common']);

  return (
    <section className="section-padding bg-gradient-to-br from-navy-500 via-navy-600 to-teal-600 text-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="heading-hero mb-6 text-white">
            {t('hero:title')}
          </h1>
          <p className="body-large mb-8 text-gray-100">
            {t('hero:subtitle')}
          </p>
          <p className="body-default mb-8 text-gold-300 italic">
            <span className="block">"{t('hero:quote').split('. ')[0]}"</span>
            {/* <span className="block">{t('hero:quote').split('. ').slice(1).join('. ')}"</span> */}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" asChild size="lg">
              <Link href="/consulting/tools/health-check">{t('common:getFreeOperationalDiagnostic')}</Link>
            </Button>
            <Button variant="secondary" asChild size="lg">
              <Link href="/consulting/booking">{t('common:scheduleDiscoveryCall')}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

