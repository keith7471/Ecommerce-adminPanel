import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"], // Ensure Tailwind scans your files
  theme: {
    extend: {},
  },
  plugins: [daisyui], // Add DaisyUI plugin
  daisyui: {
    themes: ["dracula"], // Enable Dracula theme
  },
};