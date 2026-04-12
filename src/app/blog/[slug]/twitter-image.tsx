// Re-export the OG image generator for Twitter card images.
// Next.js uses this file-convention to serve twitter:image meta tags.
export { default, runtime, alt, size, contentType } from "./opengraph-image";
