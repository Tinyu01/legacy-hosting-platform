import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      colors: {
        lh: {
          bg: "#0a0c10",
          surface: "#11141a",
          elevated: "#161b22",
          border: "#2a303c",
          muted: "#8b93a1",
          faint: "#5c6573",
        },
      },
      maxWidth: {
        content: "72rem",
      },
      letterSpacing: {
        tightest: "-0.03em",
      },
    },
  },
  plugins: [],
};

export default config;
