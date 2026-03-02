'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { TrendingUp, DollarSign, CheckCircle, Percent } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { TestimonialsBlock } from '@/components/shared/testimonials-block';

const statKeys = ['stat1', 'stat2', 'stat3', 'stat4'] as const;
const statValues = ['35–59%', '45–90L', '12+', '65–80%'];
const icons = [TrendingUp, DollarSign, CheckCircle, Percent];

export function ProofSection() {
  const { t } = useTranslation(['home', 'about-clientele']);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [counted, setCounted] = useState(false);

  useEffect(() => {
    if (isInView && !counted) {
      setCounted(true);
    }
  }, [isInView, counted]);

  return (
    <section ref={ref} className="section-padding bg-navy-500 text-white">
      <div className="container-custom">
        <div className="text-center mb-8">
          <h2 className="heading-h2 mb-4 text-white">{t('proof.title')}</h2>
          <p className="body-large text-gray-100 max-w-2xl mx-auto">
            {t('proof.subtitle')}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {statKeys.map((key, index) => {
            const Icon = icons[index];
            return (
              <div key={key} className="text-center">
                <div className="w-16 h-16 bg-gold-300 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-navy-500" aria-hidden="true" />
                </div>
                <div className="heading-h3 text-gold-300 mb-2">{statValues[index]}</div>
                <p className="body-default text-gray-200">{t(`proof.${key}`)}</p>
              </div>
            );
          })}
        </div>
        <div className="mb-8 max-w-5xl mx-auto">
          <h3 className="heading-h4 text-white text-center mb-6">{t('about-clientele:testimonialsTitle')}</h3>
          <TestimonialsBlock indices={[0, 1, 2]} variant="cards" />
        </div>
      </div>
    </section>
  );
}

