const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'green-600': 'var(--green-600, #1EAA3E)',
        'green-700': 'var(--green-700, #0B6B23)',
        'yellow-400': 'var(--yellow-400, #F9C300)',
        'neutral-50': 'var(--neutral-50, #F7F9F8)',
        'neutral-800': 'var(--neutral-800, #1F2937)',
        white: 'var(--white, #FFFFFF)',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          lg: '2rem',
          xl: '4rem',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        sm: 'var(--shadow-sm, 0 1px 2px rgba(0,0,0,0.04))',
        md: 'var(--shadow-md, 0 6px 18px rgba(11,107,35,0.08))',
        lg: 'var(--shadow-lg, 0 20px 40px rgba(11,107,35,0.12))',
      },
      borderRadius: {
        xl: 'var(--radius, 1.25rem)',
        md: 'var(--radius-sm, 0.75rem)',
      },
      transitionDuration: {
        250: '250ms',
        350: '350ms',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
