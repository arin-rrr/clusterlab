import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  typescript: { ignoreBuildErrors: true },
  experimental: { typedRoutes: false },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;