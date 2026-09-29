import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import path from "node:path";

// https://astro.build/config
export default defineConfig({
  site: "https://crupanshuudani.com",
  base: "/",
  trailingSlash: "always",
  outDir: "./dist/public",
  build: { format: "directory" },
  integrations: [react(), sitemap()],
  vite: {
    resolve: {
      alias: {
        "@shared": path.resolve(import.meta.dirname, "shared"),
      },
    },
  },
});
