import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML in out/, no server needed
  output: "export",
  images: { unoptimized: true },
  poweredByHeader: false,
  // site/ has its own lockfile; without this Next picks the scraper's folder as the root
  turbopack: { root: fileURLToPath(new URL(".", import.meta.url)) },
  agentRules: false,
  // Inline the (small) Tailwind CSS into the HTML: one less render-blocking request before first paint
  experimental: { inlineCss: true },
};

export default nextConfig;
