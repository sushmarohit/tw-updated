'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { calculateScaleReadiness, type ScaleReadinessInput } from '@/lib/calculators/scale-readiness';
import { trackCalculatorStart, trackCalculatorComplete } from '@/lib/analytics/events';

export default function ScaleReadinessPage() {
  const { t } = useTranslation(['tools-scale-readiness', 'common']);
  const [step, setStep] = useState<'form' | 'result'>('form');
  const [formData, setFormData] = useState<ScaleReadinessInput>({
    teamReadiness: 0,
    sopMaturity: 0,
    collaborationScore: 0,
    kpiTracking: 0,
    scalabilityScore: 0,
  });
  const [result, setResult] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userInfo, setUserInfo] = useState({ email: '', name: '', companyName: '' });
  const [showUserInfoForm, setShowUserInfoForm] = useState(true);

  const handleChange = (field: keyof ScaleReadinessInput, value: number) => {
    setFormData((prev) => ({ ...prev, [field]: Math.max(0, Math.min(100, value)) }));
  };

  const handleCalculate = async () => {
    trackCalculatorStart('scale_readiness');
    const calculatedResult = calculateScaleReadiness(formData);
    setResult(calculatedResult);
    setStep('result');
  };

  const handleSubmit = async () => {
    if (!result) return;
    
    setIsSubmitting(true);
    trackCalculatorComplete('scale_readiness', result.overallScore);

    try {
      const response = await fetch('/api/calculators/scale-readiness', {
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
        alert(t('tools-scale-readiness:resultsSaved'));
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert(t('tools-scale-readiness:failedToSave'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (step === 'result' && result) {
    return (
      <div className="min-h-screen bg-gray-50 section-padding">
        <div className="container-custom max-w-4xl">
          <div className="card mb-8">
            <h1 className="heading-h2 mb-4">{t('tools-scale-readiness:scaleReadinessAnalysis')}</h1>
            
            <div className="text-center mb-8 p-6 bg-navy-500 text-white rounded-lg">
              <p className="body-small text-gray-200 mb-2">{t('tools-scale-readiness:overallReadinessScore')}</p>
              <div className="text-5xl font-bold text-gold-300 mb-2">
                {result.overallScore}/100
              </div>
              <p className="body-default text-gray-200">
                {t('tools-scale-readiness:status')} <strong>{result.readiness}</strong>
              </p>
            </div>

            {result.bottlenecks.length > 0 && (
              <div className="mb-8">
                <h3 className="heading-h4 mb-4 text-error-500">{t('tools-scale-readiness:bottlenecksIdentified')}</h3>
                <ul className="space-y-2">
                  {result.bottlenecks.map((bottleneck: string, i: number) => (
                    <li key={i} className="body-default text-gray-700 flex items-start">
                      <span className="text-error-500 mr-2">⚠</span>
                      {bottleneck}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {result.gaps.length > 0 && (
              <div className="mb-8">
                <h3 className="heading-h4 mb-4">{t('tools-scale-readiness:improvementGaps')}</h3>
                <div className="space-y-4">
                  {result.gaps.map((gap: any, i: number) => (
                    <div key={i} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold">{gap.area}</h4>
                        <span className={`px-3 py-1 rounded text-sm ${
                          gap.priority === 'High' ? 'bg-error-100 text-error-700' :
                          gap.priority === 'Medium' ? 'bg-warning-100 text-warning-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {gap.priority} {t('tools-scale-readiness:priority')}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="body-small text-gray-600">Current</p>
                          <p className="text-xl font-bold text-gray-700">{gap.currentScore}/100</p>
                        </div>
                        <div className="flex-1">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-teal-500 h-2 rounded-full"
                              style={{ width: `${gap.currentScore}%` }}
                            />
                          </div>
                        </div>
                        <div>
                          <p className="body-small text-gray-600">Target</p>
                          <p className="text-xl font-bold text-teal-500">{gap.targetScore}/100</p>
                        </div>
                      </div>
                      <p className="body-small text-gray-600 mt-2">{gap.action}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-8">
              <h3 className="heading-h4 mb-4">{t('tools-scale-readiness:recommendations')}</h3>
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
              <div className="border-t pt-6 mb-6">
                <h3 className="heading-h4 mb-4">{t('tools-scale-readiness:getDetailedReport')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder={t('tools-scale-readiness:name')}
                    className="input"
                    value={userInfo.name}
                    onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                  />
                  <input
                    type="email"
                    placeholder={t('tools-scale-readiness:email')}
                    className="input"
                    value={userInfo.email}
                    onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder={t('tools-scale-readiness:company')}
                    className="input"
                    value={userInfo.companyName}
                    onChange={(e) => setUserInfo({ ...userInfo, companyName: e.target.value })}
                  />
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <Button variant="primary" onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? t('tools-scale-readiness:submitting') : t('tools-scale-readiness:getFullReport')}
              </Button>
              <Button variant="secondary" onClick={() => setStep('form')}>
                {t('tools-scale-readiness:calculateAgain')}
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
          <h1 className="heading-h2 mb-6">{t('tools-scale-readiness:title')}</h1>
          <p className="body-default text-gray-600 mb-8">
            {t('tools-scale-readiness:description')}
          </p>

          <div className="space-y-6">
            {[
              { key: 'teamReadiness', label: t('tools-scale-readiness:teamReadiness'), desc: 'Capacity and skills of your team (0-100)' },
              { key: 'sopMaturity', label: t('tools-scale-readiness:sopMaturity'), desc: 'How well-documented and standardized your processes are (0-100)' },
              { key: 'collaborationScore', label: t('tools-scale-readiness:collaborationScore'), desc: 'Cross-functional collaboration effectiveness (0-100)' },
              { key: 'kpiTracking', label: t('tools-scale-readiness:kpiTracking'), desc: 'How well you track and monitor performance metrics (0-100)' },
              { key: 'scalabilityScore', label: t('tools-scale-readiness:scalabilityScore'), desc: 'System and infrastructure scalability (0-100)' },
            ].map((field) => (
              <div key={field.key}>
                <label className="block font-semibold mb-2">
                  {field.label}
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  className="w-full"
                  value={formData[field.key as keyof ScaleReadinessInput]}
                  onChange={(e) => handleChange(field.key as keyof ScaleReadinessInput, parseInt(e.target.value))}
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="body-small text-gray-500">{field.desc}</span>
                  <span className="font-bold text-teal-500">{formData[field.key as keyof ScaleReadinessInput]}/100</span>
                </div>
              </div>
            ))}

            <Button
              variant="primary"
              onClick={handleCalculate}
              className="w-full"
            >
              {t('tools-scale-readiness:calculate')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
