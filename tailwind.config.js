/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Lato", "sans-serif"],
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#22c55e",

          secondary: "#374151",

          accent: "#ea5234",

          neutral: "#1f2937",

          "base-100": "#ffffff",

          info: "#3abff8",

          success: "#4ade80",

          warning: "#fbbd23",

          error: "#f87272",
        },
      },
    ],
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwind-scrollbar"),
    require("daisyui"),
  ],
};
