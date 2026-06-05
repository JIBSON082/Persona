import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-dm-sans)", "sans-serif"],
        mono: ["var(--font-dm-mono)", "monospace"],
      },
      colors: {
        base: "#0B0F19",
        card: "#161D30",
        border: "rgba(255,255,255,0.06)",
      },
      backgroundImage: {
        "gradient-persona":
          "linear-gradient(135deg, #6366f1 0%, #22d3ee 100%)",
      },
      keyframes: {
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.08)" },
        },
        spin: {
          to: { transform: "rotate(360deg)" },
        },
        "dot-bounce": {
          "0%, 80%, 100%": { transform: "translateY(0)", opacity: "0.4" },
          "40%": { transform: "translateY(-5px)", opacity: "1" },
        },
        "humanize-pulse": {
          "0%, 100%": {
            boxShadow:
              "0 0 12px rgba(99,102,241,0.3), 0 0 24px rgba(99,102,241,0.1)",
          },
          "50%": {
            boxShadow:
              "0 0 20px rgba(99,102,241,0.55), 0 0 40px rgba(34,211,238,0.2)",
          },
        },
        "text-reveal": {
          from: { opacity: "0", filter: "blur(4px)" },
          to: { opacity: "1", filter: "blur(0)" },
        },
        "badge-pop": {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.18)" },
          "100%": { transform: "scale(1)" },
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
        "fade-in-up": "fade-in-up 0.6s ease-out both",
        shimmer: "shimmer 1.4s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        spin: "spin 0.8s linear infinite",
        "dot-bounce": "dot-bounce 1.2s ease-in-out infinite",
        "humanize-pulse": "humanize-pulse 2.5s ease-in-out infinite",
        "text-reveal": "text-reveal 0.5s ease-out both",
        "badge-pop": "badge-pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;

