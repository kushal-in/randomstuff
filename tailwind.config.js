/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#090D0F', // Ultra-deep teal/slate (replaces #0a0a0a)
        bgDark: '#090D0F',
        surface: '#11161A',    // Solid elevated panel (no opacity/blur)
        borderLine: '#1E252B', // Crisp 1px hairline border
        primary: '#10B981',    // Emerald green (Compiler Success / Verified)
        accent: '#0EA5E9',     // Clean cerulean blue (Focus / Active)
        spark: '#F59E0B',      // Warning Amber (Hints / Errors)
        textMain: '#EDEDEC',   // Off-white text
        textMuted: '#8A8B91',  // Legible gray
      },
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
        code: ['"Fira Code"', '"IBM Plex Mono"', 'ui-monospace', 'monospace'],
        sora: ['Sora', '"DM Sans"', 'ui-sans-serif', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'blink': 'blink 1s step-end infinite',
        'drift-a': 'driftA 22s ease-in-out infinite',
        'drift-b': 'driftB 26s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'spin-slow': 'spin 4s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        driftA: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(4%, 6%) scale(1.08)' },
          '66%': { transform: 'translate(-3%, 3%) scale(0.96)' },
        },
        driftB: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '40%': { transform: 'translate(-5%, -4%) scale(1.05)' },
          '75%': { transform: 'translate(3%, -5%) scale(0.94)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.7' },
        },
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
}