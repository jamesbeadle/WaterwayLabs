/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    screens: {
      xs: "480px",
      // => @media (min-width: 640px) { ... }

      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }

      "3xl": "1920px",
      // => @media (min-width: 1920px) { ... }
    },
    fontSize: {
      xxs: ".625rem",
      xs: "0.7rem",
      sm: "0.8rem",
      base: "1rem",
      lg: "1.1rem",
      xl: "1.25rem",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
    },
    extend: {
      colors: {
        WaterwayBlue: "#048ABF",
        WaterwayLightBlue: "#89C2D9",
        WaterwayGreen: "#758C23",
        WaterwayBeige: "#A6A158",
        WaterwayCompBlue: "#213740",
        WaterwayCompGray: "#627780",
        WaterwayCompLight: "#95B3BF",
        WaterwayCompBrown: "#403121",
        WaterwayCompPink: "#958A7F",
        WaterwayCompDarkBlue: "#27393F",
        WaterwayCompGray: "#7E8F94",
      },
    },
  },
  plugins: [],
};
