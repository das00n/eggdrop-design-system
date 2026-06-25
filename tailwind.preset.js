/** 에그드랍 디자인 시스템 — Tailwind preset. 값은 tokens.css와 동일. */
module.exports = {
  theme: {
    extend: {
      colors: {
        ink: '#111111',
        gray: { 100: '#F4F4F5', 300: '#D4D4D8', 500: '#71717A', 700: '#3F3F46' },
        primary: { DEFAULT: '#FFC400', ink: '#3F2D00' },
        accent:  { DEFAULT: '#E5322D', ink: '#FCEBEB' },
        success: { DEFAULT: '#16A34A', bg: '#DCFCE7', ink: '#14532D' },
        warning: { DEFAULT: '#F59E0B', bg: '#FEF3C7', ink: '#633806' },
        danger:  { DEFAULT: '#E5322D', bg: '#FEE2E2', ink: '#7F1D1D' },
        info:    { DEFAULT: '#2563EB', bg: '#DBEAFE', ink: '#1E3A8A' },
      },
      fontFamily: {
        sans: ['Pretendard', '-apple-system', 'Segoe UI', 'Malgun Gothic', 'sans-serif'],
      },
      fontSize: {
        metric:  ['24px', { lineHeight: '1.2', fontWeight: '700' }],
        h1:      ['22px', { lineHeight: '1.3', fontWeight: '600' }],
        h2:      ['18px', { lineHeight: '1.4', fontWeight: '600' }],
        h3:      ['16px', { lineHeight: '1.4', fontWeight: '600' }],
        body:    ['14px', { lineHeight: '1.6' }],
        sm:      ['13px', { lineHeight: '1.5' }],
        caption: ['12px', { lineHeight: '1.4' }],
      },
      spacing: { 1: '4px', 2: '8px', 3: '12px', 4: '16px', 6: '24px', 8: '32px', 12: '48px' },
      borderRadius: { sm: '4px', md: '8px', lg: '12px', full: '999px' },
      boxShadow: {
        sm: '0 1px 3px rgba(17,17,17,.10)',
        md: '0 8px 24px rgba(17,17,17,.16)',
      },
    },
  },
};
