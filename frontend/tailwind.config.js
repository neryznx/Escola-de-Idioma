/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: '#7C3AED', // purple-600
          orange: '#F97316', // orange-500
          dark: '#1e1b4b',
        }
      }
    },
  },
  plugins: [],
}
