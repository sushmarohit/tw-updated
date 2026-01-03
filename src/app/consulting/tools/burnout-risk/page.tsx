'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { calculateBurnoutRisk, type BurnoutRiskInput } from '@/lib/calculators/burnout-risk';
import { trackCalculatorStart, trackCalculatorComplete } from '@/lib/analytics/events';

export default function BurnoutRiskPage() {
  const { t } = useTranslation(['tools-burnout-risk', 'common']);
  const [step, setStep] = useState<'form' | 'result'>('form');
  const [formData, setFormData] = useState<BurnoutRiskInput>({
    averageOvertime: 0,
    deadlineMissRate: 0,
    employeeEngagement: 0,
    absenteeismRate: 0,
    workloadScore: 0,
  });
  const [result, setResult] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userInfo, setUserInfo] = useState({ email: '', name: '', companyName: '' });

  const handleChange = (field: keyof BurnoutRiskInput, value: number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCalculate = async () => {
    trackCalculatorStart('burnout_risk');
    const calculatedResult = calculateBurnoutRisk(formData);
    setResult(calculatedResult);
    setStep('result');
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    trackCalculatorComplete('burnout_risk', result.riskScore);

    try {
      const response = await fetch('/api/calculators/burnout-risk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: formData,
          userInfo: userInfo.email ? userInfo : undefined,
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert(t('tools-burnout-risk:resultsSaved'));
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert(t('tools-burnout-risk:failedToSave'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (step === 'result' && result) {
    const riskColor = {
      Low: 'text-success-500',
      Moderate: 'text-warning-500',
      High: 'text-error-500',
      Critical: 'text-error-600',
    }[result.overallRisk];

    return (
      <div className="min-h-screen bg-gray-50 section-padding">
        <div className="container-custom max-w-4xl">
          <div className="card mb-8">
            <h1 className="heading-h2 mb-4">{t('tools-burnout-risk:teamBurnoutRiskAnalysis')}</h1>
            
            <div className="text-center mb-8 p-6 bg-navy-500 text-white rounded-lg">
              <p className="body-small text-gray-200 mb-2">{t('tools-burnout-risk:overallBurnoutRisk')}</p>
              <div className={`text-5xl font-bold mb-2 ${riskColor}`}>
                {result.riskScore}/100
              </div>
              <p className="body-default text-gray-200">
                {t('tools-burnout-risk:status')} <strong>{result.overallRisk}</strong> | {t('tools-burnout-risk:urgency')} <strong>{result.urgency}</strong>
              </p>
            </div>

            <div className="mb-8">
              <h3 className="heading-h4 mb-4">{t('tools-burnout-risk:riskFactors')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(result.factors).map(([key, factor]: [string, any]) => (
                  <div key={key} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold capitalize">{key}</h4>
                      <span className={`px-2 py-1 rounded text-xs ${
                        factor.risk === 'Critical' ? 'bg-error-100 text-error-700' :
                        factor.risk === 'High' ? 'bg-error-50 text-error-600' :
                        factor.risk === 'Moderate' ? 'bg-warning-100 text-warning-700' :
                        'bg-success-100 text-success-700'
                      }`}>
                        {factor.risk}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          factor.risk === 'Critical' || factor.risk === 'High' ? 'bg-error-500' :
                          factor.risk === 'Moderate' ? 'bg-warning-500' :
                          'bg-success-500'
                        }`}
                        style={{ width: `${factor.score}%` }}
                      />
                    </div>
                    <p className="body-small text-gray-600 mt-1">Score: {factor.score}/100</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="heading-h4 mb-4">{t('tools-burnout-risk:recommendations')}</h3>
              <ul className="space-y-2">
                {result.recommendations.map((rec: string, i: number) => (
                  <li key={i} className="body-default text-gray-700 flex items-start">
                    <span className="text-gold-300 mr-2">•</span>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>

            {!userInfo.email && (
              <div className="border-t pt-6 mb-6">
                <h3 className="heading-h4 mb-4">{t('tools-burnout-risk:getDetailedReport')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder={t('tools-burnout-risk:name')}
                    className="input"
                    value={userInfo.name}
                    onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                  />
                  <input
                    type="email"
                    placeholder={t('tools-burnout-risk:email')}
                    className="input"
                    value={userInfo.email}
                    onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder={t('tools-burnout-risk:company')}
                    className="input"
                    value={userInfo.companyName}
                    onChange={(e) => setUserInfo({ ...userInfo, companyName: e.target.value })}
                  />
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <Button variant="primary" onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? t('tools-burnout-risk:submitting') : t('tools-burnout-risk:getFullReport')}
              </Button>
              <Button variant="secondary" onClick={() => setStep('form')}>
                {t('tools-burnout-risk:calculateAgain')}
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
          <h1 className="heading-h2 mb-6">{t('tools-burnout-risk:title')}</h1>
          <p className="body-default text-gray-600 mb-8">
            {t('tools-burnout-risk:description')}
          </p>

          <div className="space-y-6">
            <div>
              <label className="block font-semibold mb-2">
                {t('tools-burnout-risk:averageOvertime')}
              </label>
              <input
                type="number"
                className="input"
                min="0"
                value={formData.averageOvertime || ''}
                onChange={(e) => handleChange('averageOvertime', parseFloat(e.target.value) || 0)}
                placeholder="10"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Deadline Miss Rate (%)
              </label>
              <input
                type="number"
                className="input"
                min="0"
                max="100"
                value={formData.deadlineMissRate || ''}
                onChange={(e) => handleChange('deadlineMissRate', parseFloat(e.target.value) || 0)}
                placeholder="20"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Employee Engagement (0-100)
              </label>
              <input
                type="number"
                className="input"
                min="0"
                max="100"
                value={formData.employeeEngagement || ''}
                onChange={(e) => handleChange('employeeEngagement', parseFloat(e.target.value) || 0)}
                placeholder="70"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Absenteeism Rate (%)
              </label>
              <input
                type="number"
                className="input"
                min="0"
                max="100"
                value={formData.absenteeismRate || ''}
                onChange={(e) => handleChange('absenteeismRate', parseFloat(e.target.value) || 0)}
                placeholder="5"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Workload Score (0-100)
              </label>
              <input
                type="number"
                className="input"
                min="0"
                max="100"
                value={formData.workloadScore || ''}
                onChange={(e) => handleChange('workloadScore', parseFloat(e.target.value) || 0)}
                placeholder="60"
              />
              <p className="body-small text-gray-500 mt-1">Higher = more workload</p>
            </div>

            <Button
              variant="primary"
              onClick={handleCalculate}
              className="w-full"
            >
              {t('tools-burnout-risk:calculate')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
