import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Export a fully static site so we can host from Cloud Storage + CDN
  output: "export",
};

export default nextConfig;
