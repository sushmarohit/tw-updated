'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const SPLASH_STORAGE_KEY = 'twelfthkey_splash_seen';
const SPLASH_DURATION_MS = 2500;

export function SplashScreen() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return;

    const alreadySeen = sessionStorage.getItem(SPLASH_STORAGE_KEY);
    if (alreadySeen) {
      setVisible(false);
      return;
    }

    setVisible(true);
    const timer = setTimeout(() => {
      sessionStorage.setItem(SPLASH_STORAGE_KEY, '1');
      setVisible(false);
    }, SPLASH_DURATION_MS);

    return () => clearTimeout(timer);
  }, [mounted]);

  if (!mounted) return null;

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-navy-500"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          aria-hidden="true"
        >
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-navy-500 via-navy-600 to-teal-900/30" />
          {/* Soft radial glow behind logo */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,rgba(20,184,166,0.15),transparent_60%)]" />

          <motion.div
            className="relative z-10 flex flex-col items-center justify-center"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
            }}
            exit={{
              scale: 1.05,
              opacity: 0,
              transition: { duration: 0.4 },
            }}
          >
            <motion.div
              className="relative rounded-2xl p-2 shadow-2xl"
              animate={{
                boxShadow: [
                  '0 25px 50px -12px rgba(0,0,0,0.35)',
                  '0 25px 50px -12px rgba(20,184,166,0.2)',
                  '0 25px 50px -12px rgba(0,0,0,0.35)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            >
              <Image
                src="/tw_logo.webp"
                alt="TwelfthKey Consulting"
                width={160}
                height={100}
                className="h-20 w-auto sm:h-24 md:h-28 object-contain drop-shadow-lg"
                priority
                unoptimized={false}
              />
            </motion.div>
            <motion.p
              className="mt-4 font-serif text-lg font-semibold text-white/90 sm:text-xl"
              initial={{ opacity: 0, y: 8 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { delay: 0.4, duration: 0.4 },
              }}
              exit={{ opacity: 0 }}
            >
              TwelfthKey™
            </motion.p>
            <motion.div
              className="mt-6 h-1 w-24 overflow-hidden rounded-full bg-white/20"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{
                opacity: 1,
                scaleX: 1,
                transition: { delay: 0.6, duration: 0.5 },
              }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="h-full w-1/2 rounded-full bg-teal-400"
                animate={{
                  x: ['0%', '200%'],
                  transition: {
                    duration: 1.2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  },
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
