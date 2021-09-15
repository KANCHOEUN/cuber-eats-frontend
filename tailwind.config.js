const colors = require("tailwindcss/colors");

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        lime: colors.lime,
        primary: "#3E9920",
        secondary: "#2F7318",
        disabled: "#E0E0E0",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
