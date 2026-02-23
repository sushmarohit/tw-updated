'use client';

import { ReactNode } from 'react';
import { MotionConfig } from 'framer-motion';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n/config';
import { AnalyticsProvider } from './analytics/analytics-provider';
import { ErrorBoundary } from './error-handling/error-boundary';
import { ChatProvider } from './chat/chat-provider';
import { RouteChangeProvider } from './layout/route-change-provider';
import { SplashScreen } from './layout/splash-screen';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <I18nextProvider i18n={i18n}>
      <MotionConfig reducedMotion="user">
        <ErrorBoundary>
          <AnalyticsProvider>
            <ChatProvider>
              <RouteChangeProvider>
                <SplashScreen />
                {children}
              </RouteChangeProvider>
            </ChatProvider>
          </AnalyticsProvider>
        </ErrorBoundary>
      </MotionConfig>
    </I18nextProvider>
  );
}

