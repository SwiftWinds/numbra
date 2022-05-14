import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [solidPlugin({
    babel: {
      plugins: ["solid-styled-jsx/babel"],
    },
  })],
  build: {
    target: "esnext",
    polyfillDynamicImport: false,
  },
});
