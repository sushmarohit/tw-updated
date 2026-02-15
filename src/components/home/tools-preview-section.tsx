'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Calculator, TrendingUp, Target, BarChart3 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const toolConfig = [
  { icon: Calculator, nameKey: 'operationalHealth', time: '5 min', href: '/consulting/tools/health-check', ctaKey: 'startDiagnostic' },
  { icon: TrendingUp, nameKey: 'costLeakage', time: '3 min', href: '/consulting/tools/cost-leakage', ctaKey: 'findLeakage' },
  { icon: Target, nameKey: 'breakeven', time: '4 min', href: '/consulting/tools/breakeven', ctaKey: 'calculateBEP' },
  { icon: BarChart3, nameKey: 'scaleReadiness', time: '3 min', href: '/consulting/tools/scale-readiness', ctaKey: 'checkReadiness' },
];

export function ToolsPreviewSection() {
  const { t } = useTranslation('home');

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-8">
          <h2 className="heading-h2 mb-4">{t('toolsPreview.title')}</h2>
          <p className="body-large text-gray-600 max-w-2xl mx-auto">
            {t('toolsPreview.subtitle')}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {toolConfig.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <div key={index} className="card text-center">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-teal-500" aria-hidden="true" />
                </div>
                <h3 className="heading-h4 mb-2">{t(`toolsPreview.${tool.nameKey}`)}</h3>
                <p className="body-small text-gray-500 mb-4">{t('toolsPreview.time')}: {tool.time}</p>
                <Button variant="primary" asChild className="w-full">
                  <Link href={tool.href}>{t(`toolsPreview.${tool.ctaKey}`)}</Link>
                </Button>
              </div>
            );
          })}
        </div>
        <div className="text-center">
          <Button variant="outline" asChild>
            <Link href="/consulting/tools">{t('toolsPreview.tryAll')}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

