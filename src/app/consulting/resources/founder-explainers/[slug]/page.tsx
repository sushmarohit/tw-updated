import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { getFounderExplainerBySlug, getAllFounderExplainerSlugs } from '@/data/founder-explainers';

const BASE = process.env.NEXT_PUBLIC_APP_URL || 'https://twelfthkey.com';

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return getAllFounderExplainerSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const video = getFounderExplainerBySlug(params.slug);
  if (!video) return { title: 'Video | TwelfthKey' };
  return {
    title: `${video.title} | Founder Explainers | TwelfthKey`,
    description: video.description.slice(0, 155),
    alternates: {
      canonical: `${BASE}/consulting/resources/founder-explainers/${video.slug}`,
    },
  };
}

function resolveYoutubeId(youtubeVideoId: string): string | null {
  const fallback = process.env.NEXT_PUBLIC_FOUNDER_EXPLAINER_DEFAULT_YOUTUBE_ID?.trim();
  const id = youtubeVideoId?.trim() || fallback;
  return id && /^[\w-]{6,}$/.test(id) ? id : null;
}

export default function FounderExplainerVideoPage({ params }: Props) {
  const video = getFounderExplainerBySlug(params.slug);
  if (!video) notFound();

  const yt = resolveYoutubeId(video.youtubeVideoId);

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="section-padding bg-gradient-to-br from-navy-500 to-teal-600 text-white">
        <div className="container-custom max-w-4xl">
          <p className="text-sm font-semibold text-teal-100 mb-2">{video.episodeCode}</p>
          <h1 className="heading-hero text-white mb-4">{video.title}</h1>
          <p className="body-large text-gray-100">{video.tagsLine}</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          {yt ? (
            <div className="aspect-video w-full rounded-xl overflow-hidden shadow-card mb-8 bg-black">
              <iframe
                title={video.title}
                src={`https://www.youtube-nocookie.com/embed/${yt}?rel=0`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="rounded-xl bg-gray-200 aspect-video flex items-center justify-center mb-8">
              <p className="text-gray-600 font-medium">Video coming soon</p>
            </div>
          )}

          <p className="body-large text-gray-700 mb-8">{video.description}</p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="primary" asChild>
              <Link href={video.ctaHref}>{video.ctaText}</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/consulting/resources/founder-explainers">All Founder Explainers</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
