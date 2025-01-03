import { Inject, Injectable } from "@nestjs/common";
import { diag, DiagConsoleLogger, DiagLogLevel } from "@opentelemetry/api";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { KafkaJsInstrumentation } from "@opentelemetry/instrumentation-kafkajs";
import { Resource } from "@opentelemetry/resources";
import { BatchSpanProcessor } from "@opentelemetry/sdk-trace-base";
import { NodeSDK } from "@opentelemetry/sdk-node";
import { TypeormInstrumentation } from "opentelemetry-instrumentation-typeorm";
import { GraphQLInstrumentation } from "@opentelemetry/instrumentation-graphql";
import type { TelemetryModuleOptions } from "./telemetry.module";

let sdk: NodeSDK | null = null;

export function initializeTracing(options: TelemetryModuleOptions) {
  if (sdk) {
    return sdk;
  }

  process.env.OTEL_LOGS_EXPORTER = "none";

  diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO);

  const traceExporter = new OTLPTraceExporter({
    url: options.jaegerEndpoint || "http://localhost:4318/v1/traces",
  });

  const graphQLInstrumentation = new GraphQLInstrumentation({
    mergeItems: true,
    depth: 15,
    allowValues: true,
    ignoreResolveSpans: false,
    ignoreTrivialResolveSpans: true,
    responseHook: (span, data) => {
      if (data.errors) {
        span.setAttribute("graphql.errors", JSON.stringify(data.errors));
      }
    },
  });

  const kafkaInstrumentation = new KafkaJsInstrumentation({
    producerHook: (span, info) => {
      span.setAttribute("messaging.system", "kafka");
      span.setAttribute("messaging.destination", info.topic);
      span.setAttribute("messaging.destination_kind", "topic");

      // Добавляем контекст трейсинга в заголовки
      const spanContext = span.spanContext();
      const message = info.message;
      if (message && typeof message === "object") {
        message.headers = {
          ...message.headers,
          "x-trace-id": spanContext.traceId,
          "x-span-id": spanContext.spanId,
          "x-trace-flags": spanContext.traceFlags.toString(),
        };
      }
    },
    consumerHook: (span, info) => {
      span.setAttribute("messaging.system", "kafka");
      span.setAttribute("messaging.destination", info.topic);
      span.setAttribute("messaging.destination_kind", "topic");

      // Извлекаем и устанавливаем родительский контекст
      const message = info.message;
      if (message && typeof message === "object") {
        const headers = message.headers || {};
        if (headers["x-trace-id"] && headers["x-span-id"]) {
          span.setAttribute("messaging.parent_trace_id", headers["x-trace-id"].toString());
          span.setAttribute("messaging.parent_span_id", headers["x-span-id"].toString());
        }
      }
    },
  });

  sdk = new NodeSDK({
    resource: new Resource({
      "service.name": options.serviceName,
      "service.version": options.serviceVersion || "1.0.0",
      "deployment.environment": options.environment || "development",
    }),
    spanProcessors: [new BatchSpanProcessor(traceExporter)],
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
        "@opentelemetry/instrumentation-winston": {
          enabled: true,
        },
      }),
      graphQLInstrumentation,
      kafkaInstrumentation,
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

  process.on("SIGTERM", () => {
    sdk
      ?.shutdown()
      .then(
        () => console.log("SDK shut down successfully"),
        err => console.log("Error shutting down SDK", err),
      )
      .finally(() => process.exit(0));
  });

  sdk.start();

  return sdk;
}

@Injectable()
export class TelemetryService {
  constructor(
    @Inject("TELEMETRY_OPTIONS")
    private readonly options: TelemetryModuleOptions,
  ) {
    initializeTracing(this.options);
  }
}
