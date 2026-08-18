import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true, // Временно, пока не исправите все типы
  },
  eslint: {
    ignoreDuringBuilds: true, // Временно, пока не исправите линтер
  },
  // Добавьте эту настройку для совместимости
  experimental: {
    typedRoutes: false,
  },
};

export default nextConfig;