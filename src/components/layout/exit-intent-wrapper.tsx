'use client';

import { ReactNode } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ExitIntentModal, useExitIntent } from '@/components/ui/exit-intent-modal';

export function ExitIntentWrapper({ children }: { children: ReactNode }) {
  const { showModal, setShowModal } = useExitIntent();
  
  return (
    <>
      {children}
      <AnimatePresence>
        {showModal && <ExitIntentModal key="exit-intent-modal" onClose={() => setShowModal(false)} />}
      </AnimatePresence>
    </>
  );
}

