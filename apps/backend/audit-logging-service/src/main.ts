// Инициализируем трейсинг до создания приложения
import { initializeTracing } from "@repo/service-telemetry";
import { AppModule } from "./app/app.module";
import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

initializeTracing({
  serviceName: "audit-logging-service",
  environment: process.env.NODE_ENV || "development",
  jaegerEndpoint: "http://localhost:4318/v1/traces",
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Настраиваем Kafka consumer
  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: process.env.KAFKA_CLIENT_ID || "audit-logging-service",
          brokers: [`localhost:${process.env.KAFKA_PORT || 9092}`],
        },
        consumer: {
          groupId: "audit-logging-consumer-server",
        },
      },
    },
    { inheritAppConfig: true },
  );

  // Включаем CORS
  app.enableCors({
    origin: "http://localhost:4200",
    credentials: true,
  });

  // Запускаем микросервисы
  await app.startAllMicroservices();
  Logger.log("🚀 Microservices started (Kafka consumer ready)");

  // Запускаем HTTP сервер
  const port = process.env.PORT || 4201;
  await app.listen(port);
  Logger.log(`🚀 HTTP server is running on: http://localhost:${port}`);
}

bootstrap();
