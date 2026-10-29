/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F7F7F5",
        surface: "#FFFFFF",
        "surface-secondary": "#ECEDEA",
        foreground: "#17191C",
        brand: {
          bg: "#F7F7F5",
          silver: "#ECEDEA",
          card: "#FFFFFF",
          text: "#17191C",
          muted: "#686B70",
          border: "#E2E3E0",
          "border-strong": "#D1D3CE",
          orange: "#FF5A1F",
          "orange-soft": "rgba(255, 90, 31, 0.10)",
          "orange-glow": "rgba(255, 90, 31, 0.25)",
        },
      },
      fontFamily: {
        display: ["var(--font-orbitron)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        'luxury-sm': '0 2px 8px -2px rgba(23, 25, 28, 0.05), 0 0 0 1px rgba(23, 25, 28, 0.04)',
        'luxury-md': '0 12px 32px -8px rgba(23, 25, 28, 0.08), 0 0 0 1px rgba(23, 25, 28, 0.05)',
        'luxury-lg': '0 24px 60px -15px rgba(23, 25, 28, 0.12), 0 0 0 1px rgba(23, 25, 28, 0.06)',
        'luxury-stage': '0 35px 80px -20px rgba(23, 25, 28, 0.20), 0 0 0 1px rgba(23, 25, 28, 0.08)',
        'orange-soft': '0 8px 24px -4px rgba(255, 90, 31, 0.35)',
        'orange-glow': '0 0 30px -5px rgba(255, 90, 31, 0.30)',
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '0.85' },
        },
      },
    },
  },
  plugins: [],
};
