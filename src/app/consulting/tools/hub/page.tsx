'use client';

import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Calculator,
  TrendingUp,
  Target,
  BarChart3,
  AlertTriangle,
  GitBranch,
  DollarSign,
  Shield,
} from 'lucide-react';

export default function ToolsHubPage() {
  const { t } = useTranslation(['tools', 'common']);

  const tools = [
    {
      icon: Calculator,
      name: t('tools:operationalHealthDiagnostic.name'),
      description: t('tools:operationalHealthDiagnostic.description'),
      time: t('tools:operationalHealthDiagnostic.time'),
      href: '/consulting/tools/health-check',
      color: 'teal',
    },
    {
      icon: TrendingUp,
      name: t('tools:costLeakageEstimator.name'),
      description: t('tools:costLeakageEstimator.description'),
      time: t('tools:costLeakageEstimator.time'),
      href: '/consulting/tools/cost-leakage',
      color: 'gold',
    },
    {
      icon: Target,
      name: t('tools:breakEvenPointCalculator.name'),
      description: t('tools:breakEvenPointCalculator.description'),
      time: t('tools:breakEvenPointCalculator.time'),
      href: '/consulting/tools/breakeven',
      color: 'teal',
    },
    {
      icon: BarChart3,
      name: t('tools:scaleReadinessAnalyzer.name'),
      description: t('tools:scaleReadinessAnalyzer.description'),
      time: t('tools:scaleReadinessAnalyzer.time'),
      href: '/consulting/tools/scale-readiness',
      color: 'gold',
    },
    {
      icon: AlertTriangle,
      name: t('tools:teamBurnoutRiskFinder.name'),
      description: t('tools:teamBurnoutRiskFinder.description'),
      time: t('tools:teamBurnoutRiskFinder.time'),
      href: '/consulting/tools/burnout-risk',
      color: 'error',
    },
    {
      icon: GitBranch,
      name: t('tools:decisionBottleneckFinder.name'),
      description: t('tools:decisionBottleneckFinder.description'),
      time: t('tools:decisionBottleneckFinder.time'),
      href: '/consulting/tools/bottleneck-finder',
      color: 'teal',
    },
    {
      icon: DollarSign,
      name: t('tools:roiCalculator.name'),
      description: t('tools:roiCalculator.description'),
      time: t('tools:roiCalculator.time'),
      href: '/consulting/tools/roi',
      color: 'gold',
    },
    {
      icon: Shield,
      name: t('tools:governanceMaturityCalculator.name'),
      description: t('tools:governanceMaturityCalculator.description'),
      time: t('tools:governanceMaturityCalculator.time'),
      href: '/consulting/tools/governance-maturity',
      color: 'teal',
    },
  ];
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-navy-500 to-teal-600 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-hero mb-6 text-white">{t('tools:title')}</h1>
            <p className="body-large mb-8 text-gray-100">
              {t('tools:subtitle')}
            </p>
            <p className="body-default text-gold-300">
              {t('tools:tagline')}
            </p>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool, index) => {
              const Icon = tool.icon;
              return (
                <div key={index} className="card text-center">
                  <div className={`w-16 h-16 bg-${tool.color}-100 rounded-lg flex items-center justify-center mx-auto mb-4`}>
                    <Icon className={`w-8 h-8 text-${tool.color}-500`} aria-hidden="true" />
                  </div>
                  <h3 className="heading-h4 mb-2">{tool.name}</h3>
                  <p className="body-small text-gray-600 mb-3">{tool.description}</p>
                  <p className="body-small text-gray-500 mb-4">{t('tools:time')}: {tool.time}</p>
                  <Button variant="primary" asChild className="w-full">
                    <Link href={tool.href}>{t('tools:tryNow')}</Link>
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="heading-h2 text-center mb-12">{t('tools:howToolsWork')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-teal-500">1</span>
              </div>
              <h3 className="heading-h4 mb-2">{t('tools:step1.title')}</h3>
              <p className="body-default text-gray-600">{t('tools:step1.description')}</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-teal-500">2</span>
              </div>
              <h3 className="heading-h4 mb-2">{t('tools:step2.title')}</h3>
              <p className="body-default text-gray-600">{t('tools:step2.description')}</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-teal-500">3</span>
              </div>
              <h3 className="heading-h4 mb-2">{t('tools:step3.title')}</h3>
              <p className="body-default text-gray-600">{t('tools:step3.description')}</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-teal-500">4</span>
              </div>
              <h3 className="heading-h4 mb-2">{t('tools:step4.title')}</h3>
              <p className="body-default text-gray-600">{t('tools:step4.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-3xl">
          <h2 className="heading-h2 text-center mb-12">{t('tools:faq')}</h2>
          <div className="space-y-6">
            <div className="card">
              <h3 className="heading-h4 mb-2">{t('tools:faq1.question')}</h3>
              <p className="body-default text-gray-600">
                {t('tools:faq1.answer')}
              </p>
            </div>
            <div className="card">
              <h3 className="heading-h4 mb-2">{t('tools:faq2.question')}</h3>
              <p className="body-default text-gray-600">
                {t('tools:faq2.answer')}
              </p>
            </div>
            <div className="card">
              <h3 className="heading-h4 mb-2">{t('tools:faq3.question')}</h3>
              <p className="body-default text-gray-600">
                {t('tools:faq3.answer')}
              </p>
            </div>
            <div className="card">
              <h3 className="heading-h4 mb-2">{t('tools:faq4.question')}</h3>
              <p className="body-default text-gray-600">
                {t('tools:faq4.answer')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

