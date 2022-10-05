/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          main: "#00647D",
          dark: "#174C59",
        },
        neutral: "#252525",
        warning: "#CF3F1B",
      },
      fontFamily: {
        sans: ["游ゴシック体", "Yu Gothic", "YuGothic", "sans-serif"],
      },
    },
  },
};
