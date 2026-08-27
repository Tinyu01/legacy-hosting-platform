import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@legacy-hosting/catalog", "@legacy-hosting/ui"],
};

export default nextConfig;
