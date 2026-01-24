import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server:{
    host: "0.0.0.0",
    port: 3001,
  },
  build: {
    chunkSizeWarningLimit: 1600, 
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('firebase')) {
              return 'firebase';
            }
            if (id.includes('three') || id.includes('@react-three')) {
              return 'vendor'; // Merge three with main vendor to avoid split chunk issues
            }
            if (id.includes('motion')) {
              return 'motion';
            }
            return 'vendor';
          }
        }
      }
    }
  },
});
