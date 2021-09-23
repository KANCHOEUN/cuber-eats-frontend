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
        banner: "#FFF2D9",
      },
      spacing: {
        banner: "415px",
        input: "460px",
      },
    },
    fontFamily: {
      uber: ["Uber Move Text"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
