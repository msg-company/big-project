import { AppModule } from "./app.module";
import { NestFactory } from "@nestjs/core";
import { NestNotificationServiceEnvService } from "@repo/env-config";
import { initializeTracing } from "@repo/telemetry";

initializeTracing({
  serviceName: "notification-service",
  environment: process.env.NODE_ENV,
  jaegerEndpoint: process.env.JAEGER_ENDPOINT,
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Получаем порт из сервиса окружения
  const envService = app.get(NestNotificationServiceEnvService);
  const port = envService.get("PORT");

  await app.listen(port);
  console.log(`Audit logging service running on port ${port}`);
}

bootstrap();
