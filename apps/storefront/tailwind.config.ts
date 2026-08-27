import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        legacy: {
          primary: "rgb(var(--legacy-primary) / <alpha-value>)",
          accent: "rgb(var(--legacy-accent) / <alpha-value>)",
        },
      },
    },
  },
  plugins: [],
};

export default config;
