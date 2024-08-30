import { fontFamily } from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/assets/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        color: {
          1: "#AC6AFF",
          2: "#FFC876",
          3: "#FF776F",
          4: "#7ADB78",
          5: "#858DFF",
          6: "#FF98E2",
        },
        stroke: {
          1: "#26242C",
        },
        n: {
          1: "#FFFFFF",
          2: "#CAC6DD",
          3: "#ADA8C3",
          4: "#757185",
          5: "#3F3A52",
          6: "#252134",
          7: "#15131D",
          8: "#0E0C15",
          9: "#474060",
          10: "#43435C",
          11: "#1B1B2E",
          12: "#2E2A41",
          13: "#6C7275",
        },
      },
      fontFamily: {
        sans: ["var(--font-sora)", ...fontFamily.sans],
        code: "var(--font-code)",
        grotesk: "var(--font-grotesk)",
      },
      letterSpacing: {
        tagline: "0.24em", // 0.15em * 1.6
      },
      spacing: {
        0.4: "0.1rem", // 0.0625rem * 1.6
        12: "3rem", // 1.875rem * 1.6
        24: "6rem", // 3.75rem * 1.6
      },
      opacity: {
        24: "0.24", // 0.15 * 1.6
      },
      transitionDuration: {
        DEFAULT: "200ms",
      },
      transitionTimingFunction: {
        DEFAULT: "linear",
      },
      zIndex: {
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
      },
      borderWidth: {
        DEFAULT: "0.1rem", // 0.0625rem * 1.6
      },
      backgroundImage: {
        "radial-gradient": "radial-gradient(var(--tw-gradient-stops))",
        "conic-gradient":
          "conic-gradient(from 225deg, #FFC876, #79FFF7, #9F53FF, #FF98E2, #FFC876)",
        "benefit-card-1": "url(assets/benefits/card-1.svg)",
        "benefit-card-2": "url(assets/benefits/card-2.svg)",
        "benefit-card-3": "url(assets/benefits/card-3.svg)",
        "benefit-card-4": "url(assets/benefits/card-4.svg)",
        "benefit-card-5": "url(assets/benefits/card-5.svg)",
        "benefit-card-6": "url(assets/benefits/card-6.svg)",
      },
    },
  },
  plugins: [
  plugin(function ({ addBase, addComponents, addUtilities }) {
    addBase({});
    addComponents({
      ".container": {
        "@apply max-w-[124rem] mx-auto px-8 md:px-16 lg:px-24 xl:max-w-[140rem]":
          {}, // 77.5rem * 1.6 = 124rem, 87.5rem * 1.6 = 140rem
      },
      ".h1": {
        "@apply font-semibold text-[4rem] leading-[5.2rem] md:text-[4.4rem] md:leading-[6rem] lg:text-[5.2rem] lg:leading-[6.5rem] xl:text-[6rem] xl:leading-[7.2rem]":
          {}, // 2.5rem * 1.6 = 4rem, 3.25rem * 1.6 = 5.2rem, ...
      },
      ".h2": {
        "@apply text-[2.8rem] leading-[4rem] md:text-[3.2rem] md:leading-[4rem] lg:text-[4rem] lg:leading-[5.6rem] xl:text-[4.8rem] xl:leading-tight":
          {}, // 1.75rem * 1.6 = 2.8rem, 2.5rem * 1.6 = 4rem, ...
      },
      ".h3": {
        "@apply text-[3.2rem] leading-normal md:text-[4rem]":
          {}, // 2rem * 1.6 = 3.2rem
      },
      ".h4": {
        "@apply text-[3.2rem] leading-normal":
          {}, // 2rem * 1.6 = 3.2rem
      },
      ".h5": {
        "@apply text-3xl leading-normal":
          {}, // 2xl * 1.6 = 3xl
      },
      ".h6": {
        "@apply font-semibold text-xl leading-12":
          {}, // lg * 1.6 = xl, 8 * 1.6 = 12
      },
      ".body-1": {
        "@apply text-[1.4rem] leading-[2.4rem] md:text-[1.6rem] md:leading-[2.8rem] lg:text-[2rem] lg:leading-8":
          {}, // 0.875rem * 1.6 = 1.4rem, 1.5rem * 1.6 = 2.4rem, ...
      },
      ".body-2": {
        "@apply font-light text-[1.4rem] leading-9.6 md:text-base":
          {}, // 0.875rem * 1.6 = 1.4rem, 6 * 1.6 = 9.6
      },
      ".caption": {
        "@apply text-base":
          {}, // sm * 1.6 = base
      },
      ".tagline": {
        "@apply font-grotesk font-light text-base tracking-tagline uppercase":
          {}, // xs * 1.6 = base
      },
      ".quote": {
        "@apply font-code text-xl leading-normal":
          {}, // lg * 1.6 = xl
      },
      ".button": {
        "@apply font-code text-base font-bold uppercase tracking-wider":
          {}, // xs * 1.6 = base
      },
    });
    addUtilities({
      ".tap-highlight-color": {
        "-webkit-tap-highlight-color": "rgba(0, 0, 0, 0)",
      },
    });
  }),
],}