import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    // Игнорируем ошибки ESLint при сборке
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
