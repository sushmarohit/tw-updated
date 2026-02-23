'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { calculateRaiseAmount, type RaiseAmountInput, type RaiseAmountResult } from '@/lib/calculators/fundraise/raise-amount';
import { trackCalculatorStart, trackCalculatorComplete, trackToolCompletedWithEmail } from '@/lib/analytics/events';
import { formatCurrency } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react';

const TOOL_SLUG = 'fundraise/raise-amount';

export default function RaiseAmountPage() {
  const { t } = useTranslation(['tools', 'common']);
  const [step, setStep] = useState<'form' | 'result'>('form');
  const [formData, setFormData] = useState<RaiseAmountInput>({ monthlyBurn: 0, targetRunwayMonths: 18, bufferPercent: 20 });
  const [result, setResult] = useState<RaiseAmountResult | null>(null);
  const [userInfo, setUserInfo] = useState({ email: '', name: '', companyName: '' });
  const [showUserInfoForm, setShowUserInfoForm] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCalculate = () => {
    trackCalculatorStart('fundraise-raise-amount');
    setResult(calculateRaiseAmount(formData));
    setStep('result');
  };

  const handleSubmit = async () => {
    if (!result) return;
    setIsSubmitting(true);
    trackCalculatorComplete('fundraise-raise-amount', result.amountToRaise);
    try {
      const res = await fetch('/api/tools/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toolSlug: TOOL_SLUG,
          input: formData,
          result,
          userInfo: userInfo.email ? userInfo : undefined,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setShowUserInfoForm(false);
        trackToolCompletedWithEmail(TOOL_SLUG, result.amountToRaise, userInfo.email || undefined);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (step === 'result' && result) {
    return (
      <div className="min-h-screen bg-gray-50 section-padding">
        <div className="container-custom max-w-2xl">
          <Link href="/consulting/tools/hub" className="inline-flex items-center gap-2 text-gray-600 hover:text-teal-600 mb-6">
            <ArrowLeft className="w-4 h-4" /> {t('common:backToTools')}
          </Link>
          <div className="card">
            <h1 className="heading-h2 mb-4">{t('tools:fundraise.raiseAmount.name')}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-teal-50 rounded-lg">
                <p className="body-small text-gray-600">Amount to raise</p>
                <p className="text-2xl font-bold text-teal-600">{formatCurrency(result.amountToRaise)}</p>
              </div>
              <div className="p-4 bg-gold-50 rounded-lg">
                <p className="body-small text-gray-600">With buffer</p>
                <p className="text-2xl font-bold text-gold-600">{formatCurrency(result.withBuffer)}</p>
              </div>
            </div>
            {showUserInfoForm && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <input type="text" placeholder={t('common:name')} className="input" value={userInfo.name} onChange={(e) => setUserInfo((u) => ({ ...u, name: e.target.value }))} />
                <input type="email" placeholder={t('common:email')} className="input" value={userInfo.email} onChange={(e) => setUserInfo((u) => ({ ...u, email: e.target.value }))} />
                <input type="text" placeholder={t('common:company')} className="input" value={userInfo.companyName} onChange={(e) => setUserInfo((u) => ({ ...u, companyName: e.target.value }))} />
              </div>
            )}
            <div className="flex gap-4">
              {showUserInfoForm && (
                <Button variant="primary" onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? t('common:loading') : t('common:saveResults')}
                </Button>
              )}
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
        <Link href="/consulting/tools/hub" className="inline-flex items-center gap-2 text-gray-600 hover:text-teal-600 mb-6">
          <ArrowLeft className="w-4 h-4" /> {t('common:backToTools')}
        </Link>
        <div className="card">
          <h1 className="heading-h2 mb-2">{t('tools:fundraise.raiseAmount.name')}</h1>
          <p className="body-default text-gray-600 mb-6">{t('tools:fundraise.raiseAmount.description')}</p>
          <div className="space-y-4">
            <div>
              <label className="block font-semibold mb-2">Monthly burn</label>
              <input type="number" className="input" value={formData.monthlyBurn || ''} onChange={(e) => setFormData((p) => ({ ...p, monthlyBurn: parseFloat(e.target.value) || 0 }))} placeholder="500000" />
            </div>
            <div>
              <label className="block font-semibold mb-2">Target runway (months)</label>
              <input type="number" className="input" value={formData.targetRunwayMonths || ''} onChange={(e) => setFormData((p) => ({ ...p, targetRunwayMonths: parseFloat(e.target.value) || 0 }))} placeholder="18" />
            </div>
            <div>
              <label className="block font-semibold mb-2">Buffer %</label>
              <input type="number" className="input" value={formData.bufferPercent ?? ''} onChange={(e) => setFormData((p) => ({ ...p, bufferPercent: parseFloat(e.target.value) || 0 }))} placeholder="20" />
            </div>
            <Button variant="primary" className="w-full" onClick={handleCalculate} disabled={!formData.monthlyBurn || !formData.targetRunwayMonths}>
              {t('common:calculate')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
