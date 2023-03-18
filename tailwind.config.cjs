/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'alfa-slab-one': ['"Alfa Slab One"', 'regular'],
        'comfortaa': ['"Comfortaa"', 'light'],
      },
      colors: {purple: "#5974A9"}
      
    },
    
  },
  plugins: [],
};
