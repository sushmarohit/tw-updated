import Link from 'next/link';

export const metadata = {
  title: 'Legal Disclaimer | TwelfthKey Consulting',
  description: 'General disclaimer for information, tools, and services on the TwelfthKey Consulting website.',
};

export default function LegalDisclaimerPage() {
  return (
    <div className="min-h-screen bg-gray-50 section-padding">
      <div className="container-custom max-w-4xl">
        <div className="card">
          <h1 className="heading-h2 mb-6">Legal Disclaimer</h1>
          <p className="body-small text-gray-500 mb-8">Last updated: February 2026</p>

          <div className="space-y-6">
            <section>
              <h2 className="heading-h4 mb-3">General information</h2>
              <p className="body-default text-gray-700">
                The information on this website (including tools, calculators, guides, and case studies) is for general
                informational and educational purposes only. It does not constitute legal, financial, tax, or
                professional advice. You should not rely on it as a substitute for advice from qualified professionals
                in your jurisdiction.
              </p>
            </section>

            <section>
              <h2 className="heading-h4 mb-3">No client relationship</h2>
              <p className="body-default text-gray-700">
                Use of this website or any tools or content on it does not create a consulting, advisory, or
                client relationship with TwelfthKey Consulting or any of its affiliates. Outcomes described in case
                studies or examples are illustrative and do not guarantee similar results for your business.
              </p>
            </section>

            <section>
              <h2 className="heading-h4 mb-3">Accuracy and completeness</h2>
              <p className="body-default text-gray-700">
                We strive to keep information accurate and up to date but do not warrant that the site or any
                content is complete, current, or error-free. Calculators and diagnostic tools use simplified
                models and industry benchmarks; your actual results may vary.
              </p>
            </section>

            <section>
              <h2 className="heading-h4 mb-3">Third-party links</h2>
              <p className="body-default text-gray-700">
                This site may link to third-party websites. We are not responsible for the content or practices of
                those sites. Inclusion of a link does not imply endorsement.
              </p>
            </section>

            <section>
              <h2 className="heading-h4 mb-3">Contact</h2>
              <p className="body-default text-gray-700">
                For questions about this disclaimer or our services, please see our{' '}
                <Link href="/consulting/legal/terms" className="text-teal-600 hover:underline">Terms of Service</Link>
                {' '}and{' '}
                <Link href="/consulting/contact" className="text-teal-600 hover:underline">Contact</Link> page.
              </p>
            </section>
          </div>

          <p className="body-small text-gray-500 mt-8">
            <Link href="/consulting/legal" className="text-teal-600 hover:underline">← Back to Legal & Compliance Hub</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
