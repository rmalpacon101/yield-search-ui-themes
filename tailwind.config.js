/** @type {import('tailwindcss').Config} */
import typography from "@tailwindcss/typography";
import daisyui from "daisyui";

export default {
  content: ["./*.{js,html}"],
  plugins: [typography, daisyui],
  theme: {
    fontWeight: {
      semibold: 500,
      bolder: 900
    },
    extend: {
      padding: {
        '1/12': '8.333333%',
      },
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