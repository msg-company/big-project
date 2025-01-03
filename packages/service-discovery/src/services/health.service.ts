import { HttpService } from "@nestjs/axios";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { DiskHealthIndicator, HealthCheckResult, HealthCheckService, MemoryHealthIndicator, TypeOrmHealthIndicator } from "@nestjs/terminus";
import { Kafka } from "kafkajs";
import os from "os";
import { DISCOVERY_MODULE_OPTIONS } from "../constants/injection-tokens";
import type { HealthCheckType, IDiscoveryModuleOptions } from "../interfaces/discovery-options.interface";

@Injectable()
export class HealthService {
  private readonly logger = new Logger(HealthService.name);
  private previousStatuses: Record<string, string> = {};
  private kafka: Kafka | null = null;

  constructor(
    @Inject(DISCOVERY_MODULE_OPTIONS)
    private readonly options: IDiscoveryModuleOptions,
    private readonly health: HealthCheckService,
    private readonly db: TypeOrmHealthIndicator,
    private readonly memory: MemoryHealthIndicator,
    private readonly disk: DiskHealthIndicator,
    private readonly httpService: HttpService,
  ) {
    if (options.kafkaOptions) {
      this.kafka = new Kafka({
        clientId: options.kafkaOptions.clientId,
        brokers: options.kafkaOptions.brokers,
      });
    }
  }

  async check(services: HealthCheckType[]): Promise<HealthCheckResult> {
    const checks = [];
    const changedServices: string[] = [];

    for (const service of services) {
      try {
        switch (service) {
          case "db":
            checks.push(() =>
              this.db.pingCheck("database").then(result => {
                const dbStatus = result.database?.status || "unknown";
                if (this.previousStatuses["database"] !== dbStatus) {
                  this.logger.log(`⚡ Database status changed: ${dbStatus}`);
                  changedServices.push("database");
                  this.previousStatuses["database"] = dbStatus;
                }
                return result;
              }),
            );
            break;

          case "memory":
            checks.push(() =>
              this.memory.checkHeap("memory_heap", 150 * 1024 * 1024).then(result => {
                const memoryStatus = result["memory_heap"]?.status || "unknown";
                const usedMemoryInMB = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
                if (this.previousStatuses["memory_heap"] !== memoryStatus) {
                  this.logger.log(`⚡ Memory status changed: ${memoryStatus} (used: ${usedMemoryInMB} MB)`);
                  changedServices.push("memory");
                  this.previousStatuses["memory_heap"] = memoryStatus;
                }
                return result;
              }),
            );
            break;

          case "disk":
            const diskCheckOptions = {
              thresholdPercent: 0.95,
              path: os.platform() === "win32" ? "C:" : "/",
            };
            checks.push(() =>
              this.disk.checkStorage("storage", diskCheckOptions).then(result => {
                const storageStatus = result.storage?.status || "unknown";
                if (this.previousStatuses["storage"] !== storageStatus) {
                  this.logger.log(`⚡ Disk status changed: ${storageStatus}`);
                  changedServices.push("storage");
                  this.previousStatuses["storage"] = storageStatus;
                }
                return result;
              }),
            );
            break;

          case "nestjs":
            if (this.options.healthEndpoint) {
              checks.push(async () => {
                try {
                  const response = await this.httpService.axiosRef.get(this.options.healthEndpoint);
                  const status = response.status === 200 ? "up" : "down";
                  if (this.previousStatuses["nestjs"] !== status) {
                    this.logger.log(`⚡ NestJS status changed: ${status}`);
                    changedServices.push("nestjs");
                    this.previousStatuses["nestjs"] = status;
                  }
                  return {
                    nestjs: {
                      status,
                      message: "NestJS application is running",
                    },
                  };
                } catch (_) {
                  const status = "down";
                  if (this.previousStatuses["nestjs"] !== status) {
                    this.logger.error("❌ NestJS is unavailable");
                    changedServices.push("nestjs");
                    this.previousStatuses["nestjs"] = status;
                  }
                  return {
                    nestjs: {
                      status,
                      message: "NestJS application is not responding",
                    },
                  };
                }
              });
            }
            break;

          case "kafka":
            if (this.kafka) {
              checks.push(async () => {
                try {
                  const admin = this.kafka.admin();
                  await admin.connect();
                  await admin.listTopics();
                  await admin.disconnect();
                  const status = "up";
                  if (this.previousStatuses["kafka"] !== status) {
                    this.logger.log(`⚡ Kafka status changed: ${status}`);
                    changedServices.push("kafka");
                    this.previousStatuses["kafka"] = status;
                  }
                  return {
                    kafka: {
                      status,
                      message: "Kafka is connected",
                    },
                  };
                } catch (error) {
                  const status = "down";
                  if (this.previousStatuses["kafka"] !== status) {
                    this.logger.error(`❌ Kafka is unavailable: ${error}`);
                    changedServices.push("kafka");
                    this.previousStatuses["kafka"] = status;
                  }
                  return {
                    kafka: {
                      status,
                      message: "Kafka is not responding",
                    },
                  };
                }
              });
            }
            break;
        }
      } catch (error) {
        this.logger.error(`Error checking ${service} health: ${error}`);
      }
    }

    if (changedServices.length > 0) {
      this.logger.log(`Health check status changed for services: ${changedServices.join(", ")}`);
    }

    return this.health.check(checks);
  }
}
