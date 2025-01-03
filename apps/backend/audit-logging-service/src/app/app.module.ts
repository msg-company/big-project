import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { NestAuditLoggingServiceEnvService } from "@repo/env-config";
import { DiscoveryModule } from "@repo/service-discovery";
import { TelemetryModule } from "@repo/service-telemetry";
import * as path from "path";
import { LogsController } from "./controllers/logs.controller";
import { ElkService } from "./services/elk.service";

const ENV_SERVICE_PROVIDER = {
  provide: NestAuditLoggingServiceEnvService,
  useClass: NestAuditLoggingServiceEnvService,
};

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [path.resolve(process.cwd(), `.env.${process.env.NODE_ENV || "development"}`)],
    }),
    TelemetryModule.forRoot({
      serviceName: "audit-logging-service",
      environment: process.env.NODE_ENV || "development",
      jaegerEndpoint: "http://localhost:4318/v1/traces",
    }),
    ClientsModule.registerAsync([
      {
        name: "KAFKA_SERVICE",
        useFactory: (envService: NestAuditLoggingServiceEnvService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: envService.get("KAFKA_CLIENT_ID"),
              brokers: [`localhost:${envService.get("KAFKA_PORT")}`],
              retry: {
                initialRetryTime: 100,
                retries: 5,
              },
            },
            consumer: {
              groupId: "audit-logging-consumer",
              sessionTimeout: 30000,
              heartbeatInterval: 3000,
              maxBytesPerPartition: 1048576,
              retry: {
                initialRetryTime: 100,
                retries: 5,
              },
            },
            producer: {
              allowAutoTopicCreation: true,
              retry: {
                initialRetryTime: 100,
                retries: 5,
              },
            },
          },
        }),
        inject: [NestAuditLoggingServiceEnvService],
        extraProviders: [ENV_SERVICE_PROVIDER],
      },
    ]),
    HttpModule,
    DiscoveryModule.forRootAsync({
      useFactory: (envService: NestAuditLoggingServiceEnvService) => ({
        serviceId: "audit-logger-service",
        consulHost: "localhost",
        consulPort: 8500,
        healthCheckServices: ["memory", "disk", "nestjs", "kafka"],
        healthEndpoint: `http://localhost:${envService.get("PORT")}/health`,
        kafkaOptions: {
          clientId: envService.get("KAFKA_CLIENT_ID"),
          brokers: [`localhost:${envService.get("KAFKA_PORT")}`],
        },
      }),
      inject: [NestAuditLoggingServiceEnvService],
      extraProviders: [ENV_SERVICE_PROVIDER],
    }),
  ],
  controllers: [LogsController],
  providers: [ENV_SERVICE_PROVIDER, ElkService],
})
export class AppModule {}
