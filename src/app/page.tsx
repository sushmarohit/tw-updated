import dynamic from 'next/dynamic';
import { HeroSection } from '@/components/home/hero-section';
import { ProblemStatementSection } from '@/components/home/problem-statement-section';
import { CoreOfferingsSection } from '@/components/home/core-offerings-section';
import { SectionSkeleton } from '../components/ui/section-skeleton';

const SliderSection = dynamic(
  () => import('@/components/home/slider-section').then((m) => ({ default: m.SliderSection })),
  {
    loading: () => <SectionSkeleton className="h-32 md:h-40" />,
    ssr: true,
  }
);

const ToolsPreviewSection = dynamic(
  () => import('@/components/home/tools-preview-section').then((m) => ({ default: m.ToolsPreviewSection })),
  { loading: () => <SectionSkeleton />, ssr: true }
);

const ProofSection = dynamic(
  () => import('@/components/home/proof-section').then((m) => ({ default: m.ProofSection })),
  { loading: () => <SectionSkeleton />, ssr: true }
);

const PraxioPreviewSection = dynamic(
  () => import('@/components/home/praxio-preview-section').then((m) => ({ default: m.PraxioPreviewSection })),
  { loading: () => <SectionSkeleton />, ssr: true }
);

const CaseStudyPreviewSection = dynamic(
  () => import('@/components/home/case-study-preview-section').then((m) => ({ default: m.CaseStudyPreviewSection })),
  { loading: () => <SectionSkeleton />, ssr: true }
);

const FinalCTASection = dynamic(
  () => import('@/components/home/final-cta-section').then((m) => ({ default: m.FinalCTASection })),
  { loading: () => <SectionSkeleton className="h-64" />, ssr: true }
);

export default function HomePage() {
  return (
    <>
      <SliderSection />
      <HeroSection />
      <ProblemStatementSection />
      <CoreOfferingsSection />
      <ToolsPreviewSection />
      <ProofSection />
      <PraxioPreviewSection />
      <CaseStudyPreviewSection />
      <FinalCTASection />
    </>
  );
}
