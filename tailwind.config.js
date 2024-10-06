/** @type {import('tailwindcss').Config} */
export default {
  prefix: 'tw-',
  content: ['./components/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        'sm': '600px',
        'md': '1024px',
        'lg': '1440px',
        'xl': '1920px',
      }
    },
  },
  plugins: []
}


