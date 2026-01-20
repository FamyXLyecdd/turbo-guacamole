/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        intp: {
          base: '#0B1120', // Deepest Slate
          surface: '#1E293B', // Slate 800
          surfaceLight: '#334155', // Slate 700
          highlight: '#38BDF8', // Sky 400
          accent: '#22D3EE', // Cyan 400
          muted: '#94A3B8', // Slate 400
          danger: '#EF4444', // Red 500
          success: '#10B981', // Emerald 500
        }
      },
      fontFamily: {
        mono: ['"Fira Code"', 'monospace'],
        sans: ['"Inter"', 'sans-serif'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(56, 189, 248, 0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(34, 211, 238, 0.6)', borderColor: '#22D3EE' },
        }
      }
    },
  },
  plugins: [],
}
