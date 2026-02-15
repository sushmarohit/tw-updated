'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Eye, FileText, Brain } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const featureKeys = [
  { icon: Eye, titleKey: 'f1Title', descKey: 'f1Desc' },
  { icon: FileText, titleKey: 'f2Title', descKey: 'f2Desc' },
  { icon: Brain, titleKey: 'f3Title', descKey: 'f3Desc' },
] as const;

export function PraxioPreviewSection() {
  const { t } = useTranslation('home');

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-8">
          <h2 className="heading-h2 mb-4">{t('praxioPreview.title')}</h2>
          <p className="body-large text-gray-600 max-w-2xl mx-auto">
            {t('praxioPreview.subtitle')}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {featureKeys.map((f, index) => {
            const Icon = f.icon;
            return (
              <div key={index} className="card">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-teal-500" aria-hidden="true" />
                </div>
                <h3 className="heading-h4 mb-2">{t(`praxioPreview.${f.titleKey}`)}</h3>
                <p className="body-default text-gray-600">{t(`praxioPreview.${f.descKey}`)}</p>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="primary" asChild size="lg">
            <Link href="/consulting/praxio/demo">{t('praxioPreview.requestDemo')}</Link>
          </Button>
          <Button variant="secondary" asChild size="lg">
            <Link href="/consulting/praxio">{t('praxioPreview.startTrial')}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

