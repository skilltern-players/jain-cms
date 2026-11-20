import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

/**
 * Design tokens are declared as RGB channel triples in app/globals.css so that
 * Tailwind opacity modifiers (e.g. `border-white/10`) work with our palette.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: "rgb(var(--navy-900-rgb) / <alpha-value>)",
          800: "rgb(var(--navy-800-rgb) / <alpha-value>)",
          700: "rgb(var(--navy-700-rgb) / <alpha-value>)",
          600: "rgb(var(--navy-600-rgb) / <alpha-value>)",
        },
        lime: {
          400: "rgb(var(--lime-400-rgb) / <alpha-value>)",
        },
        cyan: {
          400: "rgb(var(--cyan-400-rgb) / <alpha-value>)",
        },
        orange: {
          500: "rgb(var(--orange-500-rgb) / <alpha-value>)",
        },
        white: "rgb(var(--white-rgb) / <alpha-value>)",
        steel: "rgb(var(--slate-300-rgb) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-display)", ...defaultTheme.fontFamily.sans],
        sans: ["var(--font-body)", ...defaultTheme.fontFamily.sans],
        mono: ["var(--font-mono)", ...defaultTheme.fontFamily.mono],
      },
      fontSize: {
        "display-xl": ["clamp(3.25rem, 9vw, 9rem)", { lineHeight: "0.92", letterSpacing: "-0.035em" }],
        "display-lg": ["clamp(2.5rem, 6vw, 5.5rem)", { lineHeight: "0.98", letterSpacing: "-0.03em" }],
        "display-md": ["clamp(2rem, 4vw, 3.5rem)", { lineHeight: "1.02", letterSpacing: "-0.025em" }],
        "display-sm": ["clamp(1.5rem, 2.4vw, 2.25rem)", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
        eyebrow: ["0.6875rem", { lineHeight: "1.2", letterSpacing: "0.28em" }],
      },
      maxWidth: {
        shell: "90rem",
      },
      spacing: {
        section: "clamp(6rem, 10vw, 10rem)",
      },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "pulse-node": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgb(var(--lime-400-rgb) / 0.45)" },
          "50%": { boxShadow: "0 0 0 10px rgb(var(--lime-400-rgb) / 0)" },
        },
        "drift-y": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "scan-line": {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "20%": { opacity: "0.55" },
          "100%": { transform: "translateY(300%)", opacity: "0" },
        },
      },
      animation: {
        "pulse-node": "pulse-node 2.4s ease-out infinite",
        "drift-y": "drift-y 6s ease-in-out infinite",
        "scan-line": "scan-line 5s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
