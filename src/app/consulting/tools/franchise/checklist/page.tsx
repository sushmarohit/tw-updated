'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { calculateFranchiseChecklist, type FranchiseChecklistInput, type FranchiseChecklistResult } from '@/lib/calculators/franchise/checklist';
import { trackCalculatorStart, trackCalculatorComplete, trackToolCompletedWithEmail } from '@/lib/analytics/events';
import { ArrowLeft } from 'lucide-react';

const TOOL_SLUG = 'franchise/checklist';
const ITEMS: (keyof FranchiseChecklistInput)[] = ['legalAgreements', 'operationsManual', 'trainingProgram', 'siteSelectionCriteria', 'marketingKit', 'franchiseeSupport'];

export default function FranchiseChecklistPage() {
  const { t } = useTranslation(['tools', 'common']);
  const [step, setStep] = useState<'form' | 'result'>('form');
  const [formData, setFormData] = useState<FranchiseChecklistInput>({
    legalAgreements: false, operationsManual: false, trainingProgram: false, siteSelectionCriteria: false, marketingKit: false, franchiseeSupport: false,
  });
  const [result, setResult] = useState<FranchiseChecklistResult | null>(null);
  const [userInfo, setUserInfo] = useState({ email: '', name: '', companyName: '' });
  const [showUserInfoForm, setShowUserInfoForm] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleToggle = (k: keyof FranchiseChecklistInput) => setFormData((p) => ({ ...p, [k]: !p[k] }));

  const handleCalculate = () => {
    trackCalculatorStart('franchise-checklist');
    setResult(calculateFranchiseChecklist(formData));
    setStep('result');
  };

  const handleSubmit = async () => {
    if (!result) return;
    setIsSubmitting(true);
    trackCalculatorComplete('franchise-checklist', result.percentComplete);
    try {
      const res = await fetch('/api/tools/submit', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ toolSlug: TOOL_SLUG, input: formData, result, userInfo: userInfo.email ? userInfo : undefined }) });
      const data = await res.json();
      if (data.success) {
        setShowUserInfoForm(false);
        trackToolCompletedWithEmail(TOOL_SLUG, result.percentComplete, userInfo.email || undefined);
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
            <h1 className="heading-h2 mb-4">{t('tools:franchise.checklist.name')}</h1>
            <div className="p-6 bg-teal-50 rounded-lg mb-4">
              <p className="body-small text-gray-600">Checklist complete</p>
              <p className="text-4xl font-bold text-teal-600">{result.percentComplete}%</p>
              <p className="body-small text-gray-600">{result.completed} of {result.total} items</p>
            </div>
            {result.nextSteps.length > 0 && (
              <ul className="list-disc pl-6 mb-6">
                {result.nextSteps.map((s, i) => (
                  <li key={i} className="body-default text-gray-700">{s}</li>
                ))}
              </ul>
            )}
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
          <h1 className="heading-h2 mb-2">{t('tools:franchise.checklist.name')}</h1>
          <p className="body-default text-gray-600 mb-6">{t('tools:franchise.checklist.description')}</p>
          <div className="space-y-3 mb-6">
            {ITEMS.map((key) => (
              <div key={key} className="flex items-center gap-2">
                <input type="checkbox" id={key} checked={formData[key]} onChange={() => handleToggle(key)} />
                <label htmlFor={key} className="font-medium">{key.replace(/([A-Z])/g, ' $1').trim()}</label>
              </div>
            ))}
          </div>
          <Button variant="primary" className="w-full" onClick={handleCalculate}>{t('common:calculate')}</Button>
        </div>
      </div>
    </div>
  );
}
