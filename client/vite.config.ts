import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint2";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslint({
      include: ["src/**/*.ts", "src/**/*.tsx"], // files to lint
      exclude: ["node_modules"],               // skip node_modules
    }),
  ],
  server: { port: 5173 },
});
