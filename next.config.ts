import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

const nextConfig: NextConfig = withMDX({
  output: "standalone",
  pageExtensions: ["ts", "tsx", "mdx"],
});

export default nextConfig;
