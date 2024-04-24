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
        'beige': '#fcf9f3',
        'tan': '#ece7d4',
        'brown': '#86530b'

      },backgroundImage: {
        
      },
    },
  },
  plugins: [],
};
