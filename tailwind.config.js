/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./services/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f9fafb',
          100: '#f3f4f6',
          500: '#000000', // Black for focus rings
          600: '#000000', // Black for primary buttons/text
          700: '#333333', // Dark Gray for hover states
          900: '#111827',
        }
      }
    },
  },
  plugins: [],
}