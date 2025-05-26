// tailwind.config.js
const {heroui} = require("@heroui/theme");
import withmt from "@material-tailwind/react/utils/withMT";

/** @type {import('tailwindcss').Config} */
module.exports = withmt({
  content: [
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [heroui()],
}) ;