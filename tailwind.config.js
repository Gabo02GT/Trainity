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
          900: '#1a3a52',
          700: '#2d5a7b',
          500: '#3d7fa8',
        },
        secondary: {
          400: '#7a8fa3',
        },
      },
      animation: {
        slideUp: 'slideUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
        slideDown: 'slideDown 0.6s ease-out',
        slideInLeft: 'slideInLeft 0.6s ease-out',
        slideInRight: 'slideInRight 0.6s ease-out',
        slideInUp: 'slideInUp 0.6s ease-out',
        fadeIn: 'fadeIn 0.6s ease-out',
        rotateIn: 'rotateIn 0.7s ease-out',
      },
      keyframes: {
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        rotateIn: {
          '0%': { opacity: '0', transform: 'rotateY(90deg)' },
          '100%': { opacity: '1', transform: 'rotateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
