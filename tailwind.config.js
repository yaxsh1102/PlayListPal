/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      screens: {
        'h-lg': { 'raw': '(min-height: 1000px)' },
        'h-xl': { 'raw': '(min-height: 1200px)' },
        'mobile': { 'raw': '(min-height: 801px) and (max-width: 450px)' },
        
        'small-mobile': { 'raw': '(min-width: 374px and max-width:420px) and (max-height: 700px) ' }
      },
    },
  },
  plugins: [],
}
