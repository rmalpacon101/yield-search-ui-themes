/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./**/*.{razor,html,cshtml}"],
    plugins: [require("@tailwindcss/typography"), require("daisyui")],
    theme: {
        fontWeight: {
            semibold: 500
        }
    },
    daisyui: {
        themes: [
            "light",
            "dark",
            "dracula"
        ],
    }
}
