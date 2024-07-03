/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,html,css}'],
  theme: {
    colors: {
      primary: {
        light: '#F6BDAC', // From color palette
        DEFAULT: '#EF8972', // From color palette
        strong: '#EC765B',
        stronger: '#EA6344',
      },
      secondary: {
        light: '#CDDBC7', // From color palette
        DEFAULT: '#89BEB7', // From color palette
        strong: '#7BABA4',
        stronger: '#6D9892',
      },
      white: {
        light: '#f9f9f9',
        DEFAULT: '#ffffff',
      },
      gray: {
        lighter: '#f9fafb',
        light: '#D9D9D9',
        DEFAULT: '#6b7280',
        strong: '#111827',
      },
      red: {
        light: '#f6d3d1',
        DEFAULT: '#F02417',
      },
      neutral: {
        DEFAULT: '#e5e5e5',
        strong: '#404040',
      },
      background: {
        DEFAULT: '#eee6e1', // From color palette
      },
      text: {
        DEFAULT: '#EF8972',
        success: '#00B112',
        info: '#48a2ff',
        error: '#F02417',
      },
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};
