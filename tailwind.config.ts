import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // V5.1 Primary brand colors
        // Primary Gold #c49a3c (60% usage - CTAs, highlights)
        gold: {
          DEFAULT: '#c49a3c',
          50: '#F8F3E6',
          100: '#F0E6CC',
          200: '#E1CC99',
          300: '#c49a3c',
          400: '#B08935',
          500: '#9A732E',
          600: '#7D5D26',
          700: '#60471E',
          800: '#433116',
          900: '#261B0E',
        },
        // Secondary Blue #1a4d7c (headers, body, footer)
        navy: {
          DEFAULT: '#1a4d7c',
          50: '#E8EEF4',
          100: '#D1DDE9',
          200: '#A3BBD3',
          300: '#7599BD',
          400: '#4777A7',
          500: '#1a4d7c',
          600: '#153E63',
          700: '#102E4A',
          800: '#0B1F32',
          900: '#060F19',
        },
        // Tertiary Purple #4c3575 (accent, links, icons)
        purple: {
          DEFAULT: '#4c3575',
          50: '#EDEAF2',
          100: '#DBD5E5',
          200: '#B7ABCB',
          300: '#9381B1',
          400: '#6F5797',
          500: '#4c3575',
          600: '#3D2A5E',
          700: '#2E2046',
          800: '#1F152F',
          900: '#0F0B17',
        },
        // Legacy teal (kept for backward compatibility; use purple for new accent)
        teal: {
          DEFAULT: '#1BB6B6',
          50: '#E6F7F7',
          100: '#CDEFEF',
          200: '#9BDFDF',
          300: '#69CFCF',
          400: '#37BFBF',
          500: '#1BB6B6',
          600: '#169292',
          700: '#116D6D',
          800: '#0C4949',
          900: '#062424',
        },
        // Neutral Colors
        gray: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
        // Semantic Colors
        success: {
          DEFAULT: '#10B981',
          light: '#D1FAE5',
          dark: '#059669',
        },
        warning: {
          DEFAULT: '#F59E0B',
          light: '#FEF3C7',
          dark: '#D97706',
        },
        error: {
          DEFAULT: '#EF4444',
          light: '#FEE2E2',
          dark: '#DC2626',
        },
        info: {
          DEFAULT: '#3B82F6',
          light: '#DBEAFE',
          dark: '#2563EB',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'hero-desktop': ['64px', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'hero-mobile': ['40px', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'h2-desktop': ['48px', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'h2-mobile': ['32px', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'h3-desktop': ['36px', { lineHeight: '1.3' }],
        'h3-mobile': ['28px', { lineHeight: '1.3' }],
        'h4-desktop': ['24px', { lineHeight: '1.4' }],
        'h4-mobile': ['20px', { lineHeight: '1.4' }],
        'body-large': ['18px', { lineHeight: '1.6' }],
        'body-default': ['16px', { lineHeight: '1.6' }],
        'body-small': ['14px', { lineHeight: '1.5' }],
        'button': ['16px', { lineHeight: '1.0' }],
        'caption': ['12px', { lineHeight: '1.4' }],
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px',
        '3xl': '64px',
        '4xl': '96px',
        '5xl': '128px',
      },
      borderRadius: {
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 8px 24px rgba(0, 0, 0, 0.12)',
        'button': '0 6px 16px rgba(199, 165, 102, 0.3)',
      },
      animation: {
        'shimmer': 'shimmer 2s infinite',
        'shimmer-slide': 'shimmer-slide 1.5s ease-in-out infinite',
        'shake': 'shake 0.5s',
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.35s ease-out',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '75%': { transform: 'translateX(5px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'shimmer-slide': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;

