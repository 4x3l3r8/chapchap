/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1775ee",
        secondary: "#42b72a"
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
