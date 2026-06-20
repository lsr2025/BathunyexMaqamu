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
        // Luxury Safari Nursery palette
        sage: {
          50: "#f4f7f2",
          100: "#e6ede1",
          200: "#cdd9c3",
          300: "#a9bf9a",
          400: "#86a173",
          500: "#6b8757",
          600: "#546c44",
          700: "#445637",
          800: "#39462f",
          900: "#313c2a",
        },
        ivory: "#fbf8f1",
        cream: "#f6f0e4",
        beige: {
          50: "#faf6ee",
          100: "#f2e9d8",
          200: "#e7d6ba",
          300: "#d9bf95",
          400: "#cba672",
          500: "#bf9159",
        },
        gold: {
          DEFAULT: "#b89a5e",
          light: "#cdb487",
          dark: "#9a7e45",
        },
        bark: "#5b4a36",
        cocoa: "#7a6650",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(91, 74, 54, 0.18)",
        card: "0 8px 30px -10px rgba(91, 74, 54, 0.15)",
        glow: "0 0 0 1px rgba(184, 154, 94, 0.25), 0 14px 50px -18px rgba(184, 154, 94, 0.45)",
      },
      backgroundImage: {
        "ivory-radial":
          "radial-gradient(1200px 600px at 50% -10%, #fefcf7 0%, #fbf8f1 45%, #f4efe3 100%)",
        "sage-fade":
          "linear-gradient(180deg, rgba(230,237,225,0) 0%, rgba(230,237,225,0.6) 100%)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "fade-up": "fade-up 0.7s ease-out both",
        shimmer: "shimmer 2.5s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
