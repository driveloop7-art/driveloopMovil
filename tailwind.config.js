/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#C91843",
          dark: "#9B1B39",
          deep: "#870027",
        },
        secondary: "#282828",
        accent: "#111111",
      },
      fontFamily: {
        'roboto-bold': ['Roboto-Bold', 'sans-serif'],
        'roboto-light': ['Roboto-Light', 'sans-serif'],
        'roboto-medium': ['Roboto-Medium', 'sans-serif'],
      }
    },
  },
  plugins: [],
}