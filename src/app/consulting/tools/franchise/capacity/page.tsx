'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { calculateCapacity, type CapacityInput, type CapacityResult } from '@/lib/calculators/franchise/capacity';
import { trackCalculatorStart, trackCalculatorComplete, trackToolCompletedWithEmail } from '@/lib/analytics/events';
import { ArrowLeft } from 'lucide-react';

const TOOL_SLUG = 'franchise/capacity';

export default function CapacityPage() {
  const { t } = useTranslation(['tools', 'common']);
  const [step, setStep] = useState<'form' | 'result'>('form');
  const [formData, setFormData] = useState<CapacityInput>({ targetUnits: 10, monthsPerUnitLaunch: 2, teamCapacity: 1 });
  const [result, setResult] = useState<CapacityResult | null>(null);
  const [userInfo, setUserInfo] = useState({ email: '', name: '', companyName: '' });
  const [showUserInfoForm, setShowUserInfoForm] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCalculate = () => {
    trackCalculatorStart('franchise-capacity');
    setResult(calculateCapacity(formData));
    setStep('result');
  };

  const handleSubmit = async () => {
    if (!result) return;
    setIsSubmitting(true);
    trackCalculatorComplete('franchise-capacity', result.totalMonths);
    try {
      const res = await fetch('/api/tools/submit', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ toolSlug: TOOL_SLUG, input: formData, result, userInfo: userInfo.email ? userInfo : undefined }) });
      const data = await res.json();
      if (data.success) {
        setShowUserInfoForm(false);
        trackToolCompletedWithEmail(TOOL_SLUG, result.totalMonths, userInfo.email || undefined);
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
            <h1 className="heading-h2 mb-4">{t('tools:franchise.capacity.name')}</h1>
            <div className="p-6 bg-teal-50 rounded-lg mb-4">
              <p className="body-small text-gray-600">Suggested timeline</p>
              <p className="text-3xl font-bold text-teal-600">{result.suggestedTimeline}</p>
            </div>
            <p className="body-default text-gray-600 mb-6">Total: {result.totalMonths} months · Units per month: {result.unitsPerMonth}</p>
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
          <h1 className="heading-h2 mb-2">{t('tools:franchise.capacity.name')}</h1>
          <p className="body-default text-gray-600 mb-6">{t('tools:franchise.capacity.description')}</p>
          <div className="space-y-4">
            <div>
              <label className="block font-semibold mb-2">Target units to open</label>
              <input type="number" className="input" value={formData.targetUnits || ''} onChange={(e) => setFormData((p) => ({ ...p, targetUnits: parseInt(e.target.value, 10) || 0 }))} placeholder="10" />
            </div>
            <div>
              <label className="block font-semibold mb-2">Months per unit launch</label>
              <input type="number" className="input" value={formData.monthsPerUnitLaunch || ''} onChange={(e) => setFormData((p) => ({ ...p, monthsPerUnitLaunch: parseFloat(e.target.value) || 0 }))} placeholder="2" />
            </div>
            <div>
              <label className="block font-semibold mb-2">Team capacity (parallel launches)</label>
              <input type="number" className="input" value={formData.teamCapacity || ''} onChange={(e) => setFormData((p) => ({ ...p, teamCapacity: parseInt(e.target.value, 10) || 0 }))} placeholder="1" />
            </div>
            <Button variant="primary" className="w-full" onClick={handleCalculate} disabled={!formData.targetUnits || !formData.monthsPerUnitLaunch}>{t('common:calculate')}</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
