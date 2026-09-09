import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',           // КЛЮЧЕВОЕ изменение
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  experimental: { typedRoutes: false },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://212.113.123.62:8000/:path*',
      },
    ];
  },
};

export default nextConfig;
