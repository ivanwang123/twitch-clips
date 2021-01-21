module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        portrait: { raw: "(max-width: 1024px) and (orientation: portrait)" },
        landscape: { raw: "(max-width: 1024px) and (orientation: landscape)" },
      },
      boxShadow: {
        "3xl": "0 0px 60px -15px rgba(0, 0, 0, 0.7)",
      },
      minHeight: {
        2: "2.5rem",
      },
      width: {
        100: "32rem",
      },
      backgroundColor: (theme) => ({
        ...theme("colors"),
        dark: "#090D15",
      }),
      gridTemplateRows: {
        vert: "50px 1fr",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
