'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Play, X } from 'lucide-react';
import {
  FOUNDER_EXPLAINER_SERIES,
  type ExplainerFilter,
  videoMatchesFilter,
  type FounderExplainerVideo,
} from '@/data/founder-explainers';
import { ResourcePageFooter } from '@/components/resources/resource-page-footer';
import { trackVideoPlay, trackResourceCtaClick } from '@/lib/analytics/events';
import { cn } from '@/lib/utils';

const PAGE = '/consulting/resources/founder-explainers';

const FILTER_CHIPS: { id: ExplainerFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'operations', label: 'Operations' },
  { id: 'governance', label: 'Governance' },
  { id: 'roi', label: 'ROI & Business Case' },
  { id: 'tools', label: 'Tools & Dashboards' },
];

function resolveYoutubeId(video: FounderExplainerVideo): string | null {
  const envDefault =
    typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_FOUNDER_EXPLAINER_DEFAULT_YOUTUBE_ID : undefined;
  const id = video.youtubeVideoId?.trim() || envDefault?.trim();
  return id && /^[\w-]{6,}$/.test(id) ? id : null;
}

function VideoCard({
  video,
  seriesLabel,
  onYoutubePlay,
}: {
  video: FounderExplainerVideo;
  seriesLabel: string;
  onYoutubePlay: (youtubeId: string, title: string) => void;
}) {
  const yt = resolveYoutubeId(video);
  const thumbSrc = yt ? `https://img.youtube.com/vi/${yt}/maxresdefault.jpg` : null;

  const handlePlay = () => {
    if (!yt) return;
    trackVideoPlay({
      video_id: yt,
      series: seriesLabel,
      title: video.title,
    });
    onYoutubePlay(yt, video.title);
  };

  return (
    <article className="card overflow-hidden flex flex-col h-full p-0">
      <div
        role={yt ? 'button' : undefined}
        tabIndex={yt ? 0 : undefined}
        data-video-id={yt ?? undefined}
        className={cn(
          'relative aspect-video bg-gray-200 group cursor-default',
          yt && 'cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500'
        )}
        onClick={() => handlePlay()}
        onKeyDown={(e) => {
          if (yt && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            handlePlay();
          }
        }}
      >
        {thumbSrc ? (
          // eslint-disable-next-line @next/next/no-img-element -- external YouTube thumbnail; avoids image remotePatterns
          <img src={thumbSrc} alt="" className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-navy-500/90 to-teal-600/80" aria-hidden />
        )}
        <div className="absolute top-3 right-3 rounded-md bg-black/75 text-white text-xs font-semibold px-2 py-1 z-[1]">
          {video.duration}
        </div>
        {yt ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-90 group-hover:opacity-100 transition-opacity z-[1]">
            <span className="w-16 h-16 rounded-full bg-white/95 flex items-center justify-center shadow-lg">
              <Play className="w-8 h-8 text-teal-600 ml-1" fill="currentColor" aria-hidden />
            </span>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center z-[1]">
            <p className="text-white text-sm font-medium px-4 text-center">Video coming soon</p>
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-teal-600 mb-2">{seriesLabel}</p>
        <h3 className="heading-h4 mb-2">
          <Link
            href={`/consulting/resources/founder-explainers/${video.slug}`}
            className="hover:text-teal-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded"
          >
            {video.title}
          </Link>
        </h3>
        <p className="body-small text-gray-600 line-clamp-2 mb-3 flex-1">{video.description}</p>
        <p className="text-xs text-gray-500 mb-4">{video.tagsLine}</p>
        <Link
          href={video.ctaHref}
          className="text-sm font-semibold text-teal-600 hover:underline"
          onClick={() =>
            trackResourceCtaClick({
              cta_text: video.ctaText,
              destination: video.ctaHref,
              page: PAGE,
            })
          }
        >
          {video.ctaText}
        </Link>
      </div>
    </article>
  );
}

export default function FounderExplainersPage() {
  const [filter, setFilter] = useState<ExplainerFilter>('all');
  const [lightboxYoutubeId, setLightboxYoutubeId] = useState<string | null>(null);
  const [lightboxTitle, setLightboxTitle] = useState('');

  const filteredSeries = useMemo(() => {
    return FOUNDER_EXPLAINER_SERIES.map((series) => ({
      ...series,
      videos: series.videos.filter((v) => videoMatchesFilter(v, filter)),
    })).filter((s) => s.videos.length > 0);
  }, [filter]);

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="section-padding bg-gradient-to-br from-navy-500 to-teal-600 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-hero mb-6 text-white">Founder Explainers</h1>
            <p className="body-large text-gray-100">
              Short, practical videos that break down the operations concepts every business owner needs to understand. Plain
              language. No jargon. Under 10 minutes each.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
        <div className="container-custom">
          <div className="flex flex-wrap gap-2 justify-center">
            {FILTER_CHIPS.map((chip) => (
              <button
                key={chip.id}
                type="button"
                onClick={() => setFilter(chip.id)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-semibold transition-colors',
                  filter === chip.id
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                )}
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom space-y-16">
          {filteredSeries.map((series) => (
            <div key={series.id}>
              <h2 className="heading-h2 mb-2">{series.label}</h2>
              <p className="body-large text-gray-600 mb-8 max-w-3xl">{series.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {series.videos.map((video) => (
                  <VideoCard
                    key={video.slug}
                    video={video}
                    seriesLabel={series.label}
                    onYoutubePlay={(id, title) => {
                      setLightboxYoutubeId(id);
                      setLightboxTitle(title);
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {lightboxYoutubeId ? (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Video player"
        >
          <div className="relative w-full max-w-4xl bg-black rounded-xl overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between gap-4 px-4 py-3 bg-navy-500 text-white">
              <p className="font-medium text-sm md:text-base truncate pr-8">{lightboxTitle}</p>
              <button
                type="button"
                className="flex-shrink-0 p-2 rounded-lg hover:bg-white/10"
                aria-label="Close video"
                onClick={() => setLightboxYoutubeId(null)}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="aspect-video w-full">
              <iframe
                title={lightboxTitle}
                src={`https://www.youtube-nocookie.com/embed/${lightboxYoutubeId}?autoplay=1&rel=0`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      ) : null}

      <ResourcePageFooter page={PAGE} />
    </div>
  );
}
