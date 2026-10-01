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
    build: {
      // The default minifier folds `animation` + `animation-timeline` into one shorthand
      // (`animation: … view()`), which Chrome rejects, so the `.fade-in` reveal never ran and
      // the cards stayed at opacity 0. esbuild keeps them as separate longhands.
      cssMinify: "esbuild",
    },
    resolve: {
      alias: {
        "@shared": path.resolve(import.meta.dirname, "shared"),
      },
    },
  },
});
