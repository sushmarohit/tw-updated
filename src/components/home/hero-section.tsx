'use client';

import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function HeroSection() {
  const { t } = useTranslation(['hero', 'common']);

  return (
    <section
      id="operational-diagnostic-cta"
      className="section-hero bg-gradient-to-br from-navy-500 via-navy-600 to-teal-600 text-white scroll-mt-16 md:scroll-mt-20 flex flex-col items-center"
    >
      <div className="container-custom w-full">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center justify-center">
          <h1 className="font-serif font-bold leading-tight text-white mb-4 sm:mb-5 md:mb-6 text-[clamp(1.25rem,2vw+0.75rem,4rem)] max-w-[min(100%,48rem)] mx-auto">
            {t('hero:title')}
          </h1>
          <p className="body-large mb-6 sm:mb-7 md:mb-8 text-gray-100 max-w-[min(100%,40rem)] mx-auto">
            {t('hero:subtitle')}
          </p>
          <p className="body-default mb-6 sm:mb-7 md:mb-8 text-gold-300 italic">
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

