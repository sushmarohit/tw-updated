'use client';

import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CheckCircle, TrendingDown, Users, Clock } from 'lucide-react';

export default function FractionalCBOPage() {
  const { t } = useTranslation(['services-fractional-cbo', 'common']);
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="section-padding bg-gradient-to-br from-navy-500 to-teal-600 text-white">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="heading-hero mb-6 text-white">{t('services-fractional-cbo:title')}</h1>
            <p className="body-large text-gray-100 mb-8">
              {t('services-fractional-cbo:subtitle')}
            </p>
            <Button variant="primary" size="lg" asChild>
              <Link href="/consulting/booking">{t('services-fractional-cbo:hireYourFractionalCBO')}</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <h2 className="heading-h2 mb-8">{t('services-fractional-cbo:whatsIncluded')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {[
              t('services-fractional-cbo:item1'),
              t('services-fractional-cbo:item2'),
              t('services-fractional-cbo:item3'),
              t('services-fractional-cbo:item4'),
              t('services-fractional-cbo:item5'),
              t('services-fractional-cbo:item6'),
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-teal-500 flex-shrink-0 mt-1" />
                <p className="body-default text-gray-700">{item}</p>
              </div>
            ))}
          </div>

          <div className="mb-12">
            <h2 className="heading-h2 mb-8">{t('services-fractional-cbo:whyFractionalCBOWins')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: TrendingDown, title: t('services-fractional-cbo:cost.title'), desc: t('services-fractional-cbo:cost.desc') },
                { icon: Users, title: t('services-fractional-cbo:experience.title'), desc: t('services-fractional-cbo:experience.desc') },
                { icon: Clock, title: t('services-fractional-cbo:flexibility.title'), desc: t('services-fractional-cbo:flexibility.desc') },
                { icon: CheckCircle, title: t('services-fractional-cbo:derisked.title'), desc: t('services-fractional-cbo:derisked.desc') },
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

          <div className="mb-12">
            <h2 className="heading-h2 mb-8">{t('services-fractional-cbo:fullTimeHireVsFractionalCBO')}</h2>
            <div className="card overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold">{t('services-fractional-cbo:dimension')}</th>
                    <th className="text-left py-3 px-4 font-semibold">{t('services-fractional-cbo:fractionalCBO')}</th>
                    <th className="text-left py-3 px-4 font-semibold">{t('services-fractional-cbo:fullTimeCXO')}</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { dim: t('services-fractional-cbo:costDim'), fractional: t('services-fractional-cbo:costFractional'), fulltime: t('services-fractional-cbo:costFulltime') },
                    { dim: t('services-fractional-cbo:commitment'), fractional: t('services-fractional-cbo:commitmentFractional'), fulltime: t('services-fractional-cbo:commitmentFulltime') },
                    { dim: t('services-fractional-cbo:onboarding'), fractional: t('services-fractional-cbo:onboardingFractional'), fulltime: t('services-fractional-cbo:onboardingFulltime') },
                    { dim: t('services-fractional-cbo:flexibilityDim'), fractional: t('services-fractional-cbo:flexibilityFractional'), fulltime: t('services-fractional-cbo:flexibilityFulltime') },
                    { dim: t('services-fractional-cbo:expertise'), fractional: t('services-fractional-cbo:expertiseFractional'), fulltime: t('services-fractional-cbo:expertiseFulltime') },
                    { dim: t('services-fractional-cbo:tools'), fractional: t('services-fractional-cbo:toolsFractional'), fulltime: t('services-fractional-cbo:toolsFulltime') },
                    { dim: t('services-fractional-cbo:risk'), fractional: t('services-fractional-cbo:riskFractional'), fulltime: t('services-fractional-cbo:riskFulltime') },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-gray-100">
                      <td className="py-3 px-4 font-semibold">{row.dim}</td>
                      <td className="py-3 px-4 text-teal-600">{row.fractional}</td>
                      <td className="py-3 px-4 text-gray-600">{row.fulltime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card bg-navy-500 text-white">
            <h3 className="heading-h3 mb-4">{t('services-fractional-cbo:investment')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="body-small text-gray-300 mb-2">{t('services-fractional-cbo:monthlyInvestment')}</p>
                <p className="heading-h3 text-gold-300">₹1,99,999</p>
                <p className="body-small text-gray-300 mt-2">{t('services-fractional-cbo:minimum6MonthRetainer')}</p>
              </div>
              <div>
                <p className="body-small text-gray-300 mb-2">{t('services-fractional-cbo:capacity')}</p>
                <p className="heading-h3 text-teal-400">{t('services-fractional-cbo:capacityValue')}</p>
                <p className="body-small text-gray-300 mt-2">{t('services-fractional-cbo:scalableTo20PlusHours')}</p>
              </div>
              <div>
                <p className="body-small text-gray-300 mb-2">{t('services-fractional-cbo:meetings')}</p>
                <p className="heading-h3 text-teal-400">{t('services-fractional-cbo:weekly')}</p>
                <p className="body-small text-gray-300 mt-2">{t('services-fractional-cbo:governanceReviewAdhoc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom text-center">
          <h2 className="heading-h2 mb-4">{t('services-fractional-cbo:readyTitle')}</h2>
          <p className="body-large text-gray-600 mb-8">
            {t('services-fractional-cbo:readyDescription')}
          </p>
          <Button variant="primary" size="lg" asChild>
            <Link href="/consulting/booking">{t('services-fractional-cbo:scheduleDiscoveryCall')}</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
