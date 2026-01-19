'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { calculateCostLeakage, type CostLeakageInput } from '@/lib/calculators/cost-leakage';
import { trackCalculatorStart, trackCalculatorComplete } from '@/lib/analytics/events';
import { formatCurrency } from '@/lib/utils';

export default function CostLeakagePage() {
  const { t } = useTranslation(['tools-cost-leakage', 'common']);
  const [step, setStep] = useState<'form' | 'result'>('form');
  const [formData, setFormData] = useState<CostLeakageInput>({
    monthlyRevenue: 0,
    slaBreachRate: 0,
    manualReworkRate: 0,
    processErrorRate: 0,
    averageErrorCost: 0,
  });
  const [result, setResult] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userInfo, setUserInfo] = useState({ email: '', name: '', companyName: '' });
  const [showUserInfoForm, setShowUserInfoForm] = useState(true);

  const handleChange = (field: keyof CostLeakageInput, value: number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCalculate = async () => {
    trackCalculatorStart('cost_leakage');
    const calculatedResult = calculateCostLeakage(formData);
    setResult(calculatedResult);
    setStep('result');
  };

  const handleSubmit = async () => {
    if (!result) return;
    
    setIsSubmitting(true);
    trackCalculatorComplete('cost_leakage', result.annualLeakage);

    try {
      const response = await fetch('/api/calculators/cost-leakage', {
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
        alert(t('tools-cost-leakage:resultsSaved'));
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert(t('tools-cost-leakage:failedToSave'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (step === 'result' && result) {
    return (
      <div className="min-h-screen bg-gray-50 section-padding">
        <div className="container-custom max-w-4xl">
          <div className="card mb-8">
            <h1 className="heading-h2 mb-4">{t('tools-cost-leakage:costLeakageAnalysis')}</h1>
            
            <div className="text-center mb-8 p-6 bg-navy-500 text-white rounded-lg">
              <p className="body-small text-gray-200 mb-2">{t('tools-cost-leakage:estimatedAnnualLeakage')}</p>
              <div className="text-5xl font-bold text-gold-300 mb-2">
                {formatCurrency(result.annualLeakage)}
              </div>
              <p className="body-default text-gray-200">
                {t('tools-cost-leakage:monthly')} {formatCurrency(result.monthlyLeakage)}
              </p>
            </div>

            <div className="mb-8">
              <h2 className="heading-h3 mb-4">{t('tools-cost-leakage:severity')} {result.severity}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <p className="body-small text-gray-600 mb-1">{t('tools-cost-leakage:slaBreaches')}</p>
                  <p className="heading-h4 text-teal-500">{formatCurrency(result.breakdown.slaBreaches)}</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <p className="body-small text-gray-600 mb-1">{t('tools-cost-leakage:manualRework')}</p>
                  <p className="heading-h4 text-teal-500">{formatCurrency(result.breakdown.manualRework)}</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <p className="body-small text-gray-600 mb-1">{t('tools-cost-leakage:processErrors')}</p>
                  <p className="heading-h4 text-teal-500">{formatCurrency(result.breakdown.processErrors)}</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="heading-h4 mb-4">{t('tools-cost-leakage:recommendations')}</h3>
              <ul className="space-y-2">
                {result.recommendations.map((rec: string, i: number) => (
                  <li key={i} className="body-default text-gray-700 flex items-start">
                    <span className="text-gold-300 mr-2">•</span>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>

            {showUserInfoForm && (
              <div className="border-t pt-6">
                <h3 className="heading-h4 mb-4">Get Your Detailed Report</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Name"
                    className="input"
                    value={userInfo.name}
                    onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="input"
                    value={userInfo.email}
                    onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Company"
                    className="input"
                    value={userInfo.companyName}
                    onChange={(e) => setUserInfo({ ...userInfo, companyName: e.target.value })}
                  />
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <Button variant="primary" onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Get Full Report'}
              </Button>
              <Button variant="secondary" onClick={() => setStep('form')}>
                Calculate Again
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
          <h1 className="heading-h2 mb-6">{t('tools-cost-leakage:title')}</h1>
          <p className="body-default text-gray-600 mb-8">
            {t('tools-cost-leakage:description')}
          </p>

          <div className="space-y-6">
            <div>
              <label className="block font-semibold mb-2">
                {t('tools-cost-leakage:monthlyRevenue')}
              </label>
              <input
                type="number"
                className="input"
                value={formData.monthlyRevenue || ''}
                onChange={(e) => handleChange('monthlyRevenue', parseFloat(e.target.value) || 0)}
                placeholder="1000000"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                {t('tools-cost-leakage:slaBreachRate')}
              </label>
              <input
                type="number"
                className="input"
                min="0"
                max="100"
                value={formData.slaBreachRate || ''}
                onChange={(e) => handleChange('slaBreachRate', parseFloat(e.target.value) || 0)}
                placeholder="5"
              />
              <p className="body-small text-gray-500 mt-1">Percentage of transactions that breach SLA</p>
            </div>

            <div>
              <label className="block font-semibold mb-2">
                {t('tools-cost-leakage:manualReworkRate')}
              </label>
              <input
                type="number"
                className="input"
                min="0"
                max="100"
                value={formData.manualReworkRate || ''}
                onChange={(e) => handleChange('manualReworkRate', parseFloat(e.target.value) || 0)}
                placeholder="10"
              />
              <p className="body-small text-gray-500 mt-1">Percentage of work that needs rework</p>
            </div>

            <div>
              <label className="block font-semibold mb-2">
                {t('tools-cost-leakage:processErrorRate')}
              </label>
              <input
                type="number"
                className="input"
                min="0"
                max="100"
                value={formData.processErrorRate || ''}
                onChange={(e) => handleChange('processErrorRate', parseFloat(e.target.value) || 0)}
                placeholder="3"
              />
              <p className="body-small text-gray-500 mt-1">Percentage of processes with errors</p>
            </div>

            <div>
              <label className="block font-semibold mb-2">
                {t('tools-cost-leakage:averageErrorCost')}
              </label>
              <input
                type="number"
                className="input"
                value={formData.averageErrorCost || ''}
                onChange={(e) => handleChange('averageErrorCost', parseFloat(e.target.value) || 0)}
                placeholder="5000"
              />
              <p className="body-small text-gray-500 mt-1">Average cost per error</p>
            </div>

            <Button
              variant="primary"
              onClick={handleCalculate}
              className="w-full"
              disabled={!formData.monthlyRevenue}
            >
              {t('tools-cost-leakage:calculate')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
