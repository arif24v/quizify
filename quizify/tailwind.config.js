/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    
  ],
  darkMode: 'selector',
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
        'brown': {
          DEFAULT: '#86530b',
          100: '#86530b',
          200: '#A98467',
          300: '#36C584C',
          400: '#96c178ff',
          500: '#bce2a1ff'
        },
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
        'card': '#eeeeee',


      },backgroundImage: {
        
      },
    },
  },
  plugins: [],
};
