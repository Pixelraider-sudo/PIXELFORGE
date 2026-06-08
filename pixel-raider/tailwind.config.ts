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
        // Pixel Raider Brand System
        pr: {
          black:   "#050810",
          dark:    "#080C1A",
          darker:  "#0C1122",
          surface: "#111827",
          card:    "#141C33",
          border:  "#1E2A45",
          "border-bright": "#2A3D66",
          // Primary — Electric Cyan
          cyan:    "#00C8E8",
          "cyan-dim": "#008FAA",
          "cyan-glow": "rgba(0,200,232,0.2)",
          // Secondary — Violet
          violet:  "#6E54F7",
          "violet-dim": "#4F3BC4",
          "violet-glow": "rgba(110,84,247,0.2)",
          // Text
          text:    "#E8EEFF",
          "text-2": "#8A9BC4",
          "text-3": "#4A5A82",
          // Status
          green:   "#10D17A",
          amber:   "#F5A623",
          red:     "#F7285A",
        },
      },
      fontFamily: {
        display: ["var(--font-orbitron)", "monospace"],
        body:    ["var(--font-syne)", "sans-serif"],
        mono:    ["var(--font-jetbrains)", "monospace"],
      },
      backgroundImage: {
        "pr-grad":        "linear-gradient(135deg, #00C8E8, #6E54F7)",
        "pr-grad-subtle": "linear-gradient(135deg, rgba(0,200,232,0.08), rgba(110,84,247,0.08))",
        "pr-grid":        "linear-gradient(rgba(0,200,232,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,200,232,0.04) 1px, transparent 1px)",
        "pr-noise":       "url('/assets/noise.svg')",
      },
      backgroundSize: {
        "pr-grid": "40px 40px",
      },
      animation: {
        "boot":       "boot 0.8s cubic-bezier(0.4,0,0.2,1) forwards",
        "glitch":     "glitch 3s infinite",
        "scan":       "scan 3s linear infinite",
        "float":      "float 6s ease-in-out infinite",
        "pulse-cyan": "pulse-cyan 2s ease-in-out infinite",
        "fade-up":    "fade-up 0.6s cubic-bezier(0.4,0,0.2,1) forwards",
        "fade-in":    "fade-in 0.4s ease forwards",
        "slide-right":"slide-right 0.5s cubic-bezier(0.4,0,0.2,1) forwards",
        "typewriter": "typewriter 3s steps(40) forwards",
        "border-flow":"border-flow 3s linear infinite",
      },
      keyframes: {
        boot: {
          "0%":   { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        glitch: {
          "0%, 93%, 100%": { transform: "translate(0)" },
          "94%":           { transform: "translate(-3px, 1px)" },
          "96%":           { transform: "translate(3px, -1px)" },
          "98%":           { transform: "translate(-1px, 2px)" },
        },
        scan: {
          "0%":   { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-16px)" },
        },
        "pulse-cyan": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(0,200,232,0.4)" },
          "50%":      { boxShadow: "0 0 0 12px rgba(0,200,232,0)" },
        },
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-right": {
          "0%":   { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        typewriter: {
          "from": { width: "0" },
          "to":   { width: "100%" },
        },
        "border-flow": {
          "0%":   { backgroundPosition: "0% 50%" },
          "50%":  { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      boxShadow: {
        "pr-cyan":   "0 0 30px rgba(0,200,232,0.25), 0 0 60px rgba(0,200,232,0.1)",
        "pr-violet": "0 0 30px rgba(110,84,247,0.25), 0 0 60px rgba(110,84,247,0.1)",
        "pr-card":   "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
        "pr-glow":   "0 0 60px rgba(0,200,232,0.15), 0 0 120px rgba(110,84,247,0.1)",
      },
      borderRadius: {
        "pr": "12px",
        "pr-lg": "20px",
        "pr-xl": "28px",
      },
    },
  },
  plugins: [],
};

export default config;
