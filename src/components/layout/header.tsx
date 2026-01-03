'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { cn } from '@/lib/utils';

const navigationKeys = [
  { key: 'home', href: '/' },
  { key: 'services', href: '/consulting/services' },
  { key: 'framework', href: '/consulting/framework' },
  { key: 'praxio', href: '/consulting/praxio' },
  { key: 'caseStudies', href: '/consulting/case-studies' },
  { key: 'tools', href: '/consulting/tools' },
  { key: 'resources', href: '/consulting/resources' },
  { key: 'about', href: '/consulting/about' },
  { key: 'contact', href: '/consulting/contact' },
];

export function Header() {
  const { t } = useTranslation(['navigation', 'common']);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
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
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full',
        isScrolled
          ? 'h-16 bg-white/95 backdrop-blur-md shadow-md'
          : 'h-20 bg-white'
      )}
    >
      <nav className="w-full h-full flex items-center justify-between" aria-label="Main navigation">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center space-x-2 focus-visible-ring rounded-lg p-2"
          aria-label="TwelfthKey Consulting Home"
        >
          <div className="w-12 h-12 bg-navy-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">TK</span>
          </div>
          {/* <span className="font-serif font-bold text-xl text-navy-500 hidden sm:block">
            TwelfthKey
          </span> */}
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          {navigationKeys.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="text-body-default text-navy-500 hover:text-gold-300 transition-colors focus-visible-ring rounded-lg px-2 py-1"
              suppressHydrationWarning
            >
              {t(`navigation:${item.key}`)}
            </Link>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center space-x-4">
          <LanguageSwitcher />
          <Button
            variant="secondary"
            asChild
            className="text-sm px-4 py-2 whitespace-nowrap"
          >
            <Link href="/consulting/booking" suppressHydrationWarning>{t('common:bookDiscoveryCall')}</Link>
          </Button>
          <Button
            variant="primary"
            asChild
            className="text-sm px-4 py-2 whitespace-nowrap"
          >
            <Link href="/consulting/tools/health-check" suppressHydrationWarning>{t('common:startFreeDiagnostic')}</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="lg:hidden p-2 text-navy-500 focus-visible-ring rounded-lg z-[102] relative"
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

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 z-[100] lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-navy-500 z-[101] lg:hidden overflow-y-auto"
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
                    className="w-full"
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
      </AnimatePresence>
    </header>
  );
}

