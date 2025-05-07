import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://ocr-ia-document-reader.onrender.com/:path*",
      },
    ];
  },
};

export default nextConfig;
