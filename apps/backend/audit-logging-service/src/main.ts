import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { NestAuditLoggingServiceEnvService } from "@repo/env-config";
import { AppModule } from "./app/app.module";

// Отключаем предупреждение о партиционере
process.env.KAFKAJS_NO_PARTITIONER_WARNING = "1";

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    const envService = app.get(NestAuditLoggingServiceEnvService);
    const port = envService.get("PORT");
    const kafkaPort = envService.get("KAFKA_PORT");
    const kafkaClientId = envService.get("KAFKA_CLIENT_ID");
    const kafkaGroupId = envService.get("KAFKA_GROUP_ID");

    app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: [`localhost:${kafkaPort}`],
          clientId: kafkaClientId,
        },
        consumer: {
          groupId: kafkaGroupId,
        },
      },
    });

    await app.startAllMicroservices();
    Logger.log(`🚀 Microservices started (Kafka consumer ready)`);

    await app.listen(port);
    Logger.log(`🚀 HTTP server is running on: http://localhost:${port}`);
  } catch (error) {
    Logger.error(`Error starting the application:`, error);
    process.exit(1);
  }
}

bootstrap();
