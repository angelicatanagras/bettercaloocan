import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Public Sans',
          'Figtree',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        heading: [
          'Space Grotesk',
          'Public Sans',
          '-apple-system',
          'BlinkMacSystemFont',
          'sans-serif',
        ],
        mono: ['SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'monospace'],
        serif: ['Georgia', 'Times New Roman', 'serif'],
      },
      colors: {
        primary: {
          50: '#fbf0f1',
          100: '#f5dcdf',
          200: '#e8b7be',
          300: '#d68894',
          400: '#be5a6b',
          500: '#9e3a4c', // primary maroon
          600: '#7f2c3b',
          700: '#631f2c',
          800: '#47141f',
          900: '#2b0b12',
        },
        secondary: {
          50: '#f7f3ee',
          100: '#ede4d9',
          200: '#dac6b0',
          300: '#c4a587',
          400: '#a9835f',
          500: '#8c6b48', // secondary bronze/taupe
          600: '#705328',
          700: '#56401f',
          800: '#3d2e17',
          900: '#251c0e',
        },
        accent: {
          50: '#eef3ee',
          100: '#d7e3d8',
          200: '#b0c7b2',
          300: '#85a889',
          400: '#5c8862',
          500: '#3f6b47', // accent seal green
          600: '#325938',
          700: '#26432a',
          800: '#1b2f1e',
          900: '#101b12',
        },
        success: {
          50: '#eef3ee',
          100: '#d7e3d8',
          200: '#b0c7b2',
          300: '#85a889',
          400: '#5c8862',
          500: '#3f6b47',
          600: '#325938',
          700: '#26432a',
          800: '#1b2f1e',
          900: '#101b12',
        },
        warning: {
          50: '#fff8e6',
          100: '#fff1cc',
          200: '#ffe399',
          300: '#ffd566',
          400: '#ffc733',
          500: '#ffb900',
          600: '#cc9400',
          700: '#996f00',
          800: '#664a00',
          900: '#332500',
        },
        error: {
          50: '#fceaea',
          100: '#f9d5d5',
          200: '#f3abab',
          300: '#ed8282',
          400: '#e75858',
          500: '#e12e2e',
          600: '#b42525',
          700: '#871c1c',
          800: '#5a1212',
          900: '#2d0909',
        },
        gray: {
          50: '#f8f9fa',
          100: '#f1f3f5',
          200: '#e9ecef',
          300: '#dee2e6',
          400: '#ced4da',
          500: '#adb5bd',
          600: '#868e96',
          700: '#495057',
          800: '#343a40',
          900: '#212529',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in': 'slideIn 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
        slideIn: {
          '0%': {
            transform: 'translateY(10px)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1',
          },
        },
      },
    },
  },
  plugins: [typography],
};
