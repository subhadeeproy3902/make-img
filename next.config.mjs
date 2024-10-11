/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
    unoptimized: false
  },
  compiler: {
    removeConsole: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "pixlet.net", // * wildcard on dynamic part of domain url
        },
      ],
    }
  },
};

export default nextConfig;
