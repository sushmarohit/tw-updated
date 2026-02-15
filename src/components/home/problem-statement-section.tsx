'use client';

import { AlertCircle, TrendingDown, EyeOff, DollarSign, Users, Flame } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const problemKeys = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6'] as const;
const icons = [AlertCircle, TrendingDown, EyeOff, DollarSign, Users, Flame];

export function ProblemStatementSection() {
  const { t } = useTranslation('home');

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <h2 className="heading-h2 text-center mb-8">
          {t('problemStatement.title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problemKeys.map((key, index) => {
            const Icon = icons[index];
            return (
              <div
                key={key}
                className="card flex items-start gap-4"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                  <Icon className="w-6 h-6 text-teal-500" aria-hidden="true" />
                </div>
                <p className="body-default text-navy-500 flex-1">{t(`problemStatement.${key}`)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

