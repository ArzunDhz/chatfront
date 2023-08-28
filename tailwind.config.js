/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1D2127",
        secondary: "#222529",
        pop: "#28FFA5",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
    screens: {
      sm: { max: "810px" },
      md: { min: "811px" },
      lg: { min: "1025px" },
    },
  },
  plugins: [],
};
