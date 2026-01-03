'use client';

import { ReactNode, Suspense, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

interface AnalyticsProviderProps {
  children: ReactNode;
}

function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Track page views
    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
      
      // Google Analytics 4
      if (window.gtag) {
        window.gtag('config', process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID, {
          page_path: url,
        });
      }
    }
  }, [pathname, searchParams]);

  return null;
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  return (
    <>
      <Suspense fallback={null}>
        <AnalyticsTracker />
      </Suspense>
      {children}
    </>
  );
}

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'set',
      targetId: string | Date,
      config?: Record<string, any>
    ) => void;
    dataLayer?: any[];
  }
}

