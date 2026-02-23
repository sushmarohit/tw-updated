import Link from 'next/link';
import { FileText, Shield, Lock, Cookie, Eye, CheckCircle, FileCheck, Scale, AlertTriangle } from 'lucide-react';

const legalPages = [
  {
    icon: AlertTriangle,
    name: 'Legal Disclaimer',
    desc: 'General disclaimer for information and tools on this site',
    href: '/consulting/legal/disclaimer',
  },
  {
    icon: Lock,
    name: 'Privacy Policy',
    desc: 'How we collect, use, and protect your data',
    href: '/consulting/legal/privacy',
  },
  {
    icon: FileText,
    name: 'Terms of Service',
    desc: 'Service descriptions, deliverables, engagement terms',
    href: '/consulting/legal/terms',
  },
  {
    icon: CheckCircle,
    name: 'Refund Policy',
    desc: 'Our refund and cancellation policy',
    href: '/consulting/legal/refund',
  },
  {
    icon: Cookie,
    name: 'Cookie Policy',
    desc: 'What cookies we use and why',
    href: '/consulting/legal/cookies',
  },
  {
    icon: Eye,
    name: 'Accessibility Statement',
    desc: 'Our commitment to accessibility',
    href: '/consulting/legal/accessibility',
  },
  {
    icon: Shield,
    name: 'Compliance & Certifications',
    desc: 'PCI-DSS, GDPR, ISO 27001 compliance',
    href: '/consulting/legal/compliance',
  },
  {
    icon: FileCheck,
    name: 'Data Processing Agreement',
    desc: 'Data processing terms and conditions',
    href: '/consulting/legal/dpa',
  },
  {
    icon: Scale,
    name: 'Dispute Resolution',
    desc: 'How we handle disputes',
    href: '/consulting/legal/disputes',
  },
];

export default function LegalHubPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="section-padding bg-gradient-to-br from-navy-500 to-teal-600 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-hero mb-6 text-white">Legal & Compliance Hub</h1>
            <p className="body-large text-gray-100">
              Transparency, trust, and compliance at the core of everything we do
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {legalPages.map((page, index) => {
              const Icon = page.icon;
              return (
                <Link key={index} href={page.href} className="card hover:shadow-card-hover transition-all">
                  <Icon className="w-10 h-10 text-teal-500 mb-4" />
                  <h3 className="heading-h4 mb-2">{page.name}</h3>
                  <p className="body-small text-gray-600">{page.desc}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="card bg-navy-500 text-white">
            <h2 className="heading-h2 mb-6 text-white">Trust & Compliance</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                'PCI-DSS Compliant',
                'GDPR Compliant',
                'ISO 27001 Ready',
                'SSL Secure',
              ].map((badge, i) => (
                <div key={i} className="text-center">
                  <CheckCircle className="w-8 h-8 text-gold-300 mx-auto mb-2" />
                  <p className="body-small text-gray-200">{badge}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
