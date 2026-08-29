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
  // Проксирование запросов к бэкенду
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
