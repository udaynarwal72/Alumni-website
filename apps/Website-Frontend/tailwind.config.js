// Import Google Fonts CSS
// import 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap';

// Require withMT utility from Material Tailwind React
const withMT = require("@material-tailwind/react/utils/withMT");

// Tailwind CSS configuration module
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./**/@material-tailwind/**/*.{html,js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        emereld: "#10b981",
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'], // Define Roboto font family
        montserat: ['Montserrat', 'sans-serif'], // Define Montserrat font family
        embdedcode: ['Fira Code', 'monospace'], // Define Fira Code font family
        dmserif: ['DM Serif Display', 'serif'], // Define DM Serif Display font family
        dmsans: ['DM Sans', 'sans-serif'], // Define DM Sans font family
      },
      gradientColorStops: {
        'alumniblue': 'rgba(148,229,245,1) 22%, rgba(71,115,214,1) 100%',
      }
    },
  },
  plugins: [],
};
