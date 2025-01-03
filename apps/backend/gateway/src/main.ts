import { initializeTracing } from "@repo/service-telemetry";

initializeTracing({
  serviceName: "getaway-service",
  environment: process.env.NODE_ENV || "development",
  jaegerEndpoint: "http://localhost:4318/v1/traces",
});

import { AppModule } from "./app.module";
import { NestFactory } from "@nestjs/core";
import { NestGatewayEnvService } from "@repo/env-config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const envService = app.get(NestGatewayEnvService);
  const port = envService.get("PORT");

  await app.listen(port, () => {
    console.log(`Gateway service running on port ${port}`);
  });
}

bootstrap();
