import { defineConfig } from "vite";
import { resolve } from 'path';

export default defineConfig({
  server: {
    port: 5173,
    host: true,
  },
  // Update this to match your GitHub repository name
  base: "/yield-search-ui-themes/",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        products: resolve(__dirname, 'products.html'),
        'search-box': resolve(__dirname, 'search-box.html'),
        demo: resolve(__dirname, 'demo-index.html'),
      }
    },
    copyPublicDir: true,
  },
  publicDir: 'public',
});
