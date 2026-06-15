import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    host: true,
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: "assets/plugin.js",
        assetFileNames: "assets/plugin.css",
        chunkFileNames: "assets/chunk.js",
        manualChunks: undefined,
      },
    },
  },
});
