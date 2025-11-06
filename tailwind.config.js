/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: "#E45B2A",     // button orange (close to Figma)
        headline: "#2C2C2C",
        body: "#666666",
        field: "#F6F6F6",
        ring: "#2563EB",
      },
    },
  },
  plugins: [],
};
