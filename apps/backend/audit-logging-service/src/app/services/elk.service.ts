import { Client } from "@elastic/elasticsearch";
import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { SpanStatusCode, trace } from "@opentelemetry/api";
import { createLogger, format, transports } from "winston";
import { ElasticsearchTransport, ElasticsearchTransportOptions } from "winston-elasticsearch";
import { ServiceLog } from "../interfaces/log.interface";

@Injectable()
export class ElkService implements OnModuleInit {
  private readonly logger = new Logger(ElkService.name);
  private winstonLogger;
  private elasticClient: Client;
  private isConnected = false;

  constructor() {
    // Создаем клиент Elasticsearch
    this.elasticClient = new Client({
      node: "http://localhost:9200",
      auth: {
        username: "elastic",
        password: "changeme",
      },
      maxRetries: 5,
      requestTimeout: 10000,
    });

    const esTransportOpts: ElasticsearchTransportOptions = {
      client: this.elasticClient,
      level: "info",
      indexPrefix: "logs",
      indexSuffixPattern: "YYYY.MM.DD",
      dataStream: false,
      transformer: logData => {
        return {
          "@timestamp": new Date().toISOString(),
          ...logData.meta,
          message: logData.message,
          level: logData.level,
        };
      },
    };

    this.winstonLogger = createLogger({
      format: format.combine(format.timestamp(), format.json()),
      transports: [
        new ElasticsearchTransport(esTransportOpts),
        new transports.Console({
          format: format.combine(format.colorize(), format.simple()),
        }),
      ],
    });
  }

  async onModuleInit() {
    try {
      // Проверяем подключение к Elasticsearch
      const health = await this.elasticClient.cluster.health();
      this.logger.log(`Elasticsearch connection status: ${health.status}`);
      this.isConnected = ["green", "yellow"].includes(health.status);
    } catch (error) {
      this.logger.error("Failed to connect to Elasticsearch", error);
      this.isConnected = false;
    }
  }

  async indexLog(logData: ServiceLog) {
    const tracer = trace.getTracer("audit-logging-service");
    const span = tracer.startSpan("index-log-to-elasticsearch");

    try {
      // Проверяем подключение перед каждой операцией
      try {
        const health = await this.elasticClient.cluster.health();
        this.isConnected = ["green", "yellow"].includes(health.status);
      } catch (error) {
        this.logger.error("Failed connection to Elasticsearch", error);

        this.isConnected = false;
      }

      if (!this.isConnected) {
        throw new Error("Elasticsearch is not connected");
      }

      // Добавляем информацию о трейсинге в лог
      const enrichedLogData = {
        message: logData.message,
        level: logData.level,
        meta: {
          type: "service_log",
          serviceId: logData.serviceId || "audit-logging-service",
          traceId: logData.traceId,
          spanId: logData.spanId,
          ...logData,
        },
      };

      // Добавляем атрибуты в спан
      span.setAttributes({
        "log.service_id": enrichedLogData.meta.serviceId,
        "log.severity": enrichedLogData.level,
        "log.trace_id": enrichedLogData.meta.traceId,
      });

      // Логируем в консоль для отладки
      this.logger.debug("Sending log to Elasticsearch: " + JSON.stringify(enrichedLogData, null, 2));

      await new Promise<void>((resolve, reject) => {
        this.winstonLogger.info(enrichedLogData, error => {
          if (error) {
            this.logger.error("Failed to send log to Elasticsearch", error);
            reject(error);
          } else {
            resolve();
          }
        });
      });

      span.setStatus({ code: SpanStatusCode.OK });
    } catch (error: any) {
      this.logger.error("Failed to index log", error);
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: error?.message || "Failed to index log",
      });
      throw error;
    } finally {
      span.end();
    }
  }
}
