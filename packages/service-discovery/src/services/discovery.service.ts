import { Inject, Injectable, Logger, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import Consul from "consul";
import * as os from "os";
import { DISCOVERY_MODULE_OPTIONS } from "../constants/injection-tokens";
import type { IDiscoveryModuleOptions } from "../interfaces/discovery-options.interface";
import { HealthService } from "./health.service";

@Injectable()
export class DiscoveryService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(DiscoveryService.name);
  private consulClient: Consul;
  private readonly checkInterval = 10000; // 10 seconds
  private checkTimer: NodeJS.Timeout;
  private isServiceHealthy = false;

  constructor(
    @Inject(DISCOVERY_MODULE_OPTIONS)
    private readonly options: IDiscoveryModuleOptions,
    private readonly healthService: HealthService,
  ) {
    this.consulClient = new Consul({
      host: this.options.consulHost,
      port: this.options.consulPort,
    });
  }

  async onModuleInit() {
    try {
      // 1. Ждем зависимые сервисы
      if (this.options.dependencies?.length) {
        await this.waitForDependencies();
      }

      // 2. Регистрируем сервис
      await this.register();

      // 3. Проверяем здоровье сервиса перед стартом health checks
      if (this.options.healthCheckServices?.length) {
        const health = await this.healthService.check(this.options.healthCheckServices);
        this.isServiceHealthy = health.status === "ok";

        if (!this.isServiceHealthy) {
          throw new Error("Initial health check failed");
        }
      } else {
        this.isServiceHealthy = true;
      }

      // 4. Запускаем периодические проверки здоровья
      this.startHealthCheck();

      this.logger.log(`Service ${this.options.serviceId} successfully initialized`);
    } catch (error) {
      this.logger.error("Failed to initialize service", error);
      throw error;
    }
  }

  async onModuleDestroy() {
    if (this.checkTimer) {
      clearInterval(this.checkTimer);
    }
    await this.deregister();
  }

  private async register() {
    try {
      await this.consulClient.agent.service.register({
        id: this.options.serviceId,
        name: this.options.serviceId,
        address: os.hostname(),
        check: {
          name: "Service Health Check",
          ttl: "15s",
          timeout: "10s",
          status: "passing",
          deregistercriticalserviceafter: "1m",
          notes: "Automatically managed by service discovery module",
        },
        meta: {
          dependencies: this.options.dependencies?.join(",") || "",
          healthChecks: this.options.healthCheckServices?.join(",") || "",
        },
      });

      this.logger.log(`Service ${this.options.serviceId} registered successfully`);
    } catch (error) {
      this.logger.error("Failed to register service", error);
      throw error;
    }
  }

  private async deregister() {
    try {
      await this.consulClient.agent.service.deregister(this.options.serviceId);
      this.logger.log(`Service ${this.options.serviceId} deregistered successfully`);
    } catch (error) {
      this.logger.error("Failed to deregister service", error);
    }
  }

  private startHealthCheck() {
    this.checkTimer = setInterval(async () => {
      try {
        if (this.options.healthCheckServices?.length) {
          const health = await this.healthService.check(this.options.healthCheckServices);
          this.isServiceHealthy = health.status === "ok";

          const output = Object.entries(health.info)
            .map(([key, value]) => `${key}: ${value.status}`)
            .join(", ");

          if (this.isServiceHealthy) {
            await this.consulClient.agent.check.pass({
              id: `service:${this.options.serviceId}`,
              note: output || "All checks passed",
            });
          } else {
            await this.consulClient.agent.check.fail({
              id: `service:${this.options.serviceId}`,
              note: output || "Health checks failed",
            });
          }
        } else {
          await this.consulClient.agent.check.pass({
            id: `service:${this.options.serviceId}`,
            note: "No health checks configured",
          });
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        this.logger.error("Health check failed", error);
        this.isServiceHealthy = false;
        await this.consulClient.agent.check.fail({
          id: `service:${this.options.serviceId}`,
          note: `Health check failed: ${errorMessage}`,
        });
      }
    }, this.checkInterval);
  }

  private async waitForDependencies() {
    this.logger.log("Waiting for dependencies...");

    await Promise.all(this.options.dependencies.map(serviceName => this.waitForService(serviceName)));

    this.logger.log("All dependencies are available");
  }

  private async waitForService(serviceName: string, timeout = 60000): Promise<void> {
    const startTime = Date.now();

    while (Date.now() - startTime < timeout) {
      try {
        const healthyServices = await this.consulClient.health.service({
          service: serviceName,
          passing: true,
        });

        if (healthyServices.length > 0) {
          this.logger.log(`Service ${serviceName} is healthy and available`);
          return;
        }
      } catch (error) {
        this.logger.warn(`Failed to check service ${serviceName}`, error);
      }

      await new Promise(resolve => setTimeout(resolve, 5000));
    }

    throw new Error(`Timeout waiting for service ${serviceName}`);
  }
}
