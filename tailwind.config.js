/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#27D1A8",
        secondary: "#F9F9F9",
        dark: "#333333",
      },

      fontFamily: {
        Lato: ["Lato", "sans-serif"],
      },
    },

    screens: {
      xs: "400px",
    },
  },
  plugins: [],
};
