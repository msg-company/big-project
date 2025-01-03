import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/generate/index.ts'],
  format: ['cjs', 'esm'],
  dts: {
    resolve: true,
  },
  clean: true,
  minify: false,
  sourcemap: true,
  external: ['@nestjs/common', '@nestjs/config'],
});
