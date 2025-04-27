/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E6ECF5',
          100: '#CCDBEB',
          200: '#99B6D7',
          300: '#6692C4',
          400: '#336EB0',
          500: '#0A2463', // Base color
          600: '#081D4F',
          700: '#06163A',
          800: '#040F26',
          900: '#020713',
        },
        secondary: {
          50: '#F7E6E6',
          100: '#EFCDCD',
          200: '#DF9B9B',
          300: '#CF6969',
          400: '#BF3636',
          500: '#8B0000', // Base color
          600: '#6F0000',
          700: '#530000',
          800: '#380000',
          900: '#1C0000',
        },
        accent: {
          50: '#FFF8E6',
          100: '#FFF2CC',
          200: '#FFE599',
          300: '#FFD966',
          400: '#FFCC33',
          500: '#FFC857', // Base color
          600: '#CCA646',
          700: '#997D34',
          800: '#665323',
          900: '#332A11',
        },
      },
      fontFamily: {
        sans: ['Source Sans 3', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
};