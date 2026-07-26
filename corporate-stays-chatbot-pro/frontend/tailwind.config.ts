import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#EEF2F8",
          100: "#DCE5F1",
          200: "#B4C6E0",
          300: "#8CA7CE",
          400: "#5C7FAE",
          500: "#365B87",
          600: "#264873",
          700: "#1C3860",
          800: "#15294A",
          900: "#0F2A4A",
          950: "#0A1930",
        },
        gold: {
          400: "#D9B45C",
          500: "#C79A3E",
          600: "#A97E2B",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 1px 2px rgba(15,42,74,0.06), 0 8px 24px -8px rgba(15,42,74,0.12)",
        floating: "0 20px 60px -20px rgba(15,42,74,0.35)",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.35s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
