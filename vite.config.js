import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [react(), visualizer()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id) return;

          if (id.includes("node_modules")) {
            if (id.includes("react-dom") || id.includes("react")) {
              return "react-vendor";
            }
            if (id.includes("react-router-dom")) {
              return "react-router";
            }
            if (id.includes("firebase")) {
              return "firebase";
            }
            if (id.includes("antd")) {
              return "antd";
            }
            if (id.includes("zustand")) {
              return "zustand";
            }
            return "vendor";
          }
        },
      },
    },
  },
});
