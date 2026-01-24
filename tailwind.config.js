/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        'slide-up': 'slide-up 0.3s ease-out',
      },
      backgroundImage: {
        'gradient-custom': 'linear-gradient(to right, #1e3a8a, #FFD700)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
