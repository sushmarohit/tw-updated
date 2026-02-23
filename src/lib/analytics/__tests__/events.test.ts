import {
  trackEvent,
  trackCalculatorStart,
  trackCalculatorComplete,
  trackCalculatorAbandoned,
  trackFormSubmit,
  trackCTAClick,
  trackDiscoveryCallBooked,
  trackPageView,
  trackExitIntentModalShown,
  trackLiveChatInitiated,
  trackReportDownload,
} from '../events';

describe('Analytics Events', () => {
  beforeEach(() => {
    // Mock window.gtag
    global.window.gtag = jest.fn();
    global.window.dataLayer = [];
  });

  afterEach(() => {
    delete global.window.gtag;
    delete global.window.dataLayer;
  });

  describe('trackEvent', () => {
    it('should call gtag with correct parameters', () => {
      trackEvent('test_event', { key: 'value' });

      expect(global.window.gtag).toHaveBeenCalledWith('event', 'test_event', {
        key: 'value',
        timestamp: expect.any(String),
      });
    });

    it('should not throw when gtag is undefined', () => {
      delete global.window.gtag;

      expect(() => trackEvent('test_event')).not.toThrow();
    });

    it('should include timestamp in event params', () => {
      trackEvent('test_event', { custom: 'data' });

      const call = (global.window.gtag as jest.Mock).mock.calls[0];
      expect(call[2]).toHaveProperty('timestamp');
      expect(call[2].timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T/); // ISO format
    });
  });

  describe('trackCalculatorStart', () => {
    it('should track calculator start event', () => {
      trackCalculatorStart('operational_health', 'user-123');

      expect(global.window.gtag).toHaveBeenCalledWith('event', 'calculator_start', {
        calculator_type: 'operational_health',
        user_id: 'user-123',
        timestamp: expect.any(String),
      });
    });

    it('should handle undefined user ID', () => {
      trackCalculatorStart('cost_leakage');

      expect(global.window.gtag).toHaveBeenCalledWith('event', 'calculator_start', {
        calculator_type: 'cost_leakage',
        user_id: undefined,
        timestamp: expect.any(String),
      });
    });
  });

  describe('trackCalculatorComplete', () => {
    it('should track calculator completion', () => {
      trackCalculatorComplete('operational_health', 85.5, 'user-123');

      expect(global.window.gtag).toHaveBeenCalledWith('event', 'calculator_complete', {
        calculator_type: 'operational_health',
        overall_score: 85.5,
        user_id: 'user-123',
        timestamp: expect.any(String),
      });
    });

    it('should handle zero score', () => {
      trackCalculatorComplete('cost_leakage', 0);

      expect(global.window.gtag).toHaveBeenCalledWith('event', 'calculator_complete', {
        calculator_type: 'cost_leakage',
        overall_score: 0,
        user_id: undefined,
        timestamp: expect.any(String),
      });
    });
  });

  describe('trackCalculatorAbandoned', () => {
    it('should track calculator abandonment', () => {
      trackCalculatorAbandoned('operational_health', 5);

      expect(global.window.gtag).toHaveBeenCalledWith('event', 'calculator_abandoned', {
        calculator_type: 'operational_health',
        question_number: 5,
        timestamp: expect.any(String),
      });
    });
  });

  describe('trackFormSubmit', () => {
    it('should track successful form submission', () => {
      trackFormSubmit('contact', true);

      expect(global.window.gtag).toHaveBeenCalledWith('event', 'form_submit', {
        form_type: 'contact',
        success: true,
        timestamp: expect.any(String),
      });
    });

    it('should track failed form submission', () => {
      trackFormSubmit('booking', false);

      expect(global.window.gtag).toHaveBeenCalledWith('event', 'form_submit', {
        form_type: 'booking',
        success: false,
        timestamp: expect.any(String),
      });
    });
  });

  describe('trackCTAClick', () => {
    it('should track CTA click', () => {
      trackCTAClick('Book Discovery Call', 'header');

      expect(global.window.gtag).toHaveBeenCalledWith('event', 'cta_clicked', {
        cta_text: 'Book Discovery Call',
        cta_location: 'header',
        timestamp: expect.any(String),
      });
    });
  });

  describe('trackDiscoveryCallBooked', () => {
    it('should track discovery call booking', () => {
      trackDiscoveryCallBooked('user-123', 'user@example.com');

      expect(global.window.gtag).toHaveBeenCalledWith('event', 'booking_completed', {
        success: true,
        email: 'user@example.com',
        timestamp: expect.any(String),
      });
      expect(global.window.gtag).toHaveBeenCalledWith('event', 'discovery_call_booked', {
        success: true,
        email: 'user@example.com',
        timestamp: expect.any(String),
      });
    });

    it('should handle undefined parameters', () => {
      trackDiscoveryCallBooked();

      expect(global.window.gtag).toHaveBeenCalledWith('event', 'booking_completed', {
        success: true,
        email: undefined,
        timestamp: expect.any(String),
      });
    });
  });

  describe('trackPageView', () => {
    it('should track page view', () => {
      process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID = 'G-TEST123';

      trackPageView('/consulting/services', 'Services Page');

      expect(global.window.gtag).toHaveBeenCalledWith('config', 'G-TEST123', {
        page_path: '/consulting/services',
        page_title: 'Services Page',
      });
    });

    it('should not throw when GA4 ID is not configured', () => {
      delete process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;

      expect(() => trackPageView('/test')).not.toThrow();
    });

    it('should not throw when gtag is undefined', () => {
      delete global.window.gtag;
      process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID = 'G-TEST123';

      expect(() => trackPageView('/test')).not.toThrow();
    });
  });

  describe('trackExitIntentModalShown', () => {
    it('should track exit intent modal', () => {
      trackExitIntentModalShown('/consulting/services');

      expect(global.window.gtag).toHaveBeenCalledWith('event', 'exit_intent_modal_shown', {
        page_path: '/consulting/services',
        timestamp: expect.any(String),
      });
    });
  });

  describe('trackLiveChatInitiated', () => {
    it('should track live chat initiation', () => {
      trackLiveChatInitiated();

      expect(global.window.gtag).toHaveBeenCalledWith('event', 'live_chat_initiated', {
        timestamp: expect.any(String),
      });
    });
  });

  describe('trackReportDownload', () => {
    it('should track report download', () => {
      trackReportDownload('operational_health', 'full_report');

      expect(global.window.gtag).toHaveBeenCalledWith('event', 'report_downloaded', {
        calculator_type: 'operational_health',
        report_type: 'full_report',
        timestamp: expect.any(String),
      });
    });
  });
});

