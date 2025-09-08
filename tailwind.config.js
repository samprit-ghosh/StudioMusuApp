// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",        // Expo Router screens
    "./components/**/*.{js,jsx,ts,tsx}"  // Your components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
