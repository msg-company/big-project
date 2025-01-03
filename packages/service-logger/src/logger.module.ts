import { DynamicModule, Global, Module } from "@nestjs/common";
import { LoggerService } from "./services/logger.service";
import type { LoggerModuleOptions } from "./interfaces/logger-options.interface";
import { LOGGER_MODULE_OPTIONS } from "./constants/injection-tokens";

@Global()
@Module({})
export class LoggerModule {
  static forRoot(options: LoggerModuleOptions): DynamicModule {
    return {
      module: LoggerModule,
      providers: [
        {
          provide: LOGGER_MODULE_OPTIONS,
          useValue: options,
        },
        LoggerService,
      ],
      exports: [LoggerService],
    };
  }
}
