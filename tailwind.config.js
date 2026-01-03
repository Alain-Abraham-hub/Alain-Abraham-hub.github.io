/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        'sky-dark': '#0f172a',
        'sky-darker': '#1a254d',
      },
      animation: {
        'fade-in-down': 'fadeInDown 0.6s ease',
        'fade-in-up': 'fadeInUp 0.8s ease',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 4px 12px rgba(56, 189, 248, 0.1)' },
          '50%': { boxShadow: '0 8px 24px rgba(56, 189, 248, 0.2)' },
        },
      },
    },
  },
  plugins: [],
}
