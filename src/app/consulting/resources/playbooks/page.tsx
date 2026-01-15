'use client';

import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FileText, Download } from 'lucide-react';

export default function PlaybooksPage() {
  const { t } = useTranslation(['playbooks', 'common']);

  const playbooks = [
    {
      title: t('playbooks:playbooks.playbook1.title'),
      description: t('playbooks:playbooks.playbook1.description'),
      pages: t('playbooks:playbooks.playbook1.pages'),
      format: t('playbooks:playbooks.playbook1.format'),
    },
    {
      title: t('playbooks:playbooks.playbook2.title'),
      description: t('playbooks:playbooks.playbook2.description'),
      pages: t('playbooks:playbooks.playbook2.pages'),
      format: t('playbooks:playbooks.playbook2.format'),
    },
    {
      title: t('playbooks:playbooks.playbook3.title'),
      description: t('playbooks:playbooks.playbook3.description'),
      pages: t('playbooks:playbooks.playbook3.pages'),
      format: t('playbooks:playbooks.playbook3.format'),
    },
    {
      title: t('playbooks:playbooks.playbook4.title'),
      description: t('playbooks:playbooks.playbook4.description'),
      pages: t('playbooks:playbooks.playbook4.pages'),
      format: t('playbooks:playbooks.playbook4.format'),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="section-padding bg-gradient-to-br from-navy-500 to-teal-600 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-hero mb-6 text-white">{t('playbooks:title')}</h1>
            <p className="body-large text-gray-100">
              {t('playbooks:subtitle')}
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto space-y-6">
            {playbooks.map((playbook, index) => (
              <div key={index} className="card">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-teal-500" />
                  </div>
                  <div className="flex-1">
                    <h2 className="heading-h4 mb-2">{playbook.title}</h2>
                    <p className="body-default text-gray-600 mb-4">{playbook.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <span>{playbook.pages}</span>
                      <span>•</span>
                      <span>{playbook.format}</span>
                    </div>
                    <Button variant="outline" asChild>
                      <Link href="#">
                        <Download className="w-4 h-4 mr-2" />
                        {t('playbooks:download')}
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom text-center">
          <h2 className="heading-h2 mb-4">{t('playbooks:customTitle')}</h2>
          <p className="body-large text-gray-600 mb-8">
            {t('playbooks:customDescription')}
          </p>
          <Button variant="primary" size="lg" asChild>
            <Link href="/consulting/contact">{t('playbooks:requestCustom')}</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

