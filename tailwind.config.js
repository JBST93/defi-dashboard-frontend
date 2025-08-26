/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        'price-up': {
          '0%, 100%': { transform: 'scale(1)', backgroundColor: 'transparent' },
          '50%': {
            transform: 'scale(1.1)',
            backgroundColor: 'rgba(34, 197, 94, 0.1)',
          },
        },
        'price-down': {
          '0%, 100%': { transform: 'scale(1)', backgroundColor: 'transparent' },
          '50%': {
            transform: 'scale(1.1)',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
          },
        },
      },
      animation: {
        'price-up': 'price-up 1s ease-in-out',
        'price-down': 'price-down 1s ease-in-out',
      },
    },
  },
  plugins: [],
};
