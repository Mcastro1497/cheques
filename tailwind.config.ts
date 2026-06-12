import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta LB Finanzas
        violeta: {
          DEFAULT: "#522398", // primario
          comp: "#5632b2", // secundario complementario
          acento: "#8555ff", // secundario acento
        },
        lavanda: "#f4e9fe",
        verde: "#73ffa1", // verde acento
        tinta: "#2c2b2e", // negro primario
        papel: "#fbfafd", // blanco primario
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};

export default config;
