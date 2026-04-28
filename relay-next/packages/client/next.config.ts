import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: "../..",
  },
  compiler: {
    relay: {
      src: "./",
      language: "typescript",
      eagerEsModules: true,
    },
  },
};

export default nextConfig;
