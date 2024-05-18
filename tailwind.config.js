/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors:{
        "tax-gray": "#F2F2F2",
        "tax-lime": "#B0C892"
      },
      fontFamily: {
        "manrope": ['Manrope', "sans-serif"]
      }
    },
  },
  plugins: [],
}

