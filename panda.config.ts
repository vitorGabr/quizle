import { defineConfig } from "@pandacss/dev";
import { createPreset } from "@park-ui/panda-preset";

export default defineConfig({
  preflight: true,
  presets: [
    "@pandacss/preset-base",
    createPreset({
      accentColor: "violet",
      grayColor: "neutral",
      borderRadius: "lg",
    }),
  ],
  include: [
    "./src/components/**/*.{ts,tsx,js,jsx}",
    "./src/app/**/*.{ts,tsx,js,jsx}",
  ],
  exclude: [],
  jsxFramework: "react",
  outExtension: "js",
  globalCss: {
    "html, body": {
      margin: 0,
      padding: 0,
      boxSizing: "border-box",
    },
  },
  theme: {
    semanticTokens: {
      colors: {
        bg: {
          surface: {
            value: { base: "{colors.white}", _dark: "{colors.gray.1}" },
          },
        },
        letterStatus: {
          correct: {
            value: "#34e54d",
          },
          incorrect: {
            value: { base: "{colors.white}", _dark: "{colors.gray.3}" },
          },
          unanswered: {
            value: "#fdf00e",
          },
        },
      },
    },
  },
  outdir: "styled-system",
  hash: true,
});
