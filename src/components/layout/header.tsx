'use client';

import { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { cn } from '@/lib/utils';
import { serviceCategories, serviceCategorySlugToKey } from '@/lib/services-catalog';
import { caseStudyTabs, caseStudyTabKeyToCatalogKey, type CaseStudyTabKey } from '@/lib/case-studies-catalog';

const navigationKeys = [
  { key: 'services', href: '/consulting/services' },
  { key: 'caseStudies', href: '/consulting/case-studies/hub' },
  { key: 'tools', href: '/consulting/tools/hub' },
  { key: 'resources', href: '/consulting/resources' },
  { key: 'faq', href: '/consulting/faq' },
  { key: 'about', href: '/consulting/about' },
  { key: 'contact', href: '/consulting/contact' },
];

export function Header() {
  const { t } = useTranslation(['navigation', 'common', 'services-catalog', 'case-studies-catalog']);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false);
  const [activeServicesCategory, setActiveServicesCategory] = useState(serviceCategories[0]?.slug ?? '');
  const [isCaseStudiesMenuOpen, setIsCaseStudiesMenuOpen] = useState(false);
  const [activeCaseStudiesTab, setActiveCaseStudiesTab] = useState<CaseStudyTabKey>('process-excellence-solutions');
  const [mounted, setMounted] = useState(false);

  const translatedServiceCategories = useMemo(
    () =>
      serviceCategories.map((cat) => {
        const key = serviceCategorySlugToKey[cat.slug];
        if (!key) return cat;
        return {
          ...cat,
          title: t('services-catalog:' + key + '.title'),
          description: t('services-catalog:' + key + '.description'),
          primaryCta: { ...cat.primaryCta, title: t('services-catalog:' + key + '.primaryCta') },
          secondaryCta: { ...cat.secondaryCta, title: t('services-catalog:' + key + '.secondaryCta') },
          items: cat.items.map((item, i) => ({
            ...item,
            title: t('services-catalog:' + key + '.item' + (i + 1)),
          })),
        };
      }),
    [t]
  );

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
            <img src='/tw_logo_no_bg.webp' alt='logo' className=' rounded-3xl'/>
          </div>
            <div className="flex flex-col">
              <span className="text-navy-500 font-bold text-sm lg:text-xl">TwelfthKey</span>
              <span className="font-serif font-bold text-xl text-navy-500 hidden lg:block">
                Win the Operations Game
              </span>
            </div>
        </Link>

        {/* Desktop & Tablet Navigation - Compact on tablet, full on desktop */}
        <div className="hidden md:flex items-center space-x-0.5 md:space-x-1 lg:space-x-1.5 xl:space-x-2 flex-shrink-0">
          {navigationKeys.map((item) => {
            if (item.key === 'services') {
              if (!serviceCategories.length) {
                return null;
              }

              const activeCategory =
                translatedServiceCategories.find((category) => category.slug === activeServicesCategory) ?? translatedServiceCategories[0];

              return (
                <div
                  key={item.key}
                  className="relative flex-shrink-0"
                  onMouseEnter={() => {
                    setIsServicesMenuOpen(true);
                    if (!activeServicesCategory && serviceCategories[0]) {
                      setActiveServicesCategory(serviceCategories[0].slug);
                    }
                  }}
                  onMouseLeave={() => setIsServicesMenuOpen(false)}
                >
                  <Link
                    href={item.href}
                    className="text-[11px] md:text-xs lg:text-xs xl:text-sm 2xl:text-body-default text-navy-500 hover:text-gold-300 transition-colors focus-visible-ring rounded px-1 md:px-1.5 lg:px-1.5 xl:px-2 py-1 whitespace-nowrap block"
                    suppressHydrationWarning
                  >
                    {t(`navigation:${item.key}`)}
                  </Link>

                  <AnimatePresence>
                    {isServicesMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.16 }}
                        className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-[min(94vw,980px)] rounded-2xl bg-white border border-gray-200 shadow-2xl p-5 z-[120]"
                      >
                        <div className="grid grid-cols-12 gap-5">
                          <div className="col-span-5 space-y-3 border-r border-gray-100 pr-4">
                            {translatedServiceCategories.map((category) => (
                              <div
                                key={category.slug}
                                onMouseEnter={() => setActiveServicesCategory(category.slug)}
                                className={cn(
                                  'rounded-xl border p-3 transition-colors',
                                  activeCategory.slug === category.slug
                                    ? 'border-teal-200 bg-teal-50'
                                    : 'border-gray-100 bg-white hover:bg-gray-50'
                                )}
                              >
                                <Link
                                  href={`/consulting/services/${category.slug}`}
                                  className="block focus-visible-ring rounded"
                                >
                                  <p className="text-sm font-semibold text-navy-500">{category.title}</p>
                                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">{category.description}</p>
                                </Link>
                                <div className="mt-3 flex flex-wrap gap-2">
                                  <Link
                                    href={category.primaryCta.href}
                                    className="text-[11px] px-2 py-1 rounded-md bg-gold-300 text-white hover:bg-gold-400 transition-colors"
                                  >
                                    {category.primaryCta.title}
                                  </Link>
                                  <Link
                                    href={category.secondaryCta.href}
                                    className="text-[11px] px-2 py-1 rounded-md border border-teal-500 text-teal-600 hover:bg-teal-50 transition-colors"
                                  >
                                    {category.secondaryCta.title}
                                  </Link>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="col-span-7">
                            <p className="text-xs uppercase tracking-wide text-gray-500 mb-3" suppressHydrationWarning>{t('services-catalog:subServices')}</p>
                            <div className="grid grid-cols-1 gap-2">
                              {activeCategory.items.map((subItem) => (
                                <Link
                                  key={subItem.href}
                                  href={subItem.href}
                                  className="rounded-lg border border-gray-100 p-3 text-sm text-navy-500 hover:bg-gray-50 hover:border-teal-200 transition-colors"
                                >
                                  {subItem.title}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            if (item.key === 'caseStudies') {
              const activeTab = caseStudyTabs.find((tab) => tab.key === activeCaseStudiesTab) ?? caseStudyTabs[0];
              const topCards = activeTab.cards.slice(0, 3);

              return (
                <div
                  key={item.key}
                  className="relative flex-shrink-0"
                  onMouseEnter={() => setIsCaseStudiesMenuOpen(true)}
                  onMouseLeave={() => setIsCaseStudiesMenuOpen(false)}
                >
                  <Link
                    href={item.href}
                    className="text-[11px] md:text-xs lg:text-xs xl:text-sm 2xl:text-body-default text-navy-500 hover:text-gold-300 transition-colors focus-visible-ring rounded px-1 md:px-1.5 lg:px-1.5 xl:px-2 py-1 whitespace-nowrap block"
                    suppressHydrationWarning
                  >
                    {t(`navigation:${item.key}`)}
                  </Link>

                  <AnimatePresence>
                    {isCaseStudiesMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.16 }}
                        className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-[min(94vw,960px)] max-h-[min(85vh,520px)] flex flex-col rounded-2xl bg-white border border-gray-200 shadow-2xl z-[120] overflow-hidden"
                      >
                        <div className="flex flex-wrap gap-2 p-5 pb-3 flex-shrink-0">
                          {caseStudyTabs.map((tab) => {
                            const catalogKey = caseStudyTabKeyToCatalogKey[tab.key];
                            return (
                              <button
                                key={tab.key}
                                type="button"
                                onMouseEnter={() => setActiveCaseStudiesTab(tab.key)}
                                className={cn(
                                  'px-3 py-1.5 rounded-full border text-xs font-semibold transition-colors',
                                  tab.key === activeTab.key
                                    ? 'bg-teal-500 text-white border-teal-500'
                                    : 'bg-white text-navy-500 border-gray-200 hover:border-teal-300'
                                )}
                                suppressHydrationWarning
                              >
                                {t('case-studies-catalog:' + catalogKey + '.label')}
                              </button>
                            );
                          })}
                        </div>

                        <div className="px-5 pb-5 pt-1 overflow-y-auto flex-1 min-h-0">
                        {topCards.length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pr-20 pb-1 items-stretch">
                            {topCards.map((card) => (
                              <Link
                                key={card.slug}
                                href={`/consulting/case-studies/${card.slug}`}
                                className="rounded-xl border border-gray-100 p-3.5 hover:bg-gray-50 hover:border-teal-200 transition-colors min-h-[10rem] flex flex-col"
                              >
                                <p className="text-xs text-teal-700 font-semibold mb-1.5" suppressHydrationWarning>{t('case-studies-catalog:cards.' + card.slug + '.industryTag')}</p>
                                <p className="text-sm text-navy-500 font-semibold mb-1.5 line-clamp-2 leading-snug" suppressHydrationWarning>{t('case-studies-catalog:cards.' + card.slug + '.title')}</p>
                                <p className="text-xs text-gray-600 leading-relaxed mt-auto" suppressHydrationWarning>{t('case-studies-catalog:cards.' + card.slug + '.outcome')}</p>
                              </Link>
                            ))}
                          </div>
                        ) : (
                          <div className="rounded-xl border border-dashed border-gray-300 p-4 text-sm text-gray-600" suppressHydrationWarning>
                            {t('case-studies-catalog:franchise.comingSoon')}
                          </div>
                        )}

                        <div className="mt-4 flex-shrink-0">
                          <Link
                            href={`/consulting/case-studies/hub?tab=${activeTab.key}`}
                            className="text-sm font-semibold text-teal-600 hover:text-teal-700"
                            suppressHydrationWarning
                          >
                            {t('case-studies-catalog:viewAll')}
                          </Link>
                        </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <Link
                key={item.key}
                href={item.href}
                className="text-[11px] md:text-xs lg:text-xs xl:text-sm 2xl:text-body-default text-navy-500 hover:text-gold-300 transition-colors focus-visible-ring rounded px-1 md:px-1.5 lg:px-1.5 xl:px-2 py-1 whitespace-nowrap flex-shrink-0"
                suppressHydrationWarning
              >
                {t(`navigation:${item.key}`)}
              </Link>
            );
          })}
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

        {/* Mobile: Language switcher + Menu button */}
        <div className="flex md:hidden items-center gap-0.5">
          <LanguageSwitcher />
          <button
            type="button"
            className="p-2 text-navy-500 focus-visible-ring rounded-lg"
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
        </div>
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
                      <LanguageSwitcher variant="dark" />
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

