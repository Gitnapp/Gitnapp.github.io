import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages serves plain files: no Node server, no Image Optimization API.
  output: "export",
  // Keeps the published URL shape (`/about/` → `about/index.html`), so existing
  // inbound links and feed items stay valid.
  trailingSlash: true,
  images: { unoptimized: true },
  // @gitnapp/* ship as source (.tsx/.css) by design — the consumer compiles them.
  transpilePackages: ["@gitnapp/ui"],
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
