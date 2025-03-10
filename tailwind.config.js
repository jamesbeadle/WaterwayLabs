/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    screens: {
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1920px",
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
      "6xl": "4rem",
      h1: ["90px", { lineHeight: "81px" }],
      h4: ["20px", { lineHeight: "18px" }],
    },
    extend: {
      colors: {
        BrandGray: "#272727",
        BrandBlue: "#2D5F73",
        BrandTurquoise: "#4FD9FD",
        BrandTeal: "#4F91A6",
        BrandRipple: "#88C9D0",
        BrandLightBlue: "#D4F1F9",
        BrandGreen: "#8DAE92",
        BrandBeige: "#F0ECE2",
        BrandBrown: "#1A202C",
        BrandSuccess: "#64AD54",
        BrandDeclineRed: "#FF403C",
        BrandYellow: "#F4C802",
      },
      fontFamily: {
        mona: ['"Mono Sans Expanded"', "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      fontWeight: {
        semi: 600,
        med: 500,
        light: 300,
        exlight: 200,
      },
      fontSize: {
        h1: ["90px", { lineHeight: "81px" }],
        h2: ["72px", { lineHeight: "75px" }],
        h3: ["40px", { lineHeight: "36px" }],
        h4: ["20px", { lineHeight: "18px" }],
        h4small: ["18px", { lineHeight: "16.2px" }],
        body: ["16px", { lineHeight: "22.4px" }],
        bodysmall: ["14px", { lineHeight: "20px" }],
      },
      keyframes: {
        "ring-pulse": {
          "0%": {
            boxShadow: "0 0 0 0 rgba(255, 255, 255, 0.4)",
          },
          "70%": {
            boxShadow: "0 0 0 10px rgba(255, 255, 255, 0)",
          },
          "100%": {
            boxShadow: "0 0 0 0 rgba(255, 255, 255, 0)",
          },
        },
      },
      animation: {
        "ring-pulse": "ring-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};
