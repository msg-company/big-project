/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,

  // Оптимизация производительности
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Настройка для поддержки BF Cache
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },

  // Настройка CSP и других заголовков безопасности
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' 'strict-dynamic'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https:",
              "font-src 'self' data:",
              "connect-src 'self' https:",
              "manifest-src 'self'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              "object-src 'none'",
              "require-trusted-types-for 'script'",
            ].join('; '),
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },

  // Настройка webpack для source maps и оптимизации
  webpack: (config, { dev, isServer }) => {
    // Включаем source maps в production
    if (!dev) {
      config.devtool = 'source-map';
    }

    // Оптимизация размера бандла
    config.optimization = {
      ...config.optimization,
      minimize: true,
      moduleIds: 'deterministic',
      runtimeChunk: {
        name: 'runtime',
      },
      splitChunks: {
        chunks: 'all',
        minSize: 20000,
        minRemainingSize: 0,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        enforceSizeThreshold: 50000,
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      },
    };

    // Оптимизация для modern JavaScript
    config.module.rules.push({
      test: /\.(js|mjs|jsx|ts|tsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            [
              'next/babel',
              {
                'preset-env': {
                  targets: {
                    browsers: ['chrome 87', 'safari 14', 'firefox 84'],
                  },
                  modules: false,
                  useBuiltIns: 'usage',
                  corejs: 3,
                },
              },
            ],
          ],
        },
      },
    });

    return config;
  },
};

export default nextConfig;
