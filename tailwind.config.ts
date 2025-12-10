import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f4ff',
          100: '#e0e8ff',
          200: '#c7d4fe',
          300: '#a3b8fc',
          400: '#7a91f9',
          500: '#5a6cf4',
          600: '#4347e8',
          700: '#3636d4',
          800: '#2e2eab',
          900: '#2a2d87',
          950: '#1a1a52',
        },
        accent: {
          cyan: '#00d4ff',
          purple: '#a855f7',
          pink: '#ec4899',
          orange: '#f97316',
        },
        dark: {
          900: '#0a0a1a',
          800: '#0f0f2a',
          700: '#151538',
          600: '#1a1a4a',
          500: '#252560',
        },
      },
      fontFamily: {
        display: ['Orbitron', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #0a0a1a 0%, #1a1a52 50%, #0f0f2a 100%)',
        'card-gradient': 'linear-gradient(180deg, rgba(42, 45, 135, 0.4) 0%, rgba(26, 26, 82, 0.6) 100%)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 212, 255, 0.6)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;

