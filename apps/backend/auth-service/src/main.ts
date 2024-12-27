import { NestFactory } from "@nestjs/core";
import { NestAuthServiceEnvService } from "@repo/env-config";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Получаем порт из сервиса окружения
  const envService = app.get(NestAuthServiceEnvService);
  const port = envService.get("PORT");

  await app.listen(port);
  console.log(`Audit logging service running on port ${port}`);
}

bootstrap();
