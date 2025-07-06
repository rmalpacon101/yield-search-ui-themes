import { defineConfig } from "vite";
import { resolve } from 'path';

export default defineConfig({
  server: {
    port: 5173,
    host: true,
  },
  // Since the site is deployed at the root domain, no base path needed
  // base: "/yield-search-ui-themes/",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        products: resolve(__dirname, 'products.html'),
        'search-box': resolve(__dirname, 'search-box.html'),
        demo1: resolve(__dirname, 'demo1.html'),
        groceries: resolve(__dirname, 'groceries.html'),
      }
    },
    copyPublicDir: true,
  },
  publicDir: 'public',
});
