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
        WaterwayBase: "#73A2BF",
        WaterwayBaseA: "#364C59",
        WaterwayBaseB: "#B6DBF2",
        WaterwayBaseC: "#96C6D9",
        WaterwayBaseD: "#C9E7F2",
        WaterwayLightGreen: "#73BFAB",
        WaterwayGreen: "#73BFB3",
        WaterwayDarkGreen: "#1B332F",
        OpenFPLBase: "#2ce3a6",
        OpenFPLBaseA: "#2ADA9F",
        OpenFPLBaseB: "#23B887",
        OpenFPLBaseC: "#1D966E",
        OpenFPLBaseD: "#167455",
        OpenFPLAction: "#7f56f1",
        OpenFPLActionA: "#462F84",
        OpenFPLActionB: "#583CA6",
        OpenFPLActionC: "#6A48C8",
        OpenFPLActionD: "#7C54EA",
        OpenFPLBackground: "#2e323a",
        OpenFPLBackgroundA: "#788398",
        OpenFPLBackgroundB: "#93A0BA",
        OpenFPLBackgroundC: "#AEBDDC",
        OpenFPLBackgroundD: "#C9DBFE",
        KingsBlue: "#009AE7",
        KingsBlueA: "#006DA3",
        KingsBlueB: "#005681",
        KingsBlueC: "#194B63",
        KingsBlueD: "#001824",
        KingsBlueE: "#5288A3",
        KingsPink: "#BF95A7",
        KingsPinkA:"#80626E",        
        KingsGreen: "#8AEBA6",
        KingsGreenB: "#769C8D"
      },
    },
  },
  plugins: [],
};
