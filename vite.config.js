import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/asmx": {
        target: "http://148.72.215.143:1355",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/asmx/, "")
      },
      "/api2025": {
        target: "http://148.72.215.143:2025",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api2025/, "")
      }
    }
  }
});