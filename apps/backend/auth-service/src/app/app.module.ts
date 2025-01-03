import { ApolloFederationDriver, ApolloFederationDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NestAuthServiceEnvService } from "@repo/env-config";
import { DiscoveryModule } from "@repo/service-discovery";
import { LoggerModule } from "@repo/service-logger";
import * as path from "path";
import typeorm from "./configs/typeorm.config";
import { TestResolver } from "./resources/resolvers/test.resolver";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [path.resolve(process.cwd(), `.env.${process.env.NODE_ENV || "development"}`)],
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => configService.get("typeorm"),
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      playground: false,
      introspection: process.env.NODE_ENV !== "production",
      csrfPrevention: false,
      context: ({ req, res }: { req: Request; res: Response }) => ({
        req,
        res,
      }),
      autoSchemaFile: {
        federation: 2,
      },
    }),
    LoggerModule.forRoot({
      serviceId: "auth-service",
      kafka: {
        brokers: ["localhost:9092"],
        topic: "service-logs",
      },
    }),
    DiscoveryModule.forRoot({
      serviceId: "auth-service",
      consulHost: "localhost",
      consulPort: 8500,
      healthCheckServices: ["db", "memory", "nestjs", "disk"],
      healthEndpoint: "http://localhost:4202/health",
      dependencies: ["users-service", "audit-logger-service"],
    }),
  ],
  controllers: [],
  providers: [NestAuthServiceEnvService, TestResolver],
})
export class AppModule {}
