'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from './button';
import { trackExitIntentModalShown, trackCTAClick } from '@/lib/analytics/events';

interface ExitIntentModalProps {
  onClose: () => void;
}

export function ExitIntentModal({ onClose }: ExitIntentModalProps) {
  const { t } = useTranslation(['exitIntent', 'common']);
  const router = useRouter();

  useEffect(() => {
    trackExitIntentModalShown(window.location.pathname);
  }, []);

  const handleCTAClick = (ctaText: string, href: string) => {
    trackCTAClick(ctaText, 'exit_intent_modal');
    onClose();
    // Small delay to allow modal close animation before navigation
    setTimeout(() => {
      router.push(href);
    }, 100);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <motion.div
        initial={{ backdropFilter: 'blur(0px)' }}
        animate={{ backdropFilter: 'blur(8px)' }}
        exit={{ backdropFilter: 'blur(0px)' }}
        className="absolute inset-0 bg-black/50"
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.4, ease: [0, 0, 0.2, 1] }}
        className="relative bg-white rounded-xl shadow-2xl max-w-md w-full p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 focus-visible-ring rounded-lg"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

          <div className="text-center">
            <h2 className="heading-h3 mb-4">{t('exitIntent:title')}</h2>
            <p className="body-default text-gray-600 mb-6">
              {t('exitIntent:message')}
            </p>
            <div className="space-y-3">
              <Button
                variant="primary"
                className="w-full"
                onClick={() => handleCTAClick(t('common:startFreeDiagnostic'), '/consulting/tools/health-check')}
              >
                {t('common:startFreeDiagnostic')}
              </Button>
              <Button
                variant="secondary"
                className="w-full"
                onClick={() => handleCTAClick(t('common:bookDiscoveryCall'), '/consulting/booking')}
              >
                {t('common:bookDiscoveryCall')}
              </Button>
            </div>
            <p className="body-small text-gray-500 mt-4">
              {t('exitIntent:noCreditCard')}
            </p>
          </div>
        </motion.div>
      </motion.div>
  );
}

export function useExitIntent() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    let hasTriggered = false;

    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger when mouse leaves the top of the viewport
      if (!hasTriggered && e.clientY <= 0) {
        hasTriggered = true;
        setShowModal(true);
      }
    };

    // Only trigger on desktop (not mobile)
    if (window.innerWidth >= 768) {
      document.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return { showModal, setShowModal };
}

