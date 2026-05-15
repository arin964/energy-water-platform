/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // class-based dark mode
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        // Light mode colors
        light: {
          bg: '#f8f9fa',
          surface: '#ffffff',
          text: '#1a1a1a',
          border: '#e0e0e0',
        },
        // Dark mode colors
        dark: {
          bg: '#0f172a',
          surface: '#1e293b',
          text: '#f1f5f9',
          border: '#334155',
        },
      },
    },
  },
  plugins: [],
}
