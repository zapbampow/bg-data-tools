import react from "@vitejs/plugin-react-swc";
import * as path from "path";
import { defineConfig } from "vite";
import topLevelAwait from "vite-plugin-top-level-await";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    topLevelAwait({
      // The export name of top-level await promise for each chunk module
      promiseExportName: "__tla",
      // The function to generate import names of top-level await promise in each chunk module
      promiseImportName: (i) => `__tla_${i}`,
    }),
  ],
  resolve: {
    alias: [{ find: "~", replacement: path.resolve(__dirname, "src") }],
  },
});
