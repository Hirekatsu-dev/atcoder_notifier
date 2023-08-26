/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{index,vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'black',
        warn: 'orange',
        error: 'red',
        danger: 'red',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
