import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Export a fully static site so we can host from Cloud Storage + CDN
  output: "export",
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },
  // Configure experimental features for modern output
  experimental: {
    optimizePackageImports: ["@iconify/react"],
  },
};

export default nextConfig;
