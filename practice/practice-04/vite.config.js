import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";

export default {
  base: "./",
  root: "./src",
  publicDir: "../static",
  plugins: [wasm(), topLevelAwait()],
};
