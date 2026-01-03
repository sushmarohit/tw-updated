'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { calculateBottleneck, type BottleneckInput } from '@/lib/calculators/bottleneck-finder';
import { trackCalculatorStart, trackCalculatorComplete } from '@/lib/analytics/events';

export default function BottleneckFinderPage() {
  const { t } = useTranslation(['tools-bottleneck-finder', 'common']);
  const [step, setStep] = useState<'form' | 'result'>('form');
  const [formData, setFormData] = useState<BottleneckInput>({
    averageApprovalTime: 0,
    numberOfApprovalLayers: 0,
    decisionDelayFrequency: 0,
    escalationEffectiveness: 0,
    autonomyLevel: 0,
  });
  const [result, setResult] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userInfo, setUserInfo] = useState({ email: '', name: '', companyName: '' });

  const handleChange = (field: keyof BottleneckInput, value: number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCalculate = async () => {
    trackCalculatorStart('bottleneck_finder');
    const calculatedResult = calculateBottleneck(formData);
    setResult(calculatedResult);
    setStep('result');
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    trackCalculatorComplete('bottleneck_finder', result.bottleneckIndex);

    try {
      const response = await fetch('/api/calculators/bottleneck-finder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: formData,
          userInfo: userInfo.email ? userInfo : undefined,
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert(t('tools-bottleneck-finder:resultsSaved'));
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert(t('tools-bottleneck-finder:failedToSave'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (step === 'result' && result) {
    return (
      <div className="min-h-screen bg-gray-50 section-padding">
        <div className="container-custom max-w-4xl">
          <div className="card mb-8">
            <h1 className="heading-h2 mb-4">{t('tools-bottleneck-finder:decisionBottleneckAnalysis')}</h1>
            
            <div className="text-center mb-8 p-6 bg-navy-500 text-white rounded-lg">
              <p className="body-small text-gray-200 mb-2">{t('tools-bottleneck-finder:bottleneckIndex')}</p>
              <div className="text-5xl font-bold text-gold-300 mb-2">
                {result.bottleneckIndex}/100
              </div>
              <p className="body-default text-gray-200">
                {t('tools-bottleneck-finder:severity')} <strong>{result.severity}</strong>
              </p>
              <p className="body-small text-gray-300 mt-2">
                {t('tools-bottleneck-finder:estimatedTimeWasted')} <strong>{result.estimatedTimeWasted} {t('tools-bottleneck-finder:hoursMonth')}</strong>
              </p>
            </div>

            <div className="mb-8">
              <h3 className="heading-h4 mb-4">{t('tools-bottleneck-finder:bottleneckFactors')}</h3>
              <div className="space-y-4">
                {Object.entries(result.factors).map(([key, factor]: [string, any]) => (
                  <div key={key} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</h4>
                      <div className="flex items-center gap-3">
                        <span className="text-xl font-bold text-teal-500">{factor.score}/100</span>
                        <span className={`px-3 py-1 rounded text-sm ${
                          factor.impact === 'Critical' ? 'bg-error-100 text-error-700' :
                          factor.impact === 'Significant' ? 'bg-warning-100 text-warning-700' :
                          factor.impact === 'Moderate' ? 'bg-gray-100 text-gray-700' :
                          'bg-success-100 text-success-700'
                        }`}>
                          {factor.impact}
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-teal-500 h-2 rounded-full"
                        style={{ width: `${factor.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="heading-h4 mb-4">{t('tools-bottleneck-finder:recommendations')}</h3>
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
                <h3 className="heading-h4 mb-4">{t('tools-bottleneck-finder:getDetailedReport')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder={t('tools-bottleneck-finder:name')}
                    className="input"
                    value={userInfo.name}
                    onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                  />
                  <input
                    type="email"
                    placeholder={t('tools-bottleneck-finder:email')}
                    className="input"
                    value={userInfo.email}
                    onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder={t('tools-bottleneck-finder:company')}
                    className="input"
                    value={userInfo.companyName}
                    onChange={(e) => setUserInfo({ ...userInfo, companyName: e.target.value })}
                  />
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <Button variant="primary" onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? t('tools-bottleneck-finder:submitting') : t('tools-bottleneck-finder:getFullReport')}
              </Button>
              <Button variant="secondary" onClick={() => setStep('form')}>
                {t('tools-bottleneck-finder:calculateAgain')}
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
          <h1 className="heading-h2 mb-6">{t('tools-bottleneck-finder:title')}</h1>
          <p className="body-default text-gray-600 mb-8">
            {t('tools-bottleneck-finder:description')}
          </p>

          <div className="space-y-6">
            <div>
              <label className="block font-semibold mb-2">
                {t('tools-bottleneck-finder:averageApprovalTime')}
              </label>
              <input
                type="number"
                className="input"
                min="0"
                value={formData.averageApprovalTime || ''}
                onChange={(e) => handleChange('averageApprovalTime', parseFloat(e.target.value) || 0)}
                placeholder="24"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                {t('tools-bottleneck-finder:numberOfApprovalLayers')}
              </label>
              <input
                type="number"
                className="input"
                min="0"
                value={formData.numberOfApprovalLayers || ''}
                onChange={(e) => handleChange('numberOfApprovalLayers', parseInt(e.target.value) || 0)}
                placeholder="3"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                {t('tools-bottleneck-finder:decisionDelayFrequency')}
              </label>
              <input
                type="number"
                className="input"
                min="0"
                max="100"
                value={formData.decisionDelayFrequency || ''}
                onChange={(e) => handleChange('decisionDelayFrequency', parseFloat(e.target.value) || 0)}
                placeholder="30"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                {t('tools-bottleneck-finder:escalationEffectiveness')}
              </label>
              <input
                type="number"
                className="input"
                min="0"
                max="100"
                value={formData.escalationEffectiveness || ''}
                onChange={(e) => handleChange('escalationEffectiveness', parseFloat(e.target.value) || 0)}
                placeholder="70"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                {t('tools-bottleneck-finder:autonomyLevel')}
              </label>
              <input
                type="number"
                className="input"
                min="0"
                max="100"
                value={formData.autonomyLevel || ''}
                onChange={(e) => handleChange('autonomyLevel', parseFloat(e.target.value) || 0)}
                placeholder="60"
              />
            </div>

            <Button
              variant="primary"
              onClick={handleCalculate}
              className="w-full"
            >
              {t('tools-bottleneck-finder:findBottlenecks')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
