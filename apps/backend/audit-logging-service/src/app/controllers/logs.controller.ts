import { Controller, Logger } from "@nestjs/common";
import { EventPattern, KafkaContext, Payload } from "@nestjs/microservices";
import { context, ROOT_CONTEXT, SpanStatusCode, trace, TraceFlags } from "@opentelemetry/api";
import { ServiceLog } from "../interfaces/log.interface";
import { ElkService } from "../services/elk.service";

@Controller()
export class LogsController {
  private readonly logger = new Logger(LogsController.name);

  constructor(private readonly elkService: ElkService) {}

  @EventPattern("service-logs")
  async handleLog(@Payload() data: ServiceLog, kafkaContext: KafkaContext) {
    const tracer = trace.getTracer("audit-logging-service");
    let headers = {};

    try {
      const message = kafkaContext?.getMessage();

      if (message) {
        headers = message.headers || {};
      }
    } catch (error) {
      this.logger.error("Failed to get Kafka message headers", error);
    }

    // Извлекаем контекст трейсинга из заголовков
    const parentTraceId = headers["x-trace-id"]?.toString();
    const parentSpanId = headers["x-span-id"]?.toString();
    const traceFlags = Number(headers["x-trace-flags"]) || TraceFlags.SAMPLED;

    // Создаем спан и связываем его с родительским
    const parentContext =
      parentTraceId && parentSpanId
        ? {
            traceId: parentTraceId,
            spanId: parentSpanId,
            traceFlags,
            isRemote: true,
          }
        : undefined;

    const span = tracer.startSpan("process-service-log", {
      attributes: {
        "messaging.system": "kafka",
        "messaging.destination": "service-logs",
        "messaging.destination_kind": "topic",
        "messaging.operation": "process",
      },
      ...(parentContext ? { links: [{ context: parentContext }] } : {}),
    });

    try {
      this.logger.debug(`Processing log data: ${JSON.stringify(data)}`);

      // Выполняем в контексте спана
      await context.with(trace.setSpan(ROOT_CONTEXT, span), async () => {
        await this.elkService.indexLog({
          ...data,
          traceId: span.spanContext().traceId,
          spanId: span.spanContext().spanId,
        });
      });

      span.setStatus({ code: SpanStatusCode.OK });
    } catch (error) {
      this.logger.error("Failed to process log", error);
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: "Failed to process log",
      });
      throw error;
    } finally {
      span.end();
    }
  }
}
