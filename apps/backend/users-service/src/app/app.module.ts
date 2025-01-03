import { ApolloFederationDriver, ApolloFederationDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NestUsersServiceEnvService } from "@repo/env-config";
import * as path from "path";
import typeorm from "./configs/typeorm.config";
import { UsersModule } from "./resources/users/users.module";
import { DiscoveryModule } from "@repo/service-discovery";

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
    DiscoveryModule.forRoot({
      serviceId: "users-service",
      consulHost: "localhost",
      consulPort: 8500,
      healthCheckServices: ["db", "memory", "nestjs", "disk"],
      healthEndpoint: "http://localhost:4206/health",
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [NestUsersServiceEnvService],
})
export class AppModule {}
