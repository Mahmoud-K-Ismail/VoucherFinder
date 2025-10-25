/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f9ff',
          100: '#ccf3ff',
          200: '#99e7ff',
          300: '#66dbff',
          400: '#33cfff',
          500: '#00d9ff',
          600: '#00acd9',
          700: '#0081a3',
          800: '#00566d',
          900: '#002b36',
        },
        accent: {
          50: '#fff5f5',
          100: '#ffe3e3',
          200: '#ffc7c7',
          300: '#ff9b9b',
          400: '#ff6b6b',
          500: '#ff4757',
          600: '#ee2737',
          700: '#c81e2e',
          800: '#a11824',
          900: '#7a131c',
        },
        success: {
          50: '#e8f9f0',
          100: '#d1f3e1',
          200: '#a3e7c3',
          300: '#75dba5',
          400: '#47cf87',
          500: '#00e676',
          600: '#00b85e',
          700: '#008a47',
          800: '#005c2f',
          900: '#002e18',
        },
        neutral: {
          50: '#f8f9fa',
          100: '#f1f3f5',
          200: '#e9ecef',
          300: '#dee2e6',
          400: '#ced4da',
          500: '#adb5bd',
          600: '#6c757d',
          700: '#495057',
          800: '#343a40',
          900: '#2c3e50',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-in',
        'slide-up': 'slideUp 0.2s ease-out',
        'scale': 'scale 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scale: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 4px 16px rgba(0, 0, 0, 0.12)',
        'button': '0 2px 4px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}

