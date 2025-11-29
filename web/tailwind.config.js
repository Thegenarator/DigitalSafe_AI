/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/features/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "Inter", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "Inter", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          50: "#f5f6ff",
          100: "#e6e9ff",
          200: "#c7cdff",
          300: "#a0adff",
          400: "#7686ff",
          500: "#4d5efc",
          600: "#3c48db",
          700: "#3039ad",
          800: "#23297b",
          900: "#171c52",
        },
        safety: {
          low: "#10b981",
          moderate: "#f59e0b",
          high: "#ef4444",
        },
        ink: {
          50: "#f7f7f8",
          100: "#e5e7eb",
          200: "#d3d6db",
          300: "#b1b5bd",
          400: "#6b7280",
          500: "#4b5563",
          600: "#374151",
          700: "#1f2937",
          800: "#111827",
          900: "#030712",
        },
      },
      boxShadow: {
        card: "0 20px 35px -24px rgba(25, 25, 50, 0.65)",
      },
      animation: {
        pulseSlow: "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};

