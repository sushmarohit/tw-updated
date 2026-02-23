'use client';

import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CheckCircle, TrendingDown } from 'lucide-react';

export default function BankingCaseStudyPage() {
  const { t } = useTranslation(['case-studies-banking', 'common']);
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="section-padding bg-gradient-to-br from-navy-500 to-teal-600 text-white">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="heading-hero mb-6 text-white">{t('case-studies-banking:title')}</h1>
            <p className="body-large text-gray-100 mb-8">
              {t('case-studies-banking:subtitle')}
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <div className="card mb-8">
            <h2 className="heading-h3 mb-4">Company Profile</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="body-small text-gray-600 mb-1">Industry</p>
                <p className="body-default font-semibold">Banking</p>
              </div>
              <div>
                <p className="body-small text-gray-600 mb-1">Revenue</p>
                <p className="body-default font-semibold">45 Cr</p>
              </div>
              <div>
                <p className="body-small text-gray-600 mb-1">Employees</p>
                <p className="body-default font-semibold">200+</p>
              </div>
            </div>
          </div>

          <div className="card mb-8">
            <h2 className="heading-h3 mb-4">Challenge</h2>
            <p className="body-large text-gray-700 mb-4">
              Process Chaos Impacting Customer Satisfaction & Compliance
            </p>
            <ul className="space-y-2">
              {[
                'High transaction error rate (15–20% of all transactions)',
                'Slow processing times (24–48 hours for standard transfers)',
                'Frequent audit findings (compliance gaps)',
                'Manual escalation bottlenecks',
                'Low employee morale (firefighting culture)',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <TrendingDown className="w-5 h-5 text-error-500 flex-shrink-0 mt-1" />
                  <p className="body-default text-gray-700">{item}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="card mb-8">
            <h2 className="heading-h3 mb-4">Approach: G2P CYCLE Methodology</h2>
            <p className="body-default text-gray-700 mb-4">
              Applied CYCLE framework over 90 days with focus on predictive operational consistency.
            </p>
            <div className="space-y-3">
              {[
                'Process mapping (value-stream analysis of transaction workflows)',
                'Error root-cause analysis (pattern identification)',
                'SOP design (standardized workflows with checkpoints)',
                'Dashboard design (real-time error tracking, SLA monitoring)',
                'Team training and pilot testing',
                'Rollout and stabilization',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0 mt-1" />
                  <p className="body-default text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card mb-8 bg-navy-500 text-white">
            <h2 className="heading-h3 mb-6 text-white">Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { metric: 'Error Rate', before: '15%', after: '2%', improvement: '86% reduction' },
                { metric: 'Processing Time', before: '24 hours', after: '4 hours', improvement: '83% faster' },
                { metric: 'SLA Compliance', before: '85%', after: '99.8%', improvement: '+14.8 points' },
                { metric: 'Audit Findings', before: '15 per audit', after: '0–1', improvement: '93% reduction' },
                { metric: 'Employee Engagement', before: 'Baseline', after: '+40%', improvement: 'Measured via pulse survey' },
                { metric: 'Cost Savings', before: 'N/A', after: '₹45L annually', improvement: 'Error rework reduction' },
              ].map((result, i) => (
                <div key={i} className="border border-navy-400 rounded-lg p-4">
                  <p className="body-small text-gray-300 mb-2">{result.metric}</p>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="body-default text-gray-400">{result.before}</span>
                    <span className="text-gold-300">→</span>
                    <span className="body-default font-semibold text-white">{result.after}</span>
                  </div>
                  <p className="body-small text-gold-300">{result.improvement}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card mb-8">
            <h2 className="heading-h3 mb-4">Timeline</h2>
            <div className="space-y-3">
              {[
                { phase: 'Week 0–2', desc: 'Assessment and SOP design' },
                { phase: 'Week 2–4', desc: 'Dashboard setup and training' },
                { phase: 'Week 4–6', desc: 'Pilot with high-volume transaction team' },
                { phase: 'Week 6–8', desc: 'Refinement and full rollout' },
                { phase: 'Week 8–12', desc: 'Stabilization and optimization' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-6">
                  <div className="w-24 flex-shrink-0">
                    <p className="font-semibold text-teal-500">{item.phase}</p>
                  </div>
                  <p className="body-default text-gray-700 flex-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card bg-teal-50 border-2 border-teal-500 mb-8">
            <blockquote className="body-large italic text-gray-700 mb-4">
              "TwelfthKey didn't just give us SOPs—they transformed our culture from firefighting to discipline. Our audit findings went to zero, and our team feels empowered for the first time."
            </blockquote>
            <p className="body-default text-gray-600">
              — Head of Operations, Bank
            </p>
          </div>

          <div className="card bg-gold-50 border-2 border-gold-300 mb-8">
            <h2 className="heading-h3 mb-4">ROI</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="body-small text-gray-600 mb-1">Investment</p>
                <p className="heading-h4 text-navy-500">₹2,99,999</p>
              </div>
              <div>
                <p className="body-small text-gray-600 mb-1">Annual Savings</p>
                <p className="heading-h4 text-teal-500">₹45L</p>
              </div>
              <div>
                <p className="body-small text-gray-600 mb-1">Payback Period</p>
                <p className="heading-h4 text-gold-300">2 months</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom text-center">
          <h2 className="heading-h2 mb-4">Apply This Approach to Your Business</h2>
          <p className="body-large text-gray-600 mb-8">
            Start with a free Operational Health Diagnostic
          </p>
          <Button variant="primary" size="lg" asChild>
            <Link href="/consulting/booking">{t('common:bookDiscoveryCall')}</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

