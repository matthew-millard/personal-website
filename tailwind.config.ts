import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        surface: "var(--surface)",
        border: "var(--border)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        error: "var(--error)",
      },
      fontFamily: {
        sohne: [["Sohne", "sans-serif"], { fontFeatureSettings: "ss01" }],
      },
    },
  },
  plugins: [],
} satisfies Config;
