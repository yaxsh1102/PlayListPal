/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      padding: {
        'safe': 'var(--safe-padding-top, env(safe-area-inset-top))',
      },
    },
  },
  plugins: [],
}
