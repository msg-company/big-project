import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { NestAuthServiceEnvService } from "@repo/env-config";
import { AppModule } from "./app/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ["error", "warn", "debug", "log", "verbose"],
  });
  const envService = app.get(NestAuthServiceEnvService);
  const port = envService.get("PORT");

  app.enableCors({
    origin: "http://localhost:4200",
    credentials: true,
  });

  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();
