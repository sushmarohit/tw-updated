'use client';

import { useTranslation } from 'react-i18next';


export function CalculatorExplainer() {
  const { t } = useTranslation('calculator-explainer');
  return (
    <div className="mb-8 p-6 rounded-xl bg-gray-50 border border-gray-200 space-y-4">
      <h2 className="heading-h4 text-navy-500 mb-4">{t('whatThisToolHelps')}</h2>
      <p className="body-default text-gray-700">{t('whatThisToolHelpsDesc')}</p>

      <h3 className="font-semibold text-navy-600 mt-4">{t('whyWeAsk')}</h3>
      <p className="body-default text-gray-700">{t('whyWeAskDesc')}</p>

      <h3 className="font-semibold text-navy-600 mt-4">{t('howToAnswer')}</h3>
      <p className="body-default text-gray-700">{t('howToAnswerDesc')}</p>

      <div className="mt-4 p-4 rounded-lg bg-amber-50 border border-amber-200">
        <p className="font-semibold text-amber-900 mb-1">{t('importantNote')}</p>
        <p className="body-small text-amber-800">{t('importantNoteDesc')}</p>
      </div>
    </div>
  );
}
