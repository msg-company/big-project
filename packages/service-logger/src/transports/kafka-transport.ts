import { Kafka, Producer } from "kafkajs";
import { LogEntry } from "winston";
import Transport from "winston-transport";
import { trace, SpanStatusCode, context } from "@opentelemetry/api";

interface KafkaTransportOptions extends Transport.TransportStreamOptions {
  brokers: string[];
  clientId: string;
  topic: string;
}

export class KafkaTransport extends Transport {
  private producer: Producer;
  private readonly topic: string;
  private connected: boolean = false;

  constructor(opts: KafkaTransportOptions) {
    super(opts);

    const kafka = new Kafka({
      clientId: opts.clientId,
      brokers: opts.brokers,
    });

    this.producer = kafka.producer();
    this.topic = opts.topic;
    this.connect();
  }

  private async connect() {
    try {
      await this.producer.connect();
      this.connected = true;
    } catch (error) {
      console.error("Failed to connect to Kafka:", error);
      setTimeout(() => this.connect(), 5000);
    }
  }

  async log(info: LogEntry, callback: () => void) {
    setImmediate(() => {
      this.emit("logged", info);
    });

    const currentSpan = trace.getSpan(context.active());
    const spanContext = currentSpan?.spanContext();

    // Создаем спан для отправки лога
    const tracer = trace.getTracer("logger-service");
    const span = tracer.startSpan("send-log-to-kafka", {
      attributes: {
        "messaging.system": "kafka",
        "messaging.destination": this.topic,
        "messaging.destination_kind": "topic",
      },
    });

    try {
      const logData = {
        timestamp: new Date().toISOString(),
        level: info.level,
        message: info.message,
        ...info,
      };

      if (this.connected) {
        await this.producer.send({
          topic: this.topic,
          messages: [
            {
              headers: spanContext
                ? {
                    "x-trace-id": spanContext.traceId,
                    "x-span-id": spanContext.spanId,
                    "x-trace-flags": spanContext.traceFlags.toString(),
                  }
                : {},
              value: JSON.stringify(logData),
            },
          ],
        });
      }
      span.setStatus({ code: SpanStatusCode.OK });
    } catch (error: any) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: error?.message || "Failed to send log to Kafka",
      });
      console.error("Failed to send log to Kafka:", error);
    } finally {
      span.end();
      callback();
    }
  }

  async close() {
    if (this.connected) {
      await this.producer.disconnect();
      this.connected = false;
    }
  }
}
