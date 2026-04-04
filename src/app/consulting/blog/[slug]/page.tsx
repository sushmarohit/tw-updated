import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { BLOG_POSTS, getBlogPostBySlug, getAllBlogSlugs } from '@/data/blog-posts';

const BASE = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  const post = getBlogPostBySlug(slug);
  if (!post) {
    return { title: 'Post' };
  }
  const url = `${BASE}/consulting/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      url,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
    alternates: { canonical: url },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    datePublished: post.date,
    description: post.excerpt,
    keywords: post.keywords.join(', '),
    publisher: { '@type': 'Organization', name: 'TwelfthKey' },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="section-padding">
        <div className="container-custom max-w-3xl">
          <Link
            href="/consulting/blog"
            className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 body-default mb-8 focus-visible-ring rounded-lg"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden />
            Back to blog
          </Link>

          <header className="mb-10">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <span className="px-3 py-1 bg-teal-100 text-teal-700 text-sm font-semibold rounded-full">
                {post.category}
              </span>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" aria-hidden />
                  {new Date(post.date).toLocaleDateString('en-IN', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" aria-hidden />
                  {post.readTimeLabel}
                </span>
              </div>
            </div>
            <h1 className="heading-hero text-navy-500 mb-4">{post.title}</h1>
            <p className="body-large text-gray-600">{post.excerpt}</p>
          </header>

          <div className="max-w-none">
            {post.sections.map((section, si) => (
              <section key={si} className="mb-8">
                {section.heading ? (
                  <h2 className="heading-h3 text-navy-500 mb-4">{section.heading}</h2>
                ) : null}
                {section.paragraphs.map((para, pi) => (
                  <p key={pi} className="body-default text-gray-700 mb-4 last:mb-0">
                    {para}
                  </p>
                ))}
                {post.crossLinks
                  ?.filter((cl) => cl.afterSectionIndex === si)
                  .map((cl) => (
                    <p key={cl.slug} className="mt-4">
                      <Link
                        href={`/consulting/blog/${cl.slug}`}
                        className="text-teal-600 font-semibold hover:text-teal-700 underline underline-offset-2"
                      >
                        {cl.label}
                      </Link>
                    </p>
                  ))}
              </section>
            ))}
          </div>

          <div className="mt-10 p-6 rounded-xl bg-navy-500 text-white">
            <p className="body-default text-gray-100 mb-4">Ready for the next step?</p>
            <Link
              href={post.endCta.href}
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg font-semibold bg-gold-300 text-white hover:bg-gold-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-500"
            >
              {post.endCta.label}
            </Link>
          </div>

          {post.relatedSlugs.length > 0 ? (
            <nav className="mt-12 pt-8 border-t border-gray-200" aria-label="Related posts">
              <h2 className="heading-h4 text-navy-500 mb-4">Related reading</h2>
              <ul className="space-y-2">
                {post.relatedSlugs.map((rs) => {
                  const related = BLOG_POSTS.find((p) => p.slug === rs);
                  if (!related) return null;
                  return (
                    <li key={rs}>
                      <Link href={`/consulting/blog/${related.slug}`} className="text-teal-600 hover:underline">
                        {related.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          ) : null}
        </div>
      </article>
    </div>
  );
}
