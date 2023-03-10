import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  server: {
    port: 5173,
  },
  plugins: [react(), svgr(), visualizer({ emitFile: true })],
});
