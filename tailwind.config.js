/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#A6B9FF",
        secondary: "#4F75FF",
        dark: "#333333",
      },

      fontFamily: {
        Lato: ["Lato", "sans-serif"],
      },
    },

    screens: {
      xs: "415px",
    },
  },
  plugins: [],
};
