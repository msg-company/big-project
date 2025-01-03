import nestConfig from '@repo/eslint-config/nest.config.mjs';
import nextConfig from '@repo/eslint-config/next.config.mjs';

export default [
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.next/**',
      '**/coverage/**',
      '**/build/**',
      '**/.turbo/**',
      '**/public/**',
      '**/.vercel/**',
    ]
  },
  {
    files: ['apps/backend/**/*.ts'],
    ...nestConfig
  },
  {
    files: ['apps/frontend/**/*.{ts,tsx}'],
    ...nextConfig
  }
];
