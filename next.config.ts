import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost:3000"],
  images: {
    unoptimized: process.env.NODE_ENV === "development",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "http",
        hostname: "couverture-jjm.local",
      },
      {
        protocol: "https",
        hostname: "llcouverture.com",
      },
      {
        protocol: "https",
        hostname: "api.llcouverture.com",
      },
    ],
  },
};

export default nextConfig;
