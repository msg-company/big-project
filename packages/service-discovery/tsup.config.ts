import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/**/*.ts"],
  format: ["cjs", "esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  outDir: "dist",
  external: ["@nestjs/common", "@nestjs/core", "@nestjs/terminus", "@nestjs/axios", "@nestjs/core", "rxjs", "reflect-metadata", "kafkajs"],
});
