import type { NextConfig } from "next";

// GitHub Pages serves this site from a project subdirectory
// (https://<user>.github.io/<repo>/), so every asset and internal link needs
// that subdirectory prefixed. NEXT_PUBLIC_BASE_PATH carries it in from the
// environment (set to "/<repo-name>" in the deploy workflow) and is empty for
// local dev. It is also read at runtime by the asset() helper in
// src/lib/site.ts (added in Step 3) for any raw reference to a public/ file.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Static export: GitHub Pages only serves static files. No API routes,
  // server actions, middleware, ISR, or runtime image optimization.
  output: "export",

  basePath,
  assetPrefix: basePath,

  images: {
    // No server to run the default image optimizer against on GitHub Pages.
    unoptimized: true,
  },

  // /about -> /about/index.html, so links resolve without server rewrites.
  trailingSlash: true,

  // Pins module resolution to this project. Without this, Turbopack walks up
  // looking for a lockfile and can lock onto an unrelated one outside this
  // repo (e.g. a stray package-lock.json in a parent directory).
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
