'use client';

import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Hexagon, RefreshCw, Brain, Sparkles, Eye, Shield } from 'lucide-react';

export default function FrameworkPage() {
  const { t } = useTranslation(['framework', 'common']);

  const methodologies = [
    {
      icon: RefreshCw,
      name: t('framework:cycle.name'),
      description: t('framework:cycle.description'),
      href: '/consulting/framework/cycle',
    },
    {
      icon: Hexagon,
      name: t('framework:parse.name'),
      description: t('framework:parse.description'),
      href: '/consulting/framework/parse',
    },
    {
      icon: Brain,
      name: t('framework:sage.name'),
      description: t('framework:sage.description'),
      href: '/consulting/framework/sage',
    },
    {
      icon: Sparkles,
      name: t('framework:morph.name'),
      description: t('framework:morph.description'),
      href: '/consulting/framework/morph',
    },
    {
      icon: Eye,
      name: t('framework:prism.name'),
      description: t('framework:prism.description'),
      href: '/consulting/framework/prism',
    },
    {
      icon: Shield,
      name: t('framework:arc.name'),
      description: t('framework:arc.description'),
      href: '/consulting/framework/arc',
    },
  ];
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="section-padding bg-gradient-to-br from-navy-500 to-teal-600 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-hero mb-6 text-white">{t('framework:title')}</h1>
            <p className="body-large text-gray-100 mb-8">
              {t('framework:subtitle')}
            </p>
            <Button variant="primary" size="lg" asChild>
              <Link href="/consulting/framework/g2p">{t('framework:learnMore')}</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <h2 className="heading-h2 text-center mb-12">{t('framework:sixMethodologies')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {methodologies.map((method, index) => {
              const Icon = method.icon;
              return (
                <div key={index} className="card text-center">
                  <div className="w-16 h-16 bg-teal-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-teal-500" aria-hidden="true" />
                  </div>
                  <h3 className="heading-h4 mb-2">{method.name}</h3>
                  <p className="body-default text-gray-600 mb-6">{method.description}</p>
                  <Button variant="outline" asChild>
                    <Link href={method.href}>{t('framework:explore')} {method.name}</Link>
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="heading-h2 text-center mb-12">{t('framework:fiveIndices')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              { name: t('framework:par'), desc: t('framework:parDesc') },
              { name: t('framework:aq'), desc: t('framework:aqDesc') },
              { name: t('framework:cls'), desc: t('framework:clsDesc') },
              { name: t('framework:lv'), desc: t('framework:lvDesc') },
              { name: t('framework:mttar'), desc: t('framework:mttarDesc') },
            ].map((index, i) => (
              <div key={i} className="card text-center">
                <div className="text-3xl font-bold text-gold-300 mb-2">{index.name}</div>
                <p className="body-small text-gray-600">{index.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

