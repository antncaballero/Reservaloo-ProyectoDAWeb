/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#1a237e',
        'secondary': '#283593',
        'accent': '#ffd700',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
} 