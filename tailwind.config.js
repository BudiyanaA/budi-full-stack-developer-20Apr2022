const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      current: 'currentColor',
      primary: colors.teal,
      secondary: colors.orange,
      neutral: colors.blue,
      white: '#FFF',
      gray: colors.gray,
      blue: colors.blue,
      indigo: colors.indigo,
      black: colors.black,
    },
    extend: {},
  },
  variants: {},
  plugins: [],
}
