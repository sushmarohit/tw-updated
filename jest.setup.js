// Learn more: https://github.com/testing-library/jest-dom
// Only import jest-dom in jsdom environment (not in Node environment)
if (typeof window !== 'undefined') {
  require('@testing-library/jest-dom');
}

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      pathname: '/',
      query: {},
      asPath: '/',
    };
  },
  usePathname() {
    return '/';
  },
  useSearchParams() {
    return new URLSearchParams();
  },
}));

// Mock window.gtag (only in jsdom environment)
if (typeof window !== 'undefined') {
  global.window.gtag = jest.fn();
  // Mock window.dataLayer
  global.window.dataLayer = [];

  // Mock IntersectionObserver
  global.IntersectionObserver = class IntersectionObserver {
    constructor() {}
    disconnect() {}
    observe() {}
    takeRecords() {
      return [];
    }
    unobserve() {}
  };

  // Mock matchMedia
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
}

// Note: Request, Response, and Headers polyfills are in jest.polyfills.js
// which runs before modules are loaded (setupFiles)

