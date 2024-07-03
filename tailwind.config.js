/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,vue}"],
  theme: {
    extend: {},
  },
  plugins: [require("tailwindcss-animate"),require('@tailwindcss/aspect-ratio'),],
}

 