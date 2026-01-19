'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { calculateROI, type ROIInput } from '@/lib/calculators/roi';
import { trackCalculatorStart, trackCalculatorComplete } from '@/lib/analytics/events';
import { formatCurrency } from '@/lib/utils';

export default function ROIPage() {
  const { t } = useTranslation(['tools-roi', 'common']);
  const [step, setStep] = useState<'form' | 'result'>('form');
  const [formData, setFormData] = useState<ROIInput>({
    totalCost: 0,
    monthlyBenefits: 0,
    implementationDuration: 0,
  });
  const [result, setResult] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userInfo, setUserInfo] = useState({ email: '', name: '', companyName: '' });
  const [showUserInfoForm, setShowUserInfoForm] = useState(true);

  const handleChange = (field: keyof ROIInput, value: number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCalculate = async () => {
    trackCalculatorStart('roi');
    const calculatedResult = calculateROI(formData);
    setResult(calculatedResult);
    setStep('result');
  };

  const handleSubmit = async () => {
    if (!result) return;
    
    setIsSubmitting(true);
    trackCalculatorComplete('roi', result.roi);

    try {
      const response = await fetch('/api/calculators/roi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: formData,
          userInfo: userInfo.email ? userInfo : undefined,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setShowUserInfoForm(false);
        alert(t('tools-roi:resultsSaved'));
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert(t('tools-roi:failedToSave'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (step === 'result' && result) {
    return (
      <div className="min-h-screen bg-gray-50 section-padding">
        <div className="container-custom max-w-4xl">
          <div className="card mb-8">
            <h1 className="heading-h2 mb-4">{t('tools-roi:roiAnalysis')}</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="p-6 bg-gold-50 rounded-lg">
                <p className="body-small text-gray-600 mb-2">{t('tools-roi:roi')}</p>
                <div className={`text-4xl font-bold mb-2 ${result.roi >= 0 ? 'text-gold-300' : 'text-error-500'}`}>
                  {result.roi}%
                </div>
                <p className="body-small text-gray-600">{t('tools-roi:netBenefit')} {formatCurrency(result.netBenefit)}{t('tools-roi:year')}</p>
              </div>
              <div className="p-6 bg-teal-50 rounded-lg">
                <p className="body-small text-gray-600 mb-2">{t('tools-roi:paybackPeriod')}</p>
                <div className="text-4xl font-bold text-teal-500 mb-2">
                  {result.paybackPeriod} {t('tools-roi:months')}
                </div>
                <p className="body-small text-gray-600">{t('tools-roi:breakEven')} {result.breakEvenMonth}</p>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="heading-h4 mb-4">{t('tools-roi:scenarioAnalysis')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <p className="body-small font-semibold text-gray-700 mb-2">{t('tools-roi:conservative')}</p>
                  <p className={`text-2xl font-bold ${result.scenarios.conservative.roi >= 0 ? 'text-gray-600' : 'text-error-500'}`}>
                    {result.scenarios.conservative.roi}%
                  </p>
                  <p className="body-small text-gray-500">{t('tools-roi:payback')} {result.scenarios.conservative.payback} {t('tools-roi:months')}</p>
                </div>
                <div className="border-2 border-teal-500 rounded-lg p-4 bg-teal-50">
                  <p className="body-small font-semibold text-teal-700 mb-2">{t('tools-roi:realistic')}</p>
                  <p className={`text-2xl font-bold ${result.scenarios.realistic.roi >= 0 ? 'text-teal-500' : 'text-error-500'}`}>
                    {result.scenarios.realistic.roi}%
                  </p>
                  <p className="body-small text-gray-500">{t('tools-roi:payback')} {result.scenarios.realistic.payback} {t('tools-roi:months')}</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <p className="body-small font-semibold text-gray-700 mb-2">{t('tools-roi:optimistic')}</p>
                  <p className={`text-2xl font-bold ${result.scenarios.optimistic.roi >= 0 ? 'text-gray-600' : 'text-error-500'}`}>
                    {result.scenarios.optimistic.roi}%
                  </p>
                  <p className="body-small text-gray-500">{t('tools-roi:payback')} {result.scenarios.optimistic.payback} {t('tools-roi:months')}</p>
                </div>
              </div>
            </div>

            <div className="mb-8 p-4 bg-navy-50 rounded-lg">
              <p className="body-default text-gray-700">
                <strong>Total Benefit (3 years):</strong> {formatCurrency(result.totalBenefit)}
              </p>
            </div>

            {showUserInfoForm && (
              <div className="border-t pt-6 mb-6">
                <h3 className="heading-h4 mb-4">{t('tools-roi:getDetailedReport')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder={t('tools-roi:name')}
                    className="input"
                    value={userInfo.name}
                    onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                  />
                  <input
                    type="email"
                    placeholder={t('tools-roi:email')}
                    className="input"
                    value={userInfo.email}
                    onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder={t('tools-roi:company')}
                    className="input"
                    value={userInfo.companyName}
                    onChange={(e) => setUserInfo({ ...userInfo, companyName: e.target.value })}
                  />
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <Button variant="primary" onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? t('tools-roi:submitting') : t('tools-roi:getFullReport')}
              </Button>
              <Button variant="secondary" onClick={() => setStep('form')}>
                {t('tools-roi:calculateAgain')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 section-padding">
      <div className="container-custom max-w-3xl">
        <div className="card">
          <h1 className="heading-h2 mb-6">{t('tools-roi:title')}</h1>
          <p className="body-default text-gray-600 mb-8">
            {t('tools-roi:description')}
          </p>

          <div className="space-y-6">
            <div>
              <label className="block font-semibold mb-2">
                {t('tools-roi:totalCost')}
              </label>
              <input
                type="number"
                className="input"
                value={formData.totalCost || ''}
                onChange={(e) => handleChange('totalCost', parseFloat(e.target.value) || 0)}
                placeholder="100000"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                {t('tools-roi:monthlyBenefits')}
              </label>
              <input
                type="number"
                className="input"
                value={formData.monthlyBenefits || ''}
                onChange={(e) => handleChange('monthlyBenefits', parseFloat(e.target.value) || 0)}
                placeholder="20000"
              />
              <p className="body-small text-gray-500 mt-1">Combined savings + revenue increase</p>
            </div>

            <div>
              <label className="block font-semibold mb-2">
                {t('tools-roi:implementationDuration')}
              </label>
              <input
                type="number"
                className="input"
                min="0"
                value={formData.implementationDuration || ''}
                onChange={(e) => handleChange('implementationDuration', parseInt(e.target.value) || 0)}
                placeholder="2"
              />
              <p className="body-small text-gray-500 mt-1">Time before benefits start</p>
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Annual Benefits (₹) - Optional
              </label>
              <input
                type="number"
                className="input"
                value={formData.annualBenefits || ''}
                onChange={(e) => handleChange('annualBenefits', parseFloat(e.target.value) || 0)}
                placeholder="Leave empty to calculate from monthly"
              />
            </div>

            <Button
              variant="primary"
              onClick={handleCalculate}
              className="w-full"
              disabled={!formData.totalCost || !formData.monthlyBenefits}
            >
              {t('tools-roi:calculate')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
