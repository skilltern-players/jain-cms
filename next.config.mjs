/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export keeps the microsite deployable on Vercel, Netlify or any CDN.
  output: "export",
  trailingSlash: true,
  images: {
    // next/image optimisation is unavailable with `output: "export"`.
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
  },
  reactStrictMode: true,
};

export default nextConfig;
