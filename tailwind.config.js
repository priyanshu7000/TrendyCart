/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
primary: "#7C3AED",     // Vivid Purple
        secondary: "#4C1D95",   // Deep Purple
        background: "#F5F3FF",  // Soft Lavender
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"], // Premium clean font
      },
    },
  },
  plugins: [],
}

