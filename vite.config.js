import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path"; // ← ADD THIS

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0",
    port: 3001,
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin-allow-popups",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "SAMEORIGIN",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "Permissions-Policy": "camera=(), microphone=(self), geolocation=(), payment=(), usb=()",
    },
  },
  optimizeDeps: {
    exclude: [],
  },
  resolve: {
    alias: [
      // ← consistent array-of-objects format
      { find: /^node:.*$/, replacement: "/Users/frederickahobaut/App/cvfred/Cv_Online/src/polyfills/node-empty.js" },
      { find: "@", replacement: path.resolve(__dirname, "./src") }, // ← fixed
    ],
  },
  build: {
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("firebase")) return "firebase";
            if (id.includes("three") || id.includes("@react-three")) return "vendor";
            if (id.includes("motion")) return "motion";
            return "vendor";
          }
        },
      },
    },
  },
});