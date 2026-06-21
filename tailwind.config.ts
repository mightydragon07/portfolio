import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Night (dark) palette
        "night-bg": "#05060f",
        "night-bg-2": "#0a0e1f",
        // Day (light) palette
        "day-bg": "#eef3fb",
        "day-bg-2": "#e3ecfa",
        // Shared accents — RGB-triplet vars so Tailwind's opacity
        // modifiers (e.g. bg-accent/10) work correctly.
        accent: "rgb(var(--accent-rgb) / <alpha-value>)",
        "accent-2": "rgb(var(--accent-2-rgb) / <alpha-value>)",
        ink: "rgb(var(--ink-rgb) / <alpha-value>)",
        "ink-muted": "rgb(var(--ink-muted-rgb) / <alpha-value>)",
      },
      fontFamily: {
        display: ["Orbitron", "sans-serif"],
        body: ["Rajdhani", "sans-serif"],
      },
      backdropBlur: {
        glass: "24px",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.12)",
        "glow-accent": "0 0 24px var(--accent-glow)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0) translateX(0)" },
          "50%": { transform: "translateY(-18px) translateX(8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "slide-up-fade": {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        float: "float 9s ease-in-out infinite",
        shimmer: "shimmer 3.5s linear infinite",
        "slide-up-fade": "slide-up-fade 0.7s cubic-bezier(0.16,1,0.3,1) forwards",
      },
    },
  },
  plugins: [],
};

export default config;
