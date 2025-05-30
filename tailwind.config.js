/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'bollywood-purple': {
          900: '#2D1B4E',
          800: '#3D2A62',
          700: '#4D3977',
          600: '#5D4789',
          500: '#6E579C',
          400: '#8F7CB3',
        },
        'bollywood-gold': {
          500: '#D4AF37',
          400: '#E5C158',
          300: '#F1D67E',
        }
      },
      rotate: {
        '25': '25deg',
      }
    },
  },
  plugins: [],
};