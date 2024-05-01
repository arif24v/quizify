/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'gray': '#eeeeee',
        'beige': {
          DEFAULT: '#fcf9f3',
          100: '#fcf9f3',
          200: '#e9d99f'

        },
        'tan': '#ece7d4',
        'brown': '#86530b',
        'darkgray' : '#595959',
        'bkgs': '#F0EAD2',
        'text': '',
        'btn': {
          DEFAULT: '#DDE5B6',
          100: '#DDE5B6',
          200: '#ADC178',
          300: '#b3ef15ff',
          400: '#f1fac8ff'
        },
        'card': '#eeeeee'

      },backgroundImage: {
        
      },
    },
  },
  plugins: [],
};
