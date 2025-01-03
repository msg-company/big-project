import { HttpModule } from "@nestjs/axios";
import { DynamicModule, Module } from "@nestjs/common";
import { TerminusModule } from "@nestjs/terminus";
import { DISCOVERY_MODULE_OPTIONS } from "./constants/injection-tokens";
import { IDiscoveryModuleOptions } from "./interfaces/discovery-options.interface";
import { IDiscoveryModuleAsyncOptions } from "./interfaces/discovery-async-options.interface";
import { DiscoveryService } from "./services/discovery.service";
import { HealthService } from "./services/health.service";
import { HealthController } from "./controllers/health.controller";

@Module({})
export class DiscoveryModule {
  static forRoot(options: IDiscoveryModuleOptions): DynamicModule {
    return {
      module: DiscoveryModule,
      imports: [
        TerminusModule,
        HttpModule.register({
          timeout: 5000,
          maxRedirects: 5,
        }),
      ],
      providers: [
        {
          provide: DISCOVERY_MODULE_OPTIONS,
          useValue: options,
        },
        DiscoveryService,
        HealthService,
      ],
      controllers: [HealthController],
      exports: [DiscoveryService, HealthService],
    };
  }

  static forRootAsync(options: IDiscoveryModuleAsyncOptions): DynamicModule {
    const providers = [
      {
        provide: DISCOVERY_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      },
      DiscoveryService,
      HealthService,
      ...(options.extraProviders || []),
    ];

    return {
      module: DiscoveryModule,
      imports: [
        TerminusModule,
        HttpModule.register({
          timeout: 5000,
          maxRedirects: 5,
        }),
      ],
      providers,
      controllers: [HealthController],
      exports: [DiscoveryService, HealthService],
    };
  }
}
