'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { calculateUnitEconomics, type UnitEconomicsInput, type UnitEconomicsResult } from '@/lib/calculators/franchise/unit-economics';
import { trackCalculatorStart, trackCalculatorComplete, trackToolCompletedWithEmail } from '@/lib/analytics/events';
import { formatCurrency } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react';

const TOOL_SLUG = 'franchise/unit-economics';

export default function UnitEconomicsPage() {
  const { t } = useTranslation(['tools', 'common']);
  const [step, setStep] = useState<'form' | 'result'>('form');
  const [formData, setFormData] = useState<UnitEconomicsInput>({
    revenuePerUnit: 0, costPerUnit: 0, upfrontFranchiseFee: 0, period: 'monthly',
  });
  const [result, setResult] = useState<UnitEconomicsResult | null>(null);
  const [userInfo, setUserInfo] = useState({ email: '', name: '', companyName: '' });
  const [showUserInfoForm, setShowUserInfoForm] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCalculate = () => {
    trackCalculatorStart('franchise-unit-economics');
    setResult(calculateUnitEconomics(formData));
    setStep('result');
  };

  const handleSubmit = async () => {
    if (!result) return;
    setIsSubmitting(true);
    trackCalculatorComplete('franchise-unit-economics', result.marginPercent);
    try {
      const res = await fetch('/api/tools/submit', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ toolSlug: TOOL_SLUG, input: formData, result, userInfo: userInfo.email ? userInfo : undefined }) });
      const data = await res.json();
      if (data.success) {
        setShowUserInfoForm(false);
        trackToolCompletedWithEmail(TOOL_SLUG, result.marginPercent, userInfo.email || undefined);
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
            <h1 className="heading-h2 mb-4">{t('tools:franchise.unitEconomics.name')}</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-teal-50 rounded-lg">
                <p className="body-small text-gray-600">Margin per unit</p>
                <p className="text-xl font-bold text-teal-600">{formatCurrency(result.marginPerUnit)}</p>
              </div>
              <div className="p-4 bg-gold-50 rounded-lg">
                <p className="body-small text-gray-600">Margin %</p>
                <p className="text-xl font-bold text-gold-600">{result.marginPercent}%</p>
              </div>
              <div className="p-4 bg-gray-100 rounded-lg">
                <p className="body-small text-gray-600">Fee payback</p>
                <p className="text-xl font-bold text-gray-700">{result.paybackMonths} months</p>
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
          <h1 className="heading-h2 mb-2">{t('tools:franchise.unitEconomics.name')}</h1>
          <p className="body-default text-gray-600 mb-6">{t('tools:franchise.unitEconomics.description')}</p>
          <div className="space-y-4">
            <div>
              <label className="block font-semibold mb-2">Revenue per unit</label>
              <input type="number" className="input" value={formData.revenuePerUnit || ''} onChange={(e) => setFormData((p) => ({ ...p, revenuePerUnit: parseFloat(e.target.value) || 0 }))} placeholder="100000" />
            </div>
            <div>
              <label className="block font-semibold mb-2">Cost per unit</label>
              <input type="number" className="input" value={formData.costPerUnit || ''} onChange={(e) => setFormData((p) => ({ ...p, costPerUnit: parseFloat(e.target.value) || 0 }))} placeholder="60000" />
            </div>
            <div>
              <label className="block font-semibold mb-2">Upfront franchise fee</label>
              <input type="number" className="input" value={formData.upfrontFranchiseFee || ''} onChange={(e) => setFormData((p) => ({ ...p, upfrontFranchiseFee: parseFloat(e.target.value) || 0 }))} placeholder="500000" />
            </div>
            <div>
              <label className="block font-semibold mb-2">Revenue/cost period</label>
              <select className="input" value={formData.period} onChange={(e) => setFormData((p) => ({ ...p, period: e.target.value as 'monthly' | 'yearly' }))}>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
            <Button variant="primary" className="w-full" onClick={handleCalculate} disabled={formData.revenuePerUnit === 0}>{t('common:calculate')}</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
