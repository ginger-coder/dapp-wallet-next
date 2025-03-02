/** @type {import('next').NextConfig} */
const nextConfig = {
    // 启用 Edge Runtime
    experimental: {
      // 如果使用 Next.js 13 的 App Router，则开启下面的配置
      appDir: true,
    },
    // 使用 Cloudflare 兼容的配置
    webpack: (config, { isServer, nextRuntime }) => {
      // Cloudflare Worker 不支持 Node.js API
      if (isServer && nextRuntime === 'edge') {
        config.resolve.fallback = {
          ...config.resolve.fallback,
          // 禁用不兼容的 Node 模块
          fs: false,
          path: false,
          crypto: false,
          zlib: false,
          stream: false,
        };
      }
      return config;
    },
    // Cloudflare 支持的输出模式
    output: 'standalone',
  };
  
  module.exports = nextConfig;