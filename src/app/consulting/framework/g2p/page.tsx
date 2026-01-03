'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { RefreshCw, Hexagon, Brain, Sparkles, Eye, Shield } from 'lucide-react';
import { useTranslation } from 'react-i18next';
const methodologies = [
  {
    icon: RefreshCw,
    name: 'CYCLE',
    focus: 'Predictive operational consistency',
    bestFor: 'Stabilizing operations, reducing downtime',
    metric: 'PAR (Prediction Accuracy Rate)',
    href: '/consulting/framework/cycle',
  },
  {
    icon: Hexagon,
    name: 'PARSE',
    focus: 'Strategic reset and realignment',
    bestFor: 'Crisis recovery, organizational restructuring',
    metric: 'SGI (Strategic Governance Index)',
    href: '/consulting/framework/parse',
  },
  {
    icon: Brain,
    name: 'SAGE',
    focus: 'Cognitive governance for mature ecosystems',
    bestFor: 'Decision clarity, complexity management',
    metric: 'CLS (Cognitive Load Score)',
    href: '/consulting/framework/sage',
  },
  {
    icon: Sparkles,
    name: 'MORPH',
    focus: 'Institutionalized innovation and reinvention',
    bestFor: 'Product launches, scaling innovation',
    metric: 'LV (Learning Velocity)',
    href: '/consulting/framework/morph',
  },
  {
    icon: Eye,
    name: 'PRISM',
    focus: 'Experience-driven governance (CXEX)',
    bestFor: 'Customer experience and retention',
    metric: 'CXQ (Customer Experience Quotient)',
    href: '/consulting/framework/prism',
  },
  {
    icon: Shield,
    name: 'ARC',
    focus: 'Resilience and continuity (crisis-proofing)',
    bestFor: 'Disaster recovery, business continuity',
    metric: 'RGI (Resilience Governance Index)',
    href: '/consulting/framework/arc',
  },
];

const indices = [
  {
    name: 'PAR',
    fullName: 'Prediction Accuracy Rate',
    scale: '0–1 scale',
    desc: 'How reliably your team forecasts outcomes',
    why: 'Bad forecasting = chaos, missed targets, firefighting',
    improve: 'Better data, scenario planning, feedback loops',
  },
  {
    name: 'AQ',
    fullName: 'Autonomy Quotient',
    scale: '0–1 scale',
    desc: 'How much decision-making power teams have without escalation',
    why: 'Bottlenecks kill speed; autonomy drives ownership',
    improve: 'Empower teams, clear decision authorities, coaching',
  },
  {
    name: 'CLS',
    fullName: 'Cognitive Load Score',
    scale: '0–1 scale (inverted—lower is better)',
    desc: 'Mental burden on decision-makers',
    why: 'Overloaded leaders make poor decisions',
    improve: 'Dashboards, automation, delegation, prioritization',
  },
  {
    name: 'LV',
    fullName: 'Learning Velocity',
    scale: '0–1 scale',
    desc: 'Speed your organization adapts and improves',
    why: 'Faster learning = faster competitive advantage',
    improve: 'Retrospectives, feedback loops, rapid prototyping',
  },
  {
    name: 'MTTAR',
    fullName: 'Mean Time to Auto-Resolution',
    scale: 'Hours/days',
    desc: 'How quickly recurring issues get resolved automatically',
    why: 'Automation = resilience + freed-up human time',
    improve: 'Process standardization, AI monitoring, auto-escalation',
  },
];



