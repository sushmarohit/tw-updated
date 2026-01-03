'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { OPERATIONAL_HEALTH_QUESTIONS, calculateHealthScore, type UserAnswer } from '@/lib/calculators/operational-health';
import { trackCalculatorStart, trackCalculatorComplete } from '@/lib/analytics/events';

export default function OperationalHealthCheckPage() {
  const { t } = useTranslation(['tools-health-check', 'common']);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userInfo, setUserInfo] = useState({ email: '', name: '', companyName: '' });

  const question = OPERATIONAL_HEALTH_QUESTIONS[currentQuestion];
  const isLastQuestion = currentQuestion === OPERATIONAL_HEALTH_QUESTIONS.length - 1;

  const handleAnswer = (score: number) => {
    const newAnswers = { ...answers, [question.id]: score };
    setAnswers(newAnswers);

    if (isLastQuestion) {
      // Calculate result
      const userAnswers: UserAnswer[] = Object.entries(newAnswers).map(([questionId, score]) => ({
        questionId,
        score,
      }));

      const calculatedResult = calculateHealthScore(userAnswers);
      setResult(calculatedResult);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    trackCalculatorComplete('operational_health', result.overallScore);

    try {
      const userAnswers: UserAnswer[] = Object.entries(answers).map(([questionId, score]) => ({
        questionId,
        score,
      }));

      const response = await fetch('/api/calculators/operational-health', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers: userAnswers,
          userInfo: userInfo.email ? userInfo : undefined,
        }),
      });

      const data = await response.json();
      if (data.success) {
        // Show success message or redirect
        alert(t('tools-health-check:resultsSaved'));
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert(t('tools-health-check:failedToSave'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (result) {
    return (
      <div className="min-h-screen bg-gray-50 section-padding">
        <div className="container-custom max-w-4xl">
          <div className="card mb-8">
            <h1 className="heading-h2 mb-4">{t('tools-health-check:yourOperationalHealthScore')}</h1>
            <div className="text-center mb-8">
              <div className="text-6xl font-bold text-gold-300 mb-2">{result.overallScore}/100</div>
              <p className="body-large text-gray-600">
                {result.overallScore >= 85 ? t('tools-health-check:excellent') :
                 result.overallScore >= 70 ? t('tools-health-check:good') :
                 result.overallScore >= 50 ? t('tools-health-check:needsImprovement') : t('tools-health-check:critical')}
              </p>
            </div>

            <div className="space-y-4 mb-8">
              {result.indexScores.map((index: any, i: number) => (
                <div key={i} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="heading-h4">{index.index}</h3>
                    <span className="text-2xl font-bold text-teal-500">{index.score}/100</span>
                  </div>
                  <p className="body-small text-gray-600">{t('tools-health-check:status')} {index.classification}</p>
                </div>
              ))}
            </div>

            <div className="mb-8">
              <h3 className="heading-h4 mb-4">{t('tools-health-check:topRecommendations')}</h3>
              <ul className="space-y-2">
                {result.recommendations.slice(0, 3).map((rec: string, i: number) => (
                  <li key={i} className="body-default text-gray-700 flex items-start">
                    <span className="text-gold-300 mr-2">•</span>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>

            {!userInfo.email && (
              <div className="border-t pt-6">
                <h3 className="heading-h4 mb-4">{t('tools-health-check:getDetailedReport')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder={t('tools-health-check:name')}
                    className="input"
                    value={userInfo.name}
                    onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                  />
                  <input
                    type="email"
                    placeholder={t('tools-health-check:email')}
                    className="input"
                    value={userInfo.email}
                    onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder={t('tools-health-check:company')}
                    className="input"
                    value={userInfo.companyName}
                    onChange={(e) => setUserInfo({ ...userInfo, companyName: e.target.value })}
                  />
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <Button variant="primary" onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? t('tools-health-check:submitting') : t('tools-health-check:getFullReport')}
              </Button>
              <Button variant="secondary" onClick={() => window.location.reload()}>
                {t('tools-health-check:startOver')}
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
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <span className="body-small text-gray-600">
                {t('tools-health-check:question')} {currentQuestion + 1} {t('tools-health-check:of')} {OPERATIONAL_HEALTH_QUESTIONS.length}
              </span>
              <div className="w-32 h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-teal-500 rounded-full transition-all"
                  style={{ width: `${((currentQuestion + 1) / OPERATIONAL_HEALTH_QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>
            <h2 className="heading-h3 mb-4">{question.text}</h2>
            <p className="body-small text-gray-500 mb-6">{t('tools-health-check:g2pIndex')} {question.g2pIndex}</p>
          </div>

          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option.score)}
                className="w-full text-left p-4 border-2 border-gray-200 rounded-lg hover:border-teal-500 hover:bg-teal-50 transition-all focus-visible-ring"
              >
                <span className="body-default text-navy-500">{option.text}</span>
              </button>
            ))}
          </div>

          {currentQuestion > 0 && (
            <Button
              variant="outline"
              onClick={() => setCurrentQuestion(currentQuestion - 1)}
              className="mt-6"
            >
              {t('tools-health-check:previous')}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

