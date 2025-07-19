/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#F59E0B',
          dark: '#D97706',
          light: '#FCD34D',
        },
        background: '#000000',
        surface: {
          DEFAULT: '#111827',
          light: '#1F2937',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#D1D5DB',
          muted: '#9CA3AF',
        },
        border: {
          DEFAULT: '#374151',
          light: '#4B5563',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'slide-in-left': 'slideInLeft 0.6s ease-out',
        'zoom-in': 'zoomIn 0.6s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(50px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        zoomIn: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 15px rgba(245,158,11,0.5)' },
          '100%': { boxShadow: '0 0 25px rgba(245,158,11,0.8)' },
        }
      },
      boxShadow: {
        'glow': '0 0 15px rgba(245,158,11,0.5)',
        'glow-lg': '0 0 25px rgba(245,158,11,0.8)',
      }
    },
  },
  plugins: [],
};
