import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { diag, DiagConsoleLogger, DiagLogLevel } from "@opentelemetry/api";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { KafkaJsInstrumentation } from "@opentelemetry/instrumentation-kafkajs";
import { Resource } from "@opentelemetry/resources";
import { NodeSDK } from "@opentelemetry/sdk-node";
import { ATTR_SERVICE_NAME, ATTR_SERVICE_VERSION } from "@opentelemetry/semantic-conventions";
import { TypeormInstrumentation } from "opentelemetry-instrumentation-typeorm";
import type { TelemetryModuleOptions } from "./telemetry.module";

@Injectable()
export class TelemetryService implements OnModuleInit {
  private sdk: NodeSDK;

  constructor(
    @Inject("TELEMETRY_OPTIONS")
    private readonly options: TelemetryModuleOptions,
  ) {
    // Для отладки OpenTelemetry
    diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO);

    this.sdk = new NodeSDK({
      resource: new Resource({
        [ATTR_SERVICE_NAME]: this.options.serviceName,
        [ATTR_SERVICE_VERSION]: this.options.serviceVersion || "1.0.0",
        "deployment.environment": this.options.environment || "development", // Используем строковый литерал
      }),
      traceExporter: new OTLPTraceExporter({
        url: this.options.jaegerEndpoint || "http://localhost:4318/v1/traces",
      }),
      instrumentations: [
        getNodeAutoInstrumentations({
          "@opentelemetry/instrumentation-fs": {
            enabled: false,
          },
          "@opentelemetry/instrumentation-http": {
            enabled: true,
            ignoreIncomingRequestHook: request => {
              const path = request.url?.split("?")[0];
              return path === "/health" || path === "/metrics";
            },
          },
          "@opentelemetry/instrumentation-express": {
            enabled: true,
          },
          "@opentelemetry/instrumentation-graphql": {
            enabled: true,
          },
          "@opentelemetry/instrumentation-nestjs-core": {
            enabled: true,
          },
        }),
        new KafkaJsInstrumentation(),
        new TypeormInstrumentation({
          enabled: true,
          collectParameters: true,
          enableInternalInstrumentation: true,
          suppressInternalInstrumentation: false,
          responseHook: (span, responseInfo) => {
            if (responseInfo.data) {
              span.setAttribute("db.response.rows", JSON.stringify(responseInfo.data));
            }
          },
        }),
      ],
    });
  }

  async onModuleInit() {
    await this.sdk.start();
  }
}
