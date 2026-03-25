/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1B2A4A',
          50: '#F0F3F8',
          100: '#D8E0ED',
          200: '#B1C1DB',
          300: '#8AA2C9',
          400: '#5272A0',
          500: '#1B2A4A',
          600: '#162240',
          700: '#111A32',
          800: '#0C1224',
          900: '#070A16',
        },
        accent: {
          DEFAULT: '#D4A853',
          50: '#FDF8EE',
          100: '#F9EDCF',
          200: '#F0D89F',
          300: '#E7C36F',
          400: '#D4A853',
          500: '#C49438',
          600: '#A67A2A',
          700: '#7E5D20',
          800: '#564016',
          900: '#2E220C',
        },
        surface: '#FFFFFF',
        background: '#FAFBFC',
        text: '#1F2937',
        success: '#059669',
        muted: {
          DEFAULT: '#6B7280',
          light: '#9CA3AF',
        },
      },
      fontFamily: {
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'hero-sm': ['2.25rem', { lineHeight: '1.15', letterSpacing: '-0.01em', fontWeight: '700' }],
      },
      maxWidth: {
        'site': '1200px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.4s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
