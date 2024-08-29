import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          '"Noto Sans"',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      colors: {
        'primary-yellow': '#FDE100',
        'secondary-skyblue': '#60A5FA',
        'gray1-white': '#F8F8F8',
        'gray2-title': '#F1F1F1',
        'gray3-text': '#DEDEDE',
        'gray4-dark-text': '#B0B0B0',
        'gray5-light-bg': '#333333',
        'gray6-black': '#202020',
      },
      fontSize: {
        'heading-1': '2.25rem', // 36px
        'heading-2': '1.875rem', // 30px
        'heading-3': '1.25rem', // 20px
        'body-lg': '1.125rem', // 18px
        'body-base': '1rem', // 16px
        'caption-lg': '0.875rem', // 14px
      },
      backgroundImage: {
        'custom-gradient':
          'var(--bg, linear-gradient(180deg, #141414 9.5%, #494A00 40.5%, #141414 76.5%))',
      },
    },
  },
  plugins: [],
};
export default config;
