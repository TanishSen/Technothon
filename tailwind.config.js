/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        francois: ['"Francois One"', "sans-serif"],
      },
      colors: {
        "tech-gray": "#a0a0a0",
      },
    },
  },
  plugins: [],
};
