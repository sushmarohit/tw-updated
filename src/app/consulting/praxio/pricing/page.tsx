'use client';

import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function PraxioPricingPage() {
  const { t } = useTranslation(['praxio-pricing', 'common']);

  const tiers = [
    {
      name: t('praxio-pricing:governance.name'),
      price: 4.99,
      priceAnnual: 414,
      users: t('praxio-pricing:governance.users'),
      features: [
        t('praxio-pricing:governance.feature1'),
        t('praxio-pricing:governance.feature2'),
        t('praxio-pricing:governance.feature3'),
        t('praxio-pricing:governance.feature4'),
        t('praxio-pricing:governance.feature5'),
        t('praxio-pricing:governance.feature6'),
      ],
      color: 'teal',
    },
    {
      name: t('praxio-pricing:reporting.name'),
      price: 7.99,
      priceAnnual: 663,
      users: t('praxio-pricing:reporting.users'),
      features: [
        t('praxio-pricing:reporting.feature1'),
        t('praxio-pricing:reporting.feature2'),
        t('praxio-pricing:reporting.feature3'),
        t('praxio-pricing:reporting.feature4'),
        t('praxio-pricing:reporting.feature5'),
        t('praxio-pricing:reporting.feature6'),
      ],
      color: 'teal',
    },
    {
      name: t('praxio-pricing:analytics.name'),
      price: 11.99,
      priceAnnual: 995,
      users: t('praxio-pricing:analytics.users'),
      features: [
        t('praxio-pricing:analytics.feature1'),
        t('praxio-pricing:analytics.feature2'),
        t('praxio-pricing:analytics.feature3'),
        t('praxio-pricing:analytics.feature4'),
        t('praxio-pricing:analytics.feature5'),
        t('praxio-pricing:analytics.feature6'),
      ],
      color: 'gold',
      popular: true,
    },
    {
      name: t('praxio-pricing:aiQuantum.name'),
      price: 19.99,
      priceAnnual: 1659,
      users: t('praxio-pricing:aiQuantum.users'),
      features: [
        t('praxio-pricing:aiQuantum.feature1'),
        t('praxio-pricing:aiQuantum.feature2'),
        t('praxio-pricing:aiQuantum.feature3'),
        t('praxio-pricing:aiQuantum.feature4'),
        t('praxio-pricing:aiQuantum.feature5'),
        t('praxio-pricing:aiQuantum.feature6'),
      ],
      color: 'gold',
    },
  ];
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="section-padding bg-gradient-to-br from-navy-500 to-teal-600 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-hero mb-6 text-white">{t('praxio-pricing:title')}</h1>
            <p className="body-large text-gray-100">
              {t('praxio-pricing:subtitle')}
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {tiers.map((tier, i) => (
              <div
                key={i}
                className={`card relative ${tier.popular ? 'border-2 border-gold-300 bg-gold-50' : ''}`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gold-300 text-navy-500 px-4 py-1 rounded-full text-sm font-semibold">
                      {t('praxio-pricing:mostPopular')}
                    </span>
                  </div>
                )}
                <h3 className="heading-h3 mb-2">{tier.name}</h3>
                <div className="mb-4">
                  <div className="text-3xl font-bold text-navy-500">
                    ₹{tier.price}/user/mo
                  </div>
                  <p className="body-small text-gray-600">
                    (₹{tier.priceAnnual.toLocaleString('en-IN')}/mo equivalent)
                  </p>
                </div>
                <p className="body-small text-gray-600 mb-4">{tier.users} {t('praxio-pricing:usersIncluded')}</p>
                <ul className="space-y-2 mb-6">
                  {tier.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                      <span className="body-small text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant={tier.popular ? 'primary' : 'outline'}
                  className="w-full"
                  asChild
                >
                  <Link href="/consulting/praxio/demo">{t('praxio-pricing:getStarted')}</Link>
                </Button>
              </div>
            ))}
          </div>

          <div className="card bg-navy-500 text-white mb-12">
            <h2 className="heading-h2 mb-6 text-white">{t('praxio-pricing:billingDiscounts')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="body-default font-semibold mb-2">{t('praxio-pricing:annualPrepay')}</p>
                <p className="body-large text-gold-300">10% discount</p>
              </div>
              <div>
                <p className="body-default font-semibold mb-2">{t('praxio-pricing:multiYear')}</p>
                <p className="body-large text-gold-300">15% discount</p>
              </div>
              <div>
                <p className="body-default font-semibold mb-2">{t('praxio-pricing:freeTrial')}</p>
                <p className="body-large text-gold-300">14 days, all features</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom text-center">
          <h2 className="heading-h2 mb-4">{t('praxio-pricing:notSureTitle')}</h2>
          <p className="body-large text-gray-600 mb-8">
            {t('praxio-pricing:notSureDescription')}
          </p>
          <Button variant="primary" size="lg" asChild>
            <Link href="/consulting/praxio/demo">{t('praxio-pricing:freeTrial')}</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
