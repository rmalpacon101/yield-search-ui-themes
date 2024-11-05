/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./**/*.{js,ts,jsx,tsx}"],
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  theme: {
    fontWeight: {
      semibold: 500,
    },
  },
  daisyui: {
    themes: [
      "light",
      "dark",
      "dracula",
      "corporate",
      "cupcake",
      "emerald",
    ],
  },
};
