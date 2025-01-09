import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        backdrop: {
          DEFAULT: "var(--backdrop-color)",
          muted: "var(--backdrop-color-muted)",
        },
        panel: {
          DEFAULT: "var(--panel-color)",
          hover: "var(--panel-color-hover)",
        },
        color: {
          DEFAULT: "var(--text-color)",
          muted: "var(--text-color-muted)",
          subtle: "var(--text-color-subtle)",
        },
        icon: {
          DEFAULT: "var(--icon-color)",
          muted: "var(--icon-color-muted)",
          subtle: "var(--icon-color-subtle)",
        },
        line: {
          DEFAULT: "var(--divide-color)",
          muted: "var(--divide-color-muted)",
          subtle: "var(--divide-color-subtle)",
        },
        edge: {
          DEFAULT: "var(--border-color)",
          muted: "var(--border-color-muted)",
          subtle: "var(--border-color-subtle)",
        },

        // primary:
        // primary-hover:
        // primary-active:
        // primary-disabled:

        // secondary:
        // secondary-hover:
        // secondary-active:
        // secondary-disabled:
      },
      fontFamily: {
        sohne: [["Sohne", "sans-serif"], { fontFeatureSettings: "ss01" }],
      },
    },
  },
  plugins: [],
} satisfies Config;
