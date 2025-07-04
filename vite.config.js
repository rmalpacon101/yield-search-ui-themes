import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 5173,
    host: true,
  },
  base: "/yield-search-ui-themes/",
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
});