export default function G2POverviewPage() {
  const { t } = useTranslation(['framework-g2p', 'framework', 'common']);
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="section-padding bg-gradient-to-br from-navy-500 to-teal-600 text-white">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="heading-hero mb-6 text-white">{t('framework-g2p:title')}</h1>
            <p className="body-large text-gray-100 mb-8">
              {t('framework-g2p:subtitle')}
            </p>
            <Button variant="primary" size="lg" asChild>
              <Link href="/consulting/booking">{t('common:bookDiscoveryCall')}</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <h2 className="heading-h2 mb-8">{t('framework-g2p:whatIs')}</h2>
          <div className="card mb-12">
            <p className="body-large text-gray-700 mb-4">
              {t('framework-g2p:whatIsDescription')}
            </p>
            <div className="space-y-3">
              <h3 className="heading-h4 mb-4">{t('framework-g2p:coreTenets')}</h3>
              {[
                t('framework-g2p:tenet1'),
                t('framework-g2p:tenet2'),
                t('framework-g2p:tenet3'),
                t('framework-g2p:tenet4'),
                t('framework-g2p:tenet5'),
              ].map((tenet, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-gold-300 font-bold mt-1">{i + 1}.</span>
                  <p className="body-default text-gray-700">{tenet}</p>
                </div>
              ))}
            </div>
          </div>

          <h2 className="heading-h2 mb-8">{t('framework-g2p:sixMethodologies')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {methodologies.map((method, index) => {
              const Icon = method.icon;
              return (
                <div key={index} className="card">
                  <div className="w-16 h-16 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-8 h-8 text-teal-500" aria-hidden="true" />
                  </div>
                  <h3 className="heading-h4 mb-2">{method.name}</h3>
                  <p className="body-small font-semibold text-gray-700 mb-2">{method.focus}</p>
                  <p className="body-small text-gray-600 mb-2">
                    <strong>Best for:</strong> {method.bestFor}
                  </p>
                  <p className="body-small text-gray-600 mb-4">
                    <strong>Key metric:</strong> {method.metric}
                  </p>
                  <Button variant="outline" asChild className="w-full">
                    <Link href={method.href}>Explore {method.name}</Link>
                  </Button>
                </div>
              );
            })}
          </div>

          <h2 className="heading-h2 mb-8">{t('framework-g2p:fiveIndices')}</h2>
          <div className="space-y-6 mb-12">
            {indices.map((index, i) => (
              <div key={i} className="card">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="heading-h4 mb-2">
                      {index.name} – {index.fullName}
                    </h3>
                    <p className="body-small text-gray-500 mb-2">Scale: {index.scale}</p>
                  </div>
                  <div className="text-3xl font-bold text-gold-300">{index.name}</div>
                </div>
                <div className="space-y-2">
                  <p className="body-default text-gray-700">
                    <strong>Definition:</strong> {index.desc}
                  </p>
                  <p className="body-default text-gray-700">
                    <strong>Why it matters:</strong> {index.why}
                  </p>
                  <p className="body-default text-gray-700">
                    <strong>How to improve:</strong> {index.improve}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="card bg-navy-500 text-white mb-12">
            <h2 className="heading-h2 mb-6">{t('framework-g2p:implementationStages')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                { step: '1', title: t('framework-g2p:stage1.title'), desc: t('framework-g2p:stage1.desc') },
                { step: '2', title: t('framework-g2p:stage2.title'), desc: t('framework-g2p:stage2.desc') },
                { step: '3', title: t('framework-g2p:stage3.title'), desc: t('framework-g2p:stage3.desc') },
                { step: '4', title: t('framework-g2p:stage4.title'), desc: t('framework-g2p:stage4.desc') },
                { step: '5', title: t('framework-g2p:stage5.title'), desc: t('framework-g2p:stage5.desc') },
              ].map((stage, i) => (
                <div key={i} className="text-center">
                  <div className="w-12 h-12 bg-gold-300 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-navy-500 font-bold text-xl">{stage.step}</span>
                  </div>
                  <h3 className="heading-h4 mb-2">{stage.title}</h3>
                  <p className="body-small text-gray-300">{stage.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom text-center">
          <h2 className="heading-h2 mb-4">{t('framework-g2p:readyTitle')}</h2>
          <p className="body-large text-gray-600 mb-8">
            {t('framework-g2p:readyDescription')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" asChild>
              <Link href="/consulting/tools/health-check">Start Free Diagnostic</Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/consulting/booking">Book Discovery Call</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
