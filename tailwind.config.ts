import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--primary-color)",
          hover: "var(--primary-color-hover)",
        },
        backdrop: {
          DEFAULT: "var(--backdrop-color)",
          muted: "var(--backdrop-color-muted)",
          strong: "var(--backdrop-color-strong)",
        },
        panel: {
          DEFAULT: "var(--panel-color)",
          hover: "var(--panel-color-hover)",
        },
        color: {
          DEFAULT: "var(--text-color)",
          muted: "var(--text-color-muted)",
          subtle: "var(--text-color-subtle)",
          hover: "var(--text-color-hover)",
          strong: "var(--text-color-strong)",
        },
        link: {
          DEFAULT: "var(--link-color)",
          muted: "var(--link-color-muted)",
          hover: "var(--link-color-hover)",
          active: "var(--link-color-active)",
        },
        icon: {
          DEFAULT: "var(--icon-color)",
          muted: "var(--icon-color-muted)",
          subtle: "var(--icon-color-subtle)",
          hover: "var(--icon-color-hover)",
        },
        line: {
          DEFAULT: "var(--divide-color)",
          muted: "var(--divide-color-muted)",
          subtle: "var(--divide-color-subtle)",
        },
        edge: {
          DEFAULT: "var(--border-color)",
          muted: {
            DEFAULT: "var(--border-color-muted)",
            extra: "var(--border-color-muted-extra)",
          },
          subtle: "var(--border-color-subtle)",
        },
        error: "var(--error-color)",
        tag: {
          DEFAULT: "var(--tag-color)",
          algodata: {
            DEFAULT: "var(--tag-color-algodata)",
            hover: "var(--tag-color-algodata-hover)",
          },
          webdev: {
            DEFAULT: "var(--tag-color-webdev)",
            hover: "var(--tag-color-webdev-hover)",
          },
          proglang: {
            DEFAULT: "var(--tag-color-proglang)",
            hover: "var(--tag-color-proglang-hover)",
          },
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
