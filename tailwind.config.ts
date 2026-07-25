import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#0052FF",
        "accent-hover": "#0040CC",
        surface: "#FAF9F6",
        ink: "#09090B",
        "ink-secondary": "#52525B",
        "ink-muted": "#A1A1AA",
        rule: "#E4E4E7",
        "rule-light": "#F4F4F5",
      },
      fontFamily: {
        sans: [
          "var(--font-geist-sans)",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
