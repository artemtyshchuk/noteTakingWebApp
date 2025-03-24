import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { data } from "react-router";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      components: path.resolve(__dirname, "src/components"),
      assets: path.resolve(__dirname, "src/assets"),
      utils: path.resolve(__dirname, "src/utils"),
      store: path.resolve(__dirname, "src/store"),
      pages: path.resolve(__dirname, "src/pages"),
      types: path.resolve(__dirname, "src/types"),
      hooks: path.resolve(__dirname, "src/hooks"),
      context: path.resolve(__dirname, "src/context"),
      data: path.resolve(__dirname, "src/data"),
    },
  },
});
