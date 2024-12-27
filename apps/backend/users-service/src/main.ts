import { NestFactory } from "@nestjs/core";
import { NestUsersServiceEnvService } from "@repo/env-config";
import { AppModule } from "./app/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Получаем порт из сервиса окружения
  const envService = app.get(NestUsersServiceEnvService);
  const port = envService.get("PORT");

  await app.listen(port);
  console.log(`Users service running on port ${port}`);
}

bootstrap();
