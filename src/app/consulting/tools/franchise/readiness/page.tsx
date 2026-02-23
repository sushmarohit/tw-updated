'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { calculateFranchiseReadiness, type FranchiseReadinessInput, type FranchiseReadinessResult } from '@/lib/calculators/franchise/readiness';
import { trackCalculatorStart, trackCalculatorComplete, trackToolCompletedWithEmail } from '@/lib/analytics/events';
import { ArrowLeft } from 'lucide-react';

const TOOL_SLUG = 'franchise/readiness';
const DIMS: (keyof FranchiseReadinessInput)[] = ['brandClarity', 'operationsDocumented', 'unitEconomicsProven', 'legalCompliance', 'supportCapacity'];

export default function FranchiseReadinessPage() {
  const { t } = useTranslation(['tools', 'common']);
  const [step, setStep] = useState<'form' | 'result'>('form');
  const [formData, setFormData] = useState<FranchiseReadinessInput>({
    brandClarity: 50, operationsDocumented: 50, unitEconomicsProven: 50, legalCompliance: 50, supportCapacity: 50,
  });
  const [result, setResult] = useState<FranchiseReadinessResult | null>(null);
  const [userInfo, setUserInfo] = useState({ email: '', name: '', companyName: '' });
  const [showUserInfoForm, setShowUserInfoForm] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (k: keyof FranchiseReadinessInput, v: number) => setFormData((p) => ({ ...p, [k]: v }));

  const handleCalculate = () => {
    trackCalculatorStart('franchise-readiness');
    setResult(calculateFranchiseReadiness(formData));
    setStep('result');
  };

  const handleSubmit = async () => {
    if (!result) return;
    setIsSubmitting(true);
    trackCalculatorComplete('franchise-readiness', result.overallScore);
    try {
      const res = await fetch('/api/tools/submit', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ toolSlug: TOOL_SLUG, input: formData, result, userInfo: userInfo.email ? userInfo : undefined }) });
      const data = await res.json();
      if (data.success) {
        setShowUserInfoForm(false);
        trackToolCompletedWithEmail(TOOL_SLUG, result.overallScore, userInfo.email || undefined);
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
            <h1 className="heading-h2 mb-4">{t('tools:franchise.readiness.name')}</h1>
            <div className="p-6 bg-teal-50 rounded-lg mb-6">
              <p className="body-small text-gray-600">Score</p>
              <p className="text-4xl font-bold text-teal-600">{result.overallScore}/100 — Grade {result.grade}</p>
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
          <h1 className="heading-h2 mb-2">{t('tools:franchise.readiness.name')}</h1>
          <p className="body-default text-gray-600 mb-6">{t('tools:franchise.readiness.description')}</p>
          <div className="space-y-4">
            {DIMS.map((key) => (
              <div key={key}>
                <label className="block font-semibold mb-2">{key.replace(/([A-Z])/g, ' $1').trim()}</label>
                <input type="range" min="0" max="100" className="w-full" value={formData[key]} onChange={(e) => handleChange(key, parseInt(e.target.value, 10))} />
                <span className="body-small text-gray-500">{formData[key]}%</span>
              </div>
            ))}
            <Button variant="primary" className="w-full" onClick={handleCalculate}>{t('common:calculate')}</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
