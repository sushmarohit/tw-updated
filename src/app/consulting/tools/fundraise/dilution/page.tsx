'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { calculateDilution, type DilutionInput, type DilutionResult } from '@/lib/calculators/fundraise/dilution';
import { trackCalculatorStart, trackCalculatorComplete, trackToolCompletedWithEmail } from '@/lib/analytics/events';
import { formatCurrency } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react';

const TOOL_SLUG = 'fundraise/dilution';

export default function DilutionPage() {
  const { t } = useTranslation(['tools', 'common']);
  const [step, setStep] = useState<'form' | 'result'>('form');
  const [formData, setFormData] = useState<DilutionInput>({ preMoneyValuation: 0, investmentAmount: 0 });
  const [result, setResult] = useState<DilutionResult | null>(null);
  const [userInfo, setUserInfo] = useState({ email: '', name: '', companyName: '' });
  const [showUserInfoForm, setShowUserInfoForm] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCalculate = () => {
    trackCalculatorStart('fundraise-dilution');
    const res = calculateDilution(formData);
    setResult(res);
    setStep('result');
  };

  const handleSubmit = async () => {
    if (!result) return;
    setIsSubmitting(true);
    trackCalculatorComplete('fundraise-dilution', result.dilutionPercent);
    try {
      const res = await fetch('/api/tools/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ toolSlug: TOOL_SLUG, input: formData, result, userInfo: userInfo.email ? userInfo : undefined }),
      });
      const data = await res.json();
      if (data.success) {
        setShowUserInfoForm(false);
        trackToolCompletedWithEmail(TOOL_SLUG, result.dilutionPercent, userInfo.email || undefined);
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
            <h1 className="heading-h2 mb-4">{t('tools:fundraise.dilution.name')}</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-teal-50 rounded-lg">
                <p className="body-small text-gray-600">Post-money valuation</p>
                <p className="text-xl font-bold text-teal-600">{formatCurrency(result.postMoneyValuation)}</p>
              </div>
              <div className="p-4 bg-gold-50 rounded-lg">
                <p className="body-small text-gray-600">Dilution</p>
                <p className="text-xl font-bold text-gold-600">{result.dilutionPercent}%</p>
              </div>
              <div className="p-4 bg-gray-100 rounded-lg">
                <p className="body-small text-gray-600">Founder equity</p>
                <p className="text-xl font-bold text-gray-700">{result.founderEquityPercent}%</p>
              </div>
            </div>
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
          <h1 className="heading-h2 mb-2">{t('tools:fundraise.dilution.name')}</h1>
          <p className="body-default text-gray-600 mb-6">{t('tools:fundraise.dilution.description')}</p>
          <div className="space-y-4">
            <div>
              <label className="block font-semibold mb-2">Pre-money valuation (₹)</label>
              <input type="number" className="input" value={formData.preMoneyValuation || ''} onChange={(e) => setFormData({ ...formData, preMoneyValuation: parseFloat(e.target.value) || 0 })} placeholder="20000000" />
            </div>
            <div>
              <label className="block font-semibold mb-2">Investment amount (₹)</label>
              <input type="number" className="input" value={formData.investmentAmount || ''} onChange={(e) => setFormData({ ...formData, investmentAmount: parseFloat(e.target.value) || 0 })} placeholder="5000000" />
            </div>
            <Button variant="primary" className="w-full" onClick={handleCalculate} disabled={!formData.preMoneyValuation || !formData.investmentAmount}>{t('common:calculate')}</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
