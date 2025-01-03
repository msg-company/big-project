import { Inject, Injectable, OnModuleDestroy } from "@nestjs/common";
import { createLogger, format, Logger as WinstonLogger } from "winston";

import { KafkaTransport } from "../transports/kafka-transport";
import type { LoggerModuleOptions } from "../interfaces/logger-options.interface";
import { LOGGER_MODULE_OPTIONS } from "../constants/injection-tokens";

@Injectable()
export class LoggerService implements OnModuleDestroy {
  private readonly logger: WinstonLogger;
  private readonly kafkaTransport: KafkaTransport;

  constructor(@Inject(LOGGER_MODULE_OPTIONS) private options: LoggerModuleOptions) {
    this.kafkaTransport = new KafkaTransport({
      brokers: options.kafka.brokers,
      clientId: `logger-${options.serviceId}`,
      topic: options.kafka.topic || "service-logs",
    });

    this.logger = createLogger({
      format: format.combine(format.timestamp(), format.errors({ stack: true }), format.json()),
      defaultMeta: {
        serviceId: options.serviceId,
      },
      transports: [this.kafkaTransport],
    });
  }

  async onModuleDestroy() {
    await this.kafkaTransport.close();
  }

  log(level: string, message: string, meta: Record<string, any> = {}) {
    this.logger.log(level, message, meta);
  }

  error(message: string, meta: Record<string, any> = {}) {
    this.logger.error(message, meta);
  }

  warn(message: string, meta: Record<string, any> = {}) {
    this.logger.warn(message, meta);
  }

  info(message: string, meta: Record<string, any> = {}) {
    this.logger.info(message, meta);
  }

  debug(message: string, meta: Record<string, any> = {}) {
    this.logger.debug(message, meta);
  }
}
