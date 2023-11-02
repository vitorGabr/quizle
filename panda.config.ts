import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  preflight: true,
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
    body: {
      backgroundColor: "black",
      color: "white",
    },
  },
  outdir: "styled-system",
});
