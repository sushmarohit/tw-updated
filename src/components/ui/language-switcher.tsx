'use client';

import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
];

export interface LanguageSwitcherProps {
  /** Use 'dark' when placed on a dark background (e.g. mobile menu panel) */
  variant?: 'default' | 'dark';
}

export function LanguageSwitcher({ variant = 'default' }: LanguageSwitcherProps) {
  const { i18n, ready } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Default to first language if i18n is not ready
  const currentLanguage = mounted && ready && i18n.language
    ? languages.find((lang) => lang.code === i18n.language) || languages[0]
    : languages[0];

  const changeLanguage = async (langCode: string) => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('i18nextLng', langCode);
    }
    setIsOpen(false);
    await i18n.changeLanguage(langCode);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = i18n.language;
    }
  };

  const isDark = variant === 'dark';

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-center w-10 h-10 font-semibold text-sm transition-colors focus-visible-ring rounded-lg ${
          isDark
            ? 'text-white hover:text-gold-300 hover:bg-white/10'
            : 'text-navy-500 hover:text-gold-300 hover:bg-gray-100'
        }`}
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <span>{currentLanguage.code.toUpperCase()}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />

            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-[60] overflow-hidden"
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => changeLanguage(lang.code)}
                  className={`w-full text-left px-4 py-2.5 hover:bg-gray-50 transition-colors focus-visible-ring ${
                    i18n.language === lang.code ? 'bg-teal-50 text-teal-600 font-semibold' : 'text-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-xs">{lang.code.toUpperCase()}</span>
                      <span className="text-sm">{lang.nativeName}</span>
                    </div>
                    {i18n.language === lang.code && (
                      <span className="text-teal-500">✓</span>
                    )}
                  </div>
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

