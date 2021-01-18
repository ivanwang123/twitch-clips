module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        portrait: { raw: "(orientation: portrait)" },
        landscript: { raw: "(orientation: landscape)" },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
