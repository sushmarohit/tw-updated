'use client';

import { useTranslation } from 'react-i18next';
import { Shield, Lock, CheckCircle, FileCheck } from 'lucide-react';

export default function CompliancePage() {
  const { t } = useTranslation('legal-compliance');
  return (
    <div className="min-h-screen bg-gray-50 section-padding">
      <div className="container-custom max-w-4xl">
        <div className="card">
          <h1 className="heading-h2 mb-6">{t('legal-compliance:title')}</h1>

          <div className="space-y-8">
            <section>
              <div className="flex items-start gap-4 mb-4">
                <Shield className="w-8 h-8 text-teal-500 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="heading-h4 mb-2">{t('legal-compliance:pciDss.title')}</h2>
                  <p className="body-default text-gray-700">
                    {t('legal-compliance:pciDss.description')}
                  </p>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-start gap-4 mb-4">
                <Lock className="w-8 h-8 text-teal-500 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="heading-h4 mb-2">{t('legal-compliance:gdpr.title')}</h2>
                  <p className="body-default text-gray-700">
                    {t('legal-compliance:gdpr.description')}
                  </p>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-start gap-4 mb-4">
                <FileCheck className="w-8 h-8 text-teal-500 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="heading-h4 mb-2">{t('legal-compliance:iso27001.title')}</h2>
                  <p className="body-default text-gray-700">
                    {t('legal-compliance:iso27001.description')}
                  </p>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-start gap-4 mb-4">
                <CheckCircle className="w-8 h-8 text-teal-500 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="heading-h4 mb-2">{t('legal-compliance:dpa.title')}</h2>
                  <p className="body-default text-gray-700">
                    {t('legal-compliance:dpa.description')}{' '}
                    <a href="mailto:compliance@twelfthkey.com" className="text-teal-500 hover:underline">
                      compliance@twelfthkey.com
                    </a>
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="heading-h4 mb-3">{t('legal-compliance:auditLogs.title')}</h2>
              <p className="body-default text-gray-700">
                {t('legal-compliance:auditLogs.description')}
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
