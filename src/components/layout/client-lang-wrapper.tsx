'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const STORAGE_KEY = 'i18nextLng';
const SUPPORTED = ['en', 'hi'];

function getDetectedLanguage(): string {
  if (typeof window === 'undefined') return 'en';
  const stored = window.localStorage?.getItem(STORAGE_KEY);
  if (stored && SUPPORTED.includes(stored)) return stored;
  const nav = navigator.language?.toLowerCase();
  if (nav?.startsWith('hi')) return 'hi';
  return 'en';
}

export function ClientLangWrapper({ children }: { children: React.ReactNode }) {
  const { i18n, ready } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Apply detected language after mount so first paint stays en (no hydration mismatch)
  useEffect(() => {
    if (!mounted || !ready) return;
    const lng = getDetectedLanguage();
    if (lng !== i18n.language) {
      i18n.changeLanguage(lng);
    }
  }, [mounted, ready]); // eslint-disable-line react-hooks/exhaustive-deps -- run once when mounted and ready

  useEffect(() => {
    if (mounted && ready && typeof document !== 'undefined' && i18n.language) {
      document.documentElement.lang = i18n.language;
    }
  }, [i18n.language, mounted, ready]);

  return <>{children}</>;
}

