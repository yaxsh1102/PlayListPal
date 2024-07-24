/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      screens: {
        'h-lg': { 'raw': '(min-height: 1000px)' },

        'h-xl': { 'raw': '(min-height: 1200px)' },
        'mobile': { 'raw': '(min-height: 801px) and (max-width:450px) ' },
       
      },
    },
  },
  plugins: [],
}