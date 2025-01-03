import { DynamicModule, Global, Module } from "@nestjs/common";
import { TelemetryService } from "./telemetry.service";

export interface TelemetryModuleOptions {
  serviceName: string;
  serviceVersion?: string;
  environment?: string;
  jaegerEndpoint?: string;
}

@Global()
@Module({})
export class TelemetryModule {
  static forRoot(options: TelemetryModuleOptions): DynamicModule {
    return {
      module: TelemetryModule,
      providers: [
        {
          provide: "TELEMETRY_OPTIONS",
          useValue: options,
        },
        TelemetryService,
      ],
      exports: [TelemetryService],
    };
  }
}
