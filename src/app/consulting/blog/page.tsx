'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { trackFormSubmit } from '@/lib/analytics/events';

export default function BlogPage() {
  const { t } = useTranslation(['blog', 'common']);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterConsent, setNewsletterConsent] = useState(false);
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [newsletterSubmitting, setNewsletterSubmitting] = useState(false);

  // Placeholder blog posts - in production, these would come from a CMS
  const blogPosts = [
    {
      title: t('blog:posts.post1.title'),
      excerpt: t('blog:posts.post1.excerpt'),
      date: '2025-01-15',
      readTime: '5 min read',
      category: t('blog:posts.post1.category'),
    },
    {
      title: t('blog:posts.post2.title'),
      excerpt: t('blog:posts.post2.excerpt'),
      date: '2025-01-10',
      readTime: '8 min read',
      category: t('blog:posts.post2.category'),
    },
    {
      title: t('blog:posts.post3.title'),
      excerpt: t('blog:posts.post3.excerpt'),
      date: '2025-01-05',
      readTime: '6 min read',
      category: t('blog:posts.post3.category'),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="section-padding bg-gradient-to-br from-navy-500 to-teal-600 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-hero mb-6 text-white">{t('blog:title')}</h1>
            <p className="body-large text-gray-100">
              {t('blog:subtitle')}
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto space-y-8">
            {blogPosts.map((post, index) => (
              <article key={index} className="card">
                <div className="flex items-start justify-between mb-4">
                  <span className="px-3 py-1 bg-teal-100 text-teal-700 text-sm font-semibold rounded-full">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </div>
                  </div>
                </div>
                <h2 className="heading-h3 mb-3">{post.title}</h2>
                <p className="body-default text-gray-600 mb-6">{post.excerpt}</p>
                <Button variant="outline" asChild>
                  <Link href={`/consulting/blog/${post.title.toLowerCase().replace(/\s+/g, '-')}`}>
                    {t('blog:readMore')}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom max-w-xl mx-auto">
          <h2 className="heading-h2 mb-4 text-center">{t('blog:stayUpdatedTitle')}</h2>
          <p className="body-large text-gray-600 mb-6 text-center">
            {t('blog:stayUpdatedDescription')}
          </p>
          <form
            className="space-y-4"
            onSubmit={async (e) => {
              e.preventDefault();
              if (!newsletterEmail.trim() || !newsletterConsent) return;
              setNewsletterSubmitting(true);
              setNewsletterStatus('idle');
              try {
                const res = await fetch('/api/newsletter', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    email: newsletterEmail.trim(),
                    consent: true,
                    source: 'blog',
                  }),
                });
                const data = await res.json().catch(() => ({}));
                if (res.ok) {
                  setNewsletterStatus('success');
                  setNewsletterEmail('');
                  setNewsletterConsent(false);
                  trackFormSubmit('newsletter', true, { email: newsletterEmail.trim() });
                } else {
                  setNewsletterStatus('error');
                  trackFormSubmit('newsletter', false);
                }
              } catch {
                setNewsletterStatus('error');
                trackFormSubmit('newsletter', false);
              } finally {
                setNewsletterSubmitting(false);
              }
            }}
          >
            <input
              type="email"
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder={t('blog:newsletterEmailPlaceholder')}
              className="input w-full"
              aria-label="Email for newsletter"
            />
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={newsletterConsent}
                onChange={(e) => setNewsletterConsent(e.target.checked)}
                className="mt-1 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                aria-describedby="newsletter-consent-desc"
              />
              <span id="newsletter-consent-desc" className="body-small text-gray-600">
                {t('blog:newsletterConsent')}
              </span>
            </label>
            {newsletterStatus === 'success' && (
              <p className="text-sm text-green-600" role="status">
                {t('blog:newsletterSuccess')}
              </p>
            )}
            {newsletterStatus === 'error' && (
              <p className="text-sm text-red-600" role="alert">
                {t('blog:newsletterError')}
              </p>
            )}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={newsletterSubmitting || !newsletterEmail.trim() || !newsletterConsent}
              className="w-full"
            >
              {newsletterSubmitting ? t('common:submitting') : t('blog:newsletterSubmit')}
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}

