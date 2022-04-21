const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        current: 'currentColor',
        danger: colors.blue,
        primary: colors.teal,
        secondary: colors.orange,
        neutral: colors.red,
        white: '#FFF',
        gray: colors.gray,
        blue: colors.blue,
        indigo: colors.indigo,
        black: colors.black,
      },
    },
  },
  variants: {},
  plugins: [],
}
