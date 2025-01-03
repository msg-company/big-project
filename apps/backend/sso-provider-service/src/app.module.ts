import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { NestSsoProviderServiceEnvService } from "@repo/env-config";
import path from "path";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [path.resolve(__dirname, `../.env.${process.env.NODE_ENV || "local"}`)],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, NestSsoProviderServiceEnvService],
})
export class AppModule {}
