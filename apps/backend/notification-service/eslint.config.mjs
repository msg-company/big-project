import nestConfig from "@repo/eslint-config/nest";

export default [
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/coverage/**',
      '**/build/**',
      '**/.turbo/**',
    ]
  },
  {
    ...nestConfig
  }
];
