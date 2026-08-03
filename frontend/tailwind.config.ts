import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#3B82F6",
          600: "#2563EB",
          700: "#1D4ED8",
          800: "#1E40AF",
          900: "#1E3A8A",
          950: "#172554",
        },
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
          "var(--font-sans)",
          "Plus Jakarta Sans",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        display: [
          "var(--font-display)",
          "Outfit",
          "Plus Jakarta Sans",
          "sans-serif",
        ],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(15, 23, 42, 0.04), 0 8px 24px -10px rgba(37, 99, 235, 0.12)",
        lift: "0 12px 32px -14px rgba(37, 99, 235, 0.28)",
        floating: "0 24px 60px -24px rgba(15, 23, 42, 0.28)",
        card: "0 1px 2px rgba(15,42,74,0.06), 0 8px 24px -8px rgba(15,42,74,0.12)",
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
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.35s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
