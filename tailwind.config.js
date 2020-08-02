module.exports = {
  purge: [],
  theme: {
    extend: {
      rotate: {
        "15": "15deg",
      },
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/custom-forms")],
};
