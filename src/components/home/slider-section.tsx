'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const slideKeys = ['slide1', 'slide2', 'slide3', 'slide4', 'slide5'] as const;

export function SliderSection() {
  const { t } = useTranslation('home');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slideKeys.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + slideKeys.length) % slideKeys.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slideKeys.length);
  };

  return (
    <section className="bg-navy-500 text-white py-6 text-center min-h-[350px] md:min-h-[400px] lg:min-h-[450px] flex items-center">
      <div className="container-custom w-full">
        <div className="relative max-w-4xl mx-auto">
          <div className="min-h-[300px] md:min-h-[350px] lg:min-h-[400px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="text-center w-full"
              >
                <h1 className="text-balance text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight animate-fade-in">
                  {t(`slider.${slideKeys[currentIndex]}`)}
                </h1>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-4 mt-4">
            <button
              onClick={goToPrevious}
              className="p-2 hover:bg-navy-400 rounded-lg transition-colors focus-visible-ring"
              aria-label={t('slider.prevAria')}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {slideKeys.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'w-8 bg-gold-300'
                      : 'w-2 bg-gray-400 hover:bg-gray-300'
                  }`}
                  aria-label={`${t('slider.goToAria')} ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={goToNext}
              className="p-2 hover:bg-navy-400 rounded-lg transition-colors focus-visible-ring"
              aria-label={t('slider.nextAria')}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

