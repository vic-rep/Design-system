import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        /* Surface */
        surface: {
          DEFAULT: "var(--surface)",
          adjacent: "var(--surface-adjacent)",
          "adjacent-2": "var(--surface-adjacent-2)",
        },
        /* Accent (Orange) */
        accent: {
          900: "var(--accent-900)",
          800: "var(--accent-800)",
          700: "var(--accent-700)",
          600: "var(--accent-600)",
          500: "var(--accent-500)",
          400: "var(--accent-400)",
          300: "var(--accent-300)",
          200: "var(--accent-200)",
          100: "var(--accent-100)",
          DEFAULT: "var(--accent-600)",
        },
        /* Primary (Neutral) */
        primary: {
          900: "var(--primary-900)",
          800: "var(--primary-800)",
          700: "var(--primary-700)",
          600: "var(--primary-600)",
          500: "var(--primary-500)",
          400: "var(--primary-400)",
          300: "var(--primary-300)",
          200: "var(--primary-200)",
          100: "var(--primary-100)",
          DEFAULT: "var(--primary-900)",
        },
        /* Semantic */
        success: {
          800: "var(--success-800)",
          700: "var(--success-700)",
          600: "var(--success-600)",
          400: "var(--success-400)",
          200: "var(--success-200)",
          100: "var(--success-100)",
          DEFAULT: "var(--success-700)",
        },
        warning: {
          600: "var(--warning-600)",
          500: "var(--warning-500)",
          400: "var(--warning-400)",
          300: "var(--warning-300)",
          200: "var(--warning-200)",
          100: "var(--warning-100)",
          DEFAULT: "var(--warning-500)",
        },
        destructive: {
          600: "var(--destructive-600)",
          550: "var(--destructive-550)",
          500: "var(--destructive-500)",
          400: "var(--destructive-400)",
          300: "var(--destructive-300)",
          200: "var(--destructive-200)",
          100: "var(--destructive-100)",
          DEFAULT: "var(--destructive-550)",
        },
        /* Constants */
        white: "var(--constant-white)",
        black: "var(--constant-black)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      spacing: {
        none: "var(--space-none)",
        xxs: "var(--space-xxs)",
        xs: "var(--space-xs)",
        s: "var(--space-s)",
        m: "var(--space-m)",
        l: "var(--space-l)",
        xl: "var(--space-xl)",
        xxl: "var(--space-xxl)",
        "3xl": "var(--space-3xl)",
        "4xl": "var(--space-4xl)",
        "5xl": "var(--space-5xl)",
        "6xl": "var(--space-6xl)",
        "7xl": "var(--space-7xl)",
        "8xl": "var(--space-8xl)",
        max: "var(--space-max)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        full: "var(--radius-full)",
      },
      boxShadow: {
        "elevation-1": "var(--elevation-level1)",
        "elevation-2": "var(--elevation-level2)",
        "elevation-3": "var(--elevation-level3)",
        "elevation-4": "var(--elevation-level4)",
        "elevation-5": "var(--elevation-level5)",
      },
      fontSize: {
        /* Desktop type scale (≥768px) */
        "d-h1": ["48px", { lineHeight: "1.2", fontWeight: "600" }],
        "d-h2": ["40px", { lineHeight: "1.2", fontWeight: "600" }],
        "d-h3": ["36px", { lineHeight: "1.2", fontWeight: "600" }],
        "d-h4": ["32px", { lineHeight: "1.2", fontWeight: "600" }],
        "d-h5": ["24px", { lineHeight: "1.2", fontWeight: "500" }],
        "d-h6": ["20px", { lineHeight: "1.2", fontWeight: "500" }],
        "d-text-lg": ["18px", { lineHeight: "1.2", fontWeight: "400" }],
        "d-text": ["16px", { lineHeight: "1.2", fontWeight: "400" }],
        "d-text-m": ["16px", { lineHeight: "1.2", fontWeight: "500" }],
        "d-text-sm": ["14px", { lineHeight: "1.2", fontWeight: "400" }],
        "d-caption": ["12px", { lineHeight: "1.2", fontWeight: "400" }],
        /* Mobile type scale (<768px) */
        "m-h1": ["32px", { lineHeight: "1.2", fontWeight: "600" }],
        "m-h2": ["28px", { lineHeight: "1.2", fontWeight: "600" }],
        "m-h3": ["24px", { lineHeight: "1.2", fontWeight: "600" }],
        "m-h4": ["20px", { lineHeight: "1.2", fontWeight: "600" }],
        "m-h5": ["18px", { lineHeight: "1.2", fontWeight: "500" }],
        "m-h6": ["16px", { lineHeight: "1.2", fontWeight: "500" }],
        "m-text-lg": ["16px", { lineHeight: "1.2", fontWeight: "400" }],
        "m-text": ["14px", { lineHeight: "1.2", fontWeight: "400" }],
        "m-text-m": ["14px", { lineHeight: "1.2", fontWeight: "500" }],
        "m-text-sm": ["12px", { lineHeight: "1.3", fontWeight: "400" }],
        "m-caption": ["10px", { lineHeight: "1.3", fontWeight: "400" }],
      },
      screens: {
        mobile: { max: "767px" },
        tablet: "768px",
        "tablet-landscape": "1024px",
        desktop: "1280px",
      },
    },
  },
  plugins: [],
};

export default config;
