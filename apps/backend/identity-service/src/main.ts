import { AppModule } from "./app.module";
import { NestFactory } from "@nestjs/core";
import { NestIdentityServiceEnvService } from "@repo/env-config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Получаем порт из сервиса окружения
  const envService = app.get(NestIdentityServiceEnvService);
  const port = envService.get("PORT");

  await app.listen(port);
  console.log(`Audit logging service running on port ${port}`);
}

bootstrap();
