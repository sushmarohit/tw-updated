/**
 * Google Analytics 4 & dataLayer Event Tracking (Spec Section 9)
 * Centralized event tracking for GA4 and GTM conversion events
 */

declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'set',
      targetId: string | Date,
      config?: Record<string, any>
    ) => void;
    dataLayer?: any[];
  }
}

/**
 * Push to dataLayer for GTM / GA4 (H.32 conversion events)
 */
export function pushDataLayer(eventName: string, eventParams?: Record<string, any>): void {
  if (typeof window === 'undefined') return;
  const payload = {
    event: eventName,
    ...eventParams,
    timestamp: new Date().toISOString(),
  };
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
}

/**
 * Track a custom event (sends to gtag; use pushDataLayer for conversion events)
 */
export function trackEvent(
  eventName: string,
  eventParams?: Record<string, any>
): void {
  if (typeof window === 'undefined' || !window.gtag) {
    return;
  }
  const params = {
    ...eventParams,
    timestamp: new Date().toISOString(),
  };
  window.gtag('event', eventName, params);
}

/**
 * Track navigation link click (Spec 9.3: navigation_click)
 */
export function trackNavigationClick(linkText: string, destination: string): void {
  trackEvent('navigation_click', {
    link_text: linkText,
    destination,
  });
}

/**
 * Track calculator/tool start (Spec 9.3: tool_started)
 */
export function trackCalculatorStart(calculatorType: string, userId?: string): void {
  trackEvent('calculator_start', {
    calculator_type: calculatorType,
    user_id: userId,
  });
  trackEvent('tool_started', {
    tool_type: calculatorType,
    user_id: userId,
  });
}

/**
 * Track calculator/tool completion (Spec 9.3: tool_completed)
 */
export function trackCalculatorComplete(
  calculatorType: string,
  overallScore: number,
  userId?: string
): void {
  trackEvent('calculator_complete', {
    calculator_type: calculatorType,
    overall_score: overallScore,
    user_id: userId,
  });
  trackEvent('tool_completed', {
    tool_type: calculatorType,
    score: overallScore,
    user_id: userId,
  });
}

/**
 * Tool completion with email – push to dataLayer for conversion (H.32).
 * Call when user saves tool results with email (no duplicate gtag event).
 */
export function trackToolCompletedWithEmail(
  toolSlug: string,
  scoreOrValue: number,
  email?: string
): void {
  if (!email) return;
  pushDataLayer('tool_completion_conversion', {
    tool_slug: toolSlug,
    score: scoreOrValue,
    email,
  });
}

/**
 * Track calculator abandonment
 */
export function trackCalculatorAbandoned(calculatorType: string, questionNumber: number): void {
  trackEvent('calculator_abandoned', {
    calculator_type: calculatorType,
    question_number: questionNumber,
  });
}

/**
 * Track form submission (Spec 9.3: form_submit). Pushes dataLayer for conversion when success (H.32).
 */
export function trackFormSubmit(
  formType: string,
  success: boolean,
  extra?: { email?: string; name?: string }
): void {
  trackEvent('form_submit', {
    form_type: formType,
    success,
    ...extra,
  });
  if (success) {
    pushDataLayer('form_submit_conversion', {
      form_type: formType,
      email: extra?.email,
      name: extra?.name,
    });
  }
}

/**
 * Track CTA click (Spec 9.3: cta_click)
 */
export function trackCTAClick(ctaText: string, ctaLocation: string): void {
  trackEvent('cta_clicked', {
    cta_text: ctaText,
    cta_location: ctaLocation,
  });
  trackEvent('cta_click', {
    cta_text: ctaText,
    cta_location: ctaLocation,
  });
}

/**
 * Track booking completed (Spec 9.3: booking_completed). Pushes dataLayer for conversion (H.32).
 */
export function trackBookingCompleted(success: boolean, email?: string): void {
  trackEvent('booking_completed', {
    success,
    email,
  });
  trackEvent('discovery_call_booked', {
    success,
    email,
  });
  if (success) {
    pushDataLayer('booking_conversion', {
      email: email || undefined,
    });
  }
}

/**
 * Track discovery call booking (legacy alias)
 */
export function trackDiscoveryCallBooked(userId?: string, email?: string): void {
  trackBookingCompleted(true, email);
}

/**
 * Track page view
 */
export function trackPageView(pagePath: string, pageTitle?: string): void {
  if (typeof window === 'undefined' || !window.gtag) {
    return;
  }

  window.gtag('config', process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || '', {
    page_path: pagePath,
    page_title: pageTitle,
  });
}

/**
 * Track exit intent modal
 */
export function trackExitIntentModalShown(pagePath: string): void {
  trackEvent('exit_intent_modal_shown', {
    page_path: pagePath,
  });
}

/**
 * Track live chat initiation
 */
export function trackLiveChatInitiated(): void {
  trackEvent('live_chat_initiated');
}

/**
 * Track report download
 */
export function trackReportDownload(calculatorType: string, reportType: string): void {
  trackEvent('report_downloaded', {
    calculator_type: calculatorType,
    report_type: reportType,
  });
}

