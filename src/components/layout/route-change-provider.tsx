'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { RouteLoadingOverlay } from '@/components/ui/route-loading-overlay';

const MIN_LOADING_MS = 1000; // 1 to 1.5 sec

type RouteChangeContextValue = {
  isNavigating: boolean;
  startNavigation: () => void;
};

const RouteChangeContext = createContext<RouteChangeContextValue | null>(null);

export function useRouteChange() {
  const ctx = useContext(RouteChangeContext);
  return ctx;
}

export function RouteChangeProvider({ children }: { children: ReactNode }) {
  const [isNavigating, setIsNavigating] = useState(false);
  const [mounted, setMounted] = useState(false);
  const minTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const startNavigation = useCallback(() => {
    setIsNavigating(true);
    if (minTimeout.current) clearTimeout(minTimeout.current);
    minTimeout.current = setTimeout(() => {
      minTimeout.current = null;
      setIsNavigating(false);
    }, MIN_LOADING_MS);
  }, []);

  useEffect(() => {
    return () => {
      if (minTimeout.current) clearTimeout(minTimeout.current);
    };
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (!anchor || !anchor.href) return;
      try {
        const url = new URL(anchor.href);
        if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;
        if (url.pathname.startsWith('/')) startNavigation();
      } catch {
        // ignore
      }
    };
    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, [startNavigation]);

  const mainEl = mounted && typeof document !== 'undefined' ? document.getElementById('main-content') : null;

  const overlay = (
    <AnimatePresence mode="wait">
      {isNavigating && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 z-10 min-h-[calc(100vh-5rem)]"
          aria-hidden
        >
          <RouteLoadingOverlay />
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <RouteChangeContext.Provider value={{ isNavigating, startNavigation }}>
      {children}
      {mainEl && createPortal(overlay, mainEl)}
    </RouteChangeContext.Provider>
  );
}
