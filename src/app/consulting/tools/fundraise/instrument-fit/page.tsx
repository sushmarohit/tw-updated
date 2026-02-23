'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { calculateInstrumentFit, type InstrumentFitInput, type InstrumentFitResult } from '@/lib/calculators/fundraise/instrument-fit';
import { trackCalculatorStart, trackCalculatorComplete, trackToolCompletedWithEmail } from '@/lib/analytics/events';
import { ArrowLeft } from 'lucide-react';

const TOOL_SLUG = 'fundraise/instrument-fit';

export default function InstrumentFitPage() {
  const { t } = useTranslation(['tools', 'common']);
  const [step, setStep] = useState<'form' | 'result'>('form');
  const [formData, setFormData] = useState<InstrumentFitInput>({ annualRevenue: 0, growthRatePercent: 15, hasCollateral: false });
  const [result, setResult] = useState<InstrumentFitResult | null>(null);
  const [userInfo, setUserInfo] = useState({ email: '', name: '', companyName: '' });
  const [showUserInfoForm, setShowUserInfoForm] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCalculate = () => {
    trackCalculatorStart('fundraise-instrument-fit');
    const res = calculateInstrumentFit(formData);
    setResult(res);
    setStep('result');
  };

  const handleSubmit = async () => {
    if (!result) return;
    setIsSubmitting(true);
    trackCalculatorComplete('fundraise-instrument-fit', 0);
    try {
      const res = await fetch('/api/tools/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ toolSlug: TOOL_SLUG, input: formData, result, userInfo: userInfo.email ? userInfo : undefined }),
      });
      const data = await res.json();
      if (data.success) {
        setShowUserInfoForm(false);
        trackToolCompletedWithEmail(TOOL_SLUG, 0, userInfo.email || undefined);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (step === 'result' && result) {
    return (
      <div className="min-h-screen bg-gray-50 section-padding">
        <div className="container-custom max-w-2xl">
          <Link href="/consulting/tools/hub" className="inline-flex items-center gap-2 text-gray-600 hover:text-teal-600 mb-6"><ArrowLeft className="w-4 h-4" /> {t('common:backToTools')}</Link>
          <div className="card">
            <h1 className="heading-h2 mb-4">{t('tools:fundraise.instrumentFit.name')}</h1>
            <div className="p-6 bg-teal-50 rounded-lg mb-4">
              <p className="body-small text-gray-600">Recommendation</p>
              <p className="text-2xl font-bold text-teal-600 capitalize">{result.recommendation}</p>
              <p className="body-small text-gray-600 mt-2">Confidence: {result.confidence}</p>
            </div>
            <p className="body-default text-gray-700 mb-6">{result.reason}</p>
            {showUserInfoForm && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <input type="text" placeholder={t('common:name')} className="input" value={userInfo.name} onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })} />
                <input type="email" placeholder={t('common:email')} className="input" value={userInfo.email} onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })} />
                <input type="text" placeholder={t('common:company')} className="input" value={userInfo.companyName} onChange={(e) => setUserInfo({ ...userInfo, companyName: e.target.value })} />
              </div>
            )}
            <div className="flex gap-4">
              {showUserInfoForm && <Button variant="primary" onClick={handleSubmit} disabled={isSubmitting}>{isSubmitting ? t('common:loading') : t('common:saveResults')}</Button>}
              <Button variant="secondary" onClick={() => setStep('form')}>{t('common:calculateAgain')}</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 section-padding">
      <div className="container-custom max-w-2xl">
        <Link href="/consulting/tools/hub" className="inline-flex items-center gap-2 text-gray-600 hover:text-teal-600 mb-6"><ArrowLeft className="w-4 h-4" /> {t('common:backToTools')}</Link>
        <div className="card">
          <h1 className="heading-h2 mb-2">{t('tools:fundraise.instrumentFit.name')}</h1>
          <p className="body-default text-gray-600 mb-6">{t('tools:fundraise.instrumentFit.description')}</p>
          <div className="space-y-4">
            <div>
              <label className="block font-semibold mb-2">Annual revenue</label>
              <input type="number" className="input" value={formData.annualRevenue || ''} onChange={(e) => setFormData({ ...formData, annualRevenue: parseFloat(e.target.value) || 0 })} placeholder="0 for pre-revenue" />
            </div>
            <div>
              <label className="block font-semibold mb-2">Growth rate (%)</label>
              <input type="number" className="input" value={formData.growthRatePercent ?? ''} onChange={(e) => setFormData({ ...formData, growthRatePercent: parseFloat(e.target.value) || 0 })} placeholder="15" />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="collateral" checked={formData.hasCollateral} onChange={(e) => setFormData({ ...formData, hasCollateral: e.target.checked })} />
              <label htmlFor="collateral">Has collateral (e.g. inventory, receivables)</label>
            </div>
            <Button variant="primary" className="w-full" onClick={handleCalculate}>{t('common:calculate')}</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
