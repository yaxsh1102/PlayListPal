/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily:{
        'great-vibes': ['"Great Vibes"', 'cursive'],
        'dancing-script':[ '"Dancing Script"', 'cursive'],
      },
      colors: {
        'dark-pink': '#D63384',
        'dark-gray': '#2E2E2E',
      },
      backgroundImage: {
        'gradient-to-tr': 'linear-gradient(to top right, #2E2E2E, #D63384)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}