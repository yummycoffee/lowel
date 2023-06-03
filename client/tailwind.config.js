/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        main: "'Inter', sans-serif",
        title: "'Koulen', serif",
      },
      colors: {
        secondary: '#D9D9D9',
        accent: '#1E1E1E',
      },
      boxShadow: {
        main: '0px 4px 0px #000000;',
        hover: '0px 8px 0px #000000;',
      },
      animation: {
        enter: 'enter 200ms ease-out',
        leave: 'leave 150ms ease-in forwards',
      },
      keyframes: {
        enter: {
          '0%': { transform: 'scale(0.9)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        leave: {
          '0%': { transform: 'scale(1)', opacity: 1 },
          '100%': { transform: 'scale(0.9)', opacity: 0 },
        },
      },
    },
  },
  plugins: [],
}
