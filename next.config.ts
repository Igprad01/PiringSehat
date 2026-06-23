import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  images: {
    unoptimized: true,
  },
  // cacheComponents: true,
  experimental: {
    cpus: 1,
    workerThreads: false,
  },


};



export default nextConfig;
