'use client';

import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { BarChart3, FileText, Users, Shield } from 'lucide-react';

export default function PraxioFeaturesPage() {
  const { t } = useTranslation(['praxio-features', 'common']);
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="section-padding bg-gradient-to-br from-navy-500 to-teal-600 text-white">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="heading-hero mb-6 text-white">{t('praxio-features:title')}</h1>
            <p className="body-large text-gray-100">
              {t('praxio-features:subtitle')}
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="mb-12">
            <h2 className="heading-h2 mb-8">{t('praxio-features:dashboardBuilder')}</h2>
            <div className="card">
              <p className="body-large text-gray-700 mb-4">
                {t('praxio-features:dashboardBuilderDescription')}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  t('praxio-features:executiveSummary'),
                  t('praxio-features:operations'),
                  t('praxio-features:financial'),
                  t('praxio-features:teamTalent'),
                  t('praxio-features:customer'),
                  t('praxio-features:predictive'),
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <BarChart3 className="w-5 h-5 text-teal-500 flex-shrink-0 mt-1" />
                    <p className="body-default text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="heading-h2 mb-8">{t('praxio-features:automatedReporting')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: t('praxio-features:dailyReport.title'), desc: t('praxio-features:dailyReport.desc') },
                { title: t('praxio-features:weeklyReport.title'), desc: t('praxio-features:weeklyReport.desc') },
                { title: t('praxio-features:monthlyReport.title'), desc: t('praxio-features:monthlyReport.desc') },
                { title: t('praxio-features:quarterlyReport.title'), desc: t('praxio-features:quarterlyReport.desc') },
              ].map((report, i) => (
                <div key={i} className="card">
                  <FileText className="w-10 h-10 text-teal-500 mb-3" />
                  <h3 className="heading-h4 mb-2">{report.title}</h3>
                  <p className="body-default text-gray-600">{report.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h2 className="heading-h2 mb-8">{t('praxio-features:aiAnomalyDetection')}</h2>
            <div className="card">
              <div className="space-y-4">
                {[
                  t('praxio-features:aiStep1'),
                  t('praxio-features:aiStep2'),
                  t('praxio-features:aiStep3'),
                  t('praxio-features:aiStep4'),
                  t('praxio-features:aiStep5'),
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-teal-500 font-bold">{i + 1}</span>
                    </div>
                    <p className="body-default text-gray-700 flex-1">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="heading-h2 mb-8">{t('praxio-features:securityCompliance')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: Shield, title: t('praxio-features:dataEncryption.title'), desc: t('praxio-features:dataEncryption.desc') },
                { icon: Users, title: t('praxio-features:roleBasedAccess.title'), desc: t('praxio-features:roleBasedAccess.desc') },
                { icon: FileText, title: t('praxio-features:auditLogging.title'), desc: t('praxio-features:auditLogging.desc') },
                { icon: Shield, title: t('praxio-features:complianceReady.title'), desc: t('praxio-features:complianceReady.desc') },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="card">
                    <Icon className="w-10 h-10 text-teal-500 mb-3" />
                    <h3 className="heading-h4 mb-2">{item.title}</h3>
                    <p className="body-default text-gray-600">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom text-center">
          <h2 className="heading-h2 mb-4">{t('praxio-features:readyTitle')}</h2>
          <Button variant="primary" size="lg" asChild>
            <Link href="/consulting/praxio/demo">{t('praxio-features:requestDemo')}</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
