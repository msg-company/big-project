import { Module } from "@nestjs/common";
import { NestUsersServiceEnvService } from "@repo/env-config";

@Module({
  providers: [NestUsersServiceEnvService],
  exports: [NestUsersServiceEnvService],
})
export class EnvModule {}
