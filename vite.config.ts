/// <reference types="vitest" />
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: "jsdom",
    exclude: [
      "**/.{idea,git,cache,output,temp}/**",
      "**/dist/**",
      "**/node_modules/**",
      "./test/pages/**",
    ],
    globals: true,
    setupFiles: "./src/test/setup.ts",
    alias: {
      "@/": new URL("./src/", import.meta.url).pathname,
      "@components/": new URL("./src/components/", import.meta.url).pathname,
      "@pages/": new URL("./src/pages/", import.meta.url).pathname,
      "@utils": new URL("./src/utils/", import.meta.url).pathname,
    },
  },
});
