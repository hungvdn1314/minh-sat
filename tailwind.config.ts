import type { Config } from 'tailwindcss';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        detective: {
          bg: '#0a0d14',
          panel: '#101522',
          card: '#161d30',
          border: '#242f4d',
          accent: '#d97706', // amber-600
          danger: '#dc2626', // red-600
          text: '#f1f5f9',
          muted: '#94a3b8'
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        serif: ['Merriweather', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
} satisfies Config;
