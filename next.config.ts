import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    CMS_API_URL: process.env.CMS_API_URL || "http://porto-cms-api:3001",
  },
};

export default nextConfig;
