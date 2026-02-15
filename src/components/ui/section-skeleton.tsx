import { cn } from '@/lib/utils';

export function SectionSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'w-full animate-pulse rounded-xl bg-gray-100 overflow-hidden relative',
        className
      )}
      aria-hidden
    >
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer-slide" />
    </div>
  );
}
