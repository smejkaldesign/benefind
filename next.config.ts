import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

const merged = withMDX({
  output: "standalone",
  pageExtensions: ["ts", "tsx", "mdx"],
});

// @next/mdx v16 generates turbopack rules incompatible with Next 15.5.
// Remove them so turbopack falls back to its built-in MDX handling.
delete merged.turbopack;

const nextConfig: NextConfig = merged;

export default nextConfig;
