/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--bg-primary)",
        surface: "var(--bg-surface)",
        soft: "var(--bg-soft)",
        raised: "var(--bg-raised)",
        highlight: "var(--highlight)",
        accent: "var(--accent)",
        gold: "var(--gold)",
        secondary: "#0f4a82",
        border: {
          DEFAULT: "var(--border-color)",
          strong: "var(--border-strong)",
        },
        ink: {
          DEFAULT: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
          dim: "var(--text-dim)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
