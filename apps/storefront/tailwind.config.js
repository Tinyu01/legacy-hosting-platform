/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#04132a",
        secondary: "#0f4a82",
        accent: "#f4b41a",
        highlight: "#14d2d1",
        gold: "#d4af37",
        surface: "#071224",
        soft: "#0d1b34",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
