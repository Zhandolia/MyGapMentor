import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
export default defineConfig({
  base: "./",
  plugins: [react()],
  build: { outDir: "build" },
  test: { globals: true, environment: "node", include: ["src/**/*.test.js"] },
});
