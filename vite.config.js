import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: true,
    proxy: {
      '/api': {
        target: process.env.API_URL || 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Fix Tiptap ProseMirror resolution
      "@tiptap/pm/state": path.resolve(__dirname, "node_modules/@tiptap/pm/state/dist/index.js"),
      "@tiptap/pm/view": path.resolve(__dirname, "node_modules/@tiptap/pm/view/dist/index.js"),
      "@tiptap/pm/model": path.resolve(__dirname, "node_modules/@tiptap/pm/model/dist/index.js"),
      "@tiptap/pm/transform": path.resolve(__dirname, "node_modules/@tiptap/pm/transform/dist/index.js"),
      "@tiptap/pm/commands": path.resolve(__dirname, "node_modules/@tiptap/pm/commands/dist/index.js"),
      "@tiptap/pm/keymap": path.resolve(__dirname, "node_modules/@tiptap/pm/keymap/dist/index.js"),
      "@tiptap/pm/schema-list": path.resolve(__dirname, "node_modules/@tiptap/pm/schema-list/dist/index.js"),
      "@tiptap/pm/dropcursor": path.resolve(__dirname, "node_modules/@tiptap/pm/dropcursor/dist/index.js"),
      "@tiptap/pm/gapcursor": path.resolve(__dirname, "node_modules/@tiptap/pm/gapcursor/dist/index.js"),
      "@tiptap/pm/history": path.resolve(__dirname, "node_modules/@tiptap/pm/history/dist/index.js"),
    },
    extensions: [".mjs", ".js", ".jsx", ".ts", ".tsx", ".json"],
  },
  optimizeDeps: {
    include: [
      "@tiptap/react",
      "@tiptap/starter-kit",
      "@tiptap/extension-placeholder",
      "@tiptap/extension-typography",
      "@tiptap/core",
    ],
    esbuildOptions: {
      loader: {
        ".js": "jsx",
      },
    },
  },
});
