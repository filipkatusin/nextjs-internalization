module.exports = {
  mode: "jit",
  darkMode: "class",
  content: [
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [require("@tailwindcss/custom-forms")],
  theme: {
    extend: {
      flex: {
        1: "1 1 0%",
        auto: "1 1 auto",
        initial: "0 1 auto",
        inherit: "inherit",
        none: "none",
        2: "2 2 0%",
        3: "3 3 0%",
        4: "4 4 0%",
        5: "5 5 0%",
        6: "6 6 0%",
        7: "7 7 0%",
        8: "8 8 0%",
        9: "9 9 0%",
        10: "10 10 0%",
        11: "11 11 0%",
      },
      colors: {
        blue: "#1fb6ff",
        purple: "#7e5bef",
        pink: "#ff49db",
        orange: "#ff7849",
        green: "#13ce66",
        yellow: "#ffc82c",
        "gray-dark": "#273444",
        gray: "#8492a6",
        "gray-footer": "#F8F8F8",
        black: "#191919",
        red: "#EE2D3A",
      },
      fontFamily: {
        sans: ["Graphik", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
      fontSize: {
        // '4xl': '2.25rem',
        "5xl": "2.5rem",
        "6xl": "3.5rem",
        "7xl": "4.5rem",
        "8xl": "5.5rem",
      },
      boxShadow: {
        small: "0 5px 10px rgba(0, 0, 0, 0.12)",
        medium: "0 8px 30px rgba(0, 0, 0, 0.12)",
      },
      screens: {
        "3xl": { min: "1786px" },
        // => @media (min-width: 1280px) { ... }
      },
    },
  },
};
