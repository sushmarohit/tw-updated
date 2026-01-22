'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { cn } from '@/lib/utils';

const navigationKeys = [
  // { key: 'home', href: '/' },
  { key: 'services', href: '/consulting/services' },
  { key: 'framework', href: '/consulting/framework' },
  { key: 'praxio', href: '/consulting/praxio' },
  { key: 'caseStudies', href: '/consulting/case-studies/hub' },
  { key: 'tools', href: '/consulting/tools/hub' },
  { key: 'resources', href: '/consulting/resources' },
  { key: 'about', href: '/consulting/about' },
  { key: 'contact', href: '/consulting/contact' },
];

export function Header() {
  const { t } = useTranslation(['navigation', 'common']);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    
    // Prevent body scroll when mobile menu is open
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full h-16 md:h-20',
        isScrolled
          ? ' bg-white/95 backdrop-blur-md shadow-md'
          : ' bg-white'
      )}
    >
      <nav className="w-full h-full flex items-center justify-between px-2 md:px-3 lg:px-6 xl:px-8 max-w-full gap-1 md:gap-2" aria-label="Main navigation">
        {/* Logo */}
        <Link
          href="/"
          className="flex gap-4 items-center space-x-2 focus-visible-ring rounded-lg p-2"
          aria-label="TwelfthKey Consulting Home"
        >
          <div className="w-16 h-10 sm:w-20 lg:w-20 xl:w-24 lg:h-10  rounded-lg flex flex-col items-center justify-center ">
            <img src='/tw_logo.jpeg' alt='logo' className=' rounded-3xl'/>
          </div>
            <div className="hidden xl:flex flex-col  ">
              <span className="text-navy-500 font-bold text-sm lg:text-xl ">TwelfthKey</span>
          <span className="font-serif font-bold text-xl text-navy-500 hidden lg:block">
            Win the Operations Game
          </span>
            </div>
        </Link>

        {/* Desktop & Tablet Navigation - Compact on tablet, full on desktop */}
        <div className="hidden md:flex items-center space-x-0.5 md:space-x-1 lg:space-x-1.5 xl:space-x-2 flex-shrink-0 overflow-x-auto scrollbar-hide max-w-[calc(100vw-200px)] lg:max-w-[calc(100vw-240px)] xl:max-w-none">
          {navigationKeys.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="text-[11px] md:text-xs lg:text-xs xl:text-sm 2xl:text-body-default text-navy-500 hover:text-gold-300 transition-colors focus-visible-ring rounded px-1 md:px-1.5 lg:px-1.5 xl:px-2 py-1 whitespace-nowrap flex-shrink-0"
              suppressHydrationWarning
            >
              {t(`navigation:${item.key}`)}
            </Link>
          ))}
        </div>

        {/* Desktop & Tablet CTAs */}
        <div className="hidden md:flex items-center space-x-1.5 md:space-x-2 lg:space-x-2 xl:space-x-3 flex-shrink-0">
          <LanguageSwitcher />
          {/* Buttons Container - Stack vertically until xl breakpoint, horizontal on xl+ */}
          <div className="flex flex-col md:flex-col xl:flex-row items-stretch xl:items-center space-y-0.5 md:space-y-0.5 xl:space-y-0 xl:space-x-2">
            <Button
              variant="secondary"
              asChild
              className="text-xs xl:text-sm px-2 md:px-2.5 xl:px-4 py-1 md:py-1 xl:py-2 whitespace-nowrap bg-teal-500 text-white hover:bg-teal-600 border-0 w-full md:w-auto xl:w-auto h-auto md:h-7 xl:h-auto"
            >
              <Link href="/consulting/booking" suppressHydrationWarning>{t('common:bookDiscoveryCall')}</Link>
            </Button>
            <Button
              variant="primary"
              asChild
              className="text-xs xl:text-sm px-2 md:px-2.5 xl:px-4 py-1 md:py-1 xl:py-2 whitespace-nowrap w-full md:w-auto xl:w-auto h-auto md:h-7 xl:h-auto"
            >
              <Link href="/consulting/tools/health-check" suppressHydrationWarning>{t('common:startFreeDiagnostic')}</Link>
            </Button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="md:hidden p-2 text-navy-500 focus-visible-ring rounded-lg"
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" aria-hidden="true" />
          ) : (
            <Menu className="w-6 h-6" aria-hidden="true" />
          )}
        </button>
      </nav>

      {/* Mobile Menu Overlay - Rendered via Portal */}
      {mounted && typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/50 z-[100] md:hidden"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-hidden="true"
              />

              {/* Menu Panel */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'tween', duration: 0.3 }}
                className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-navy-500 z-[101] md:hidden overflow-y-auto"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-serif font-bold text-2xl text-white">
                      TwelfthKey
                    </span>
                    <button
                      type="button"
                      className="p-2 text-white focus-visible-ring rounded-lg"
                      aria-label="Close menu"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <X className="w-6 h-6" aria-hidden="true" />
                    </button>
                  </div>

                  <nav className="space-y-4" aria-label="Mobile navigation">
                    {navigationKeys.map((item) => (
                      <Link
                        key={item.key}
                        href={item.href}
                        className="block text-body-default text-white hover:text-gold-300 py-2 transition-colors focus-visible-ring rounded-lg px-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                        suppressHydrationWarning
                      >
                        {t(`navigation:${item.key}`)}
                      </Link>
                    ))}
                  </nav>

                  <div className="mt-8 space-y-4">
                    <div className="px-2">
                      <LanguageSwitcher />
                    </div>
                    <Button
                      variant="secondary"
                      asChild
                      className="w-full bg-teal-500 text-white hover:bg-teal-600 border-0"
                    >
                      <Link href="/consulting/booking" suppressHydrationWarning>{t('common:bookDiscoveryCall')}</Link>
                    </Button>
                    <Button
                      variant="primary"
                      asChild
                      className="w-full"
                    >
                      <Link href="/consulting/tools/health-check" suppressHydrationWarning>{t('common:startFreeDiagnostic')}</Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </header>
  );
}

