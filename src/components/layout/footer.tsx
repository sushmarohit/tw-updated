'use client';

import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { Linkedin, Twitter, Youtube, MessageCircle } from 'lucide-react';

const quickLinks = [
  { key: 'home', href: '/' },
  { key: 'services', href: '/consulting/services' },
  // { key: 'framework', href: '/consulting/framework' },
  // { key: 'praxio', href: '/consulting/praxio' },
  { key: 'caseStudies', href: '/consulting/case-studies' },
  { key: 'tools', href: '/consulting/tools' },
  { key: 'faq', href: '/consulting/faq' },
  { key: 'about', href: '/consulting/about' },
  { key: 'contact', href: '/consulting/contact' },
];

const services = [
  { key: 'businessOperationalAssessment', href: '/consulting/services/assessment' },
  { key: 'operationalExcellenceFoundation', href: '/consulting/services/foundation' },
  { key: 'governanceIntelligenceProgram', href: '/consulting/services/governance' },
  { key: 'analyticsVisualizationSuite', href: '/consulting/services/analytics' },
  { key: 'enterpriseOpsCommandCenter', href: '/consulting/services/enterprise' },
  { key: 'fractionalCBO', href: '/consulting/services/fractional-cbo' },
];

const legal = [
  { key: 'privacyPolicy', href: '/consulting/legal/privacy' },
  { key: 'termsOfService', href: '/consulting/legal/terms' },
  { key: 'refundPolicy', href: '/consulting/legal/refund' },
  { key: 'cookiePolicy', href: '/consulting/legal/cookies' },
  { key: 'accessibilityStatement', href: '/consulting/legal/accessibility' },
  { key: 'complianceCertifications', href: '/consulting/legal/compliance' },
  { key: 'dataProcessingAgreement', href: '/consulting/legal/dpa' },
  { key: 'disputeResolution', href: '/consulting/legal/disputes' },
];

const socialLinks = [
  { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/company/twelfthkey-consulting' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/TwelfthKeyOps' },
  { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/@twelfthkey' },
  { name: 'WhatsApp', icon: MessageCircle, href: 'https://wa.me/91XXXXXXXXXX' },
];

const trustBadgeKeys = [
  'phdBacked',
  'caseStudies',
  'costSavings',
  'moneyBack',
  'pciDss',
  'gdpr',
  'iso27001',
  'ssl',
];

export function Footer() {
  const { t } = useTranslation(['footer', 'trustBadges', 'navigation']);
  return (
    <footer className="bg-navy-500 text-white">
      {/* Trust Badges Row */}
      <div className="border-b border-navy-400">
        <div className="container-custom py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 text-center">
            {trustBadgeKeys.map((key) => (
              <div key={key} className="text-body-small">
                {t(`trustBadges:${key}`)}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-12 h-12 bg-gold-300 rounded-lg flex items-center justify-center">
                <span className="text-navy-500 font-bold text-xl">TK</span>
              </div>
              <span className="font-serif font-bold text-xl">TwelfthKey</span>
            </div>
            <p className="text-body-small text-gray-300 italic mb-4">
              "{t('footer:tagline')}"
            </p>
            <p className="text-body-small text-gray-400">
              {t('footer:proprietary')}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-semibold text-body-default mb-4">{t('footer:quickLinks')}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-body-small text-gray-300 hover:text-gold-300 transition-colors focus-visible-ring rounded px-1"
                    suppressHydrationWarning
                  >
                    {t('navigation:' + link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="font-semibold text-body-default mb-4">{t('navigation:services')}</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.key}>
                  <Link
                    href={service.href}
                    className="text-body-small text-gray-300 hover:text-gold-300 transition-colors focus-visible-ring rounded px-1"
                  >
                    {t(`navigation:${service.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Legal & Compliance */}
          <div>
            <h3 className="font-semibold text-body-default mb-4">{t('footer:legalCompliance')}</h3>
            <ul className="space-y-2">
              {legal.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="text-body-small text-gray-300 hover:text-gold-300 transition-colors focus-visible-ring rounded px-1"
                  >
                    {t(`navigation:${item.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-navy-400">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-body-small text-gray-400 text-center md:text-left">
              <p>{t('footer:copyright')}</p>
              {/* <p className="mt-1">{t('footer:poweredBy')}</p> */}
            </div>
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gold-300 transition-colors focus-visible-ring rounded-lg p-2"
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

