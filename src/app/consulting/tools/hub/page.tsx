'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import * as LucideIcons from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toolsHubCatalog, toolsHubTabOrder, type ToolsHubLucideIcon, type ToolsHubTabId } from '@/lib/tools-hub-catalog';

const COLOR_CLASSES = {
  teal: { bg: 'bg-teal-100', icon: 'text-teal-500' },
  gold: { bg: 'bg-gold-100', icon: 'text-gold-600' },
} as const;

function HubToolIcon({ name }: { name: ToolsHubLucideIcon }) {
  const Icon = LucideIcons[name];
  return <Icon className="w-8 h-8" aria-hidden="true" />;
}

export default function ToolsHubPage() {
  const { t } = useTranslation(['tools', 'common']);
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab') as ToolsHubTabId | null;
  const validTabs = toolsHubTabOrder;
  const [activeTab, setActiveTab] = useState<ToolsHubTabId>(
    tabParam && validTabs.includes(tabParam) ? tabParam : 'processExcellence'
  );

  useEffect(() => {
    if (tabParam && validTabs.includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const currentTools = toolsHubCatalog[activeTab].map((entry) => ({
    ...entry,
    name: t(`tools:${entry.messageKey}.name`),
    description: t(`tools:${entry.messageKey}.description`),
    time: t(`tools:${entry.messageKey}.time`),
  }));

  const tabs: { id: ToolsHubTabId; label: string }[] = toolsHubTabOrder.map((id) => ({
    id,
    label: t(`tools:tabs.${id}`),
  }));

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

      {/* Tabs + Tools Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="flex flex-wrap gap-2 justify-center mb-8 border-b border-gray-200 pb-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === tab.id ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                aria-selected={activeTab === tab.id}
                role="tab"
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch max-w-5xl mx-auto" role="tabpanel">
            {currentTools.map((tool) => {
              const colors = COLOR_CLASSES[tool.color];
              return (
                <div key={tool.href} className="card text-center flex flex-col h-full">
                  <div className={`w-16 h-16 ${colors.bg} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                    <span className={colors.icon}>
                      <HubToolIcon name={tool.lucideIcon} />
                    </span>
                  </div>
                  <h3 className="heading-h4 mb-2">{tool.name}</h3>
                  <p className="body-small text-gray-600 mb-3">{tool.description}</p>
                  <p className="body-small text-gray-500 mb-4">{t('tools:time')}: {tool.time}</p>
                  <Button variant="primary" asChild className="w-full mt-auto">
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
          <h2 className="heading-h2 text-center mb-8">{t('tools:howToolsWork')}</h2>
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
          <h2 className="heading-h2 text-center mb-8">{t('tools:faq')}</h2>
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

