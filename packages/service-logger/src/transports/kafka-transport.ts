import Transport from "winston-transport";
import { Kafka, Producer } from "kafkajs";
import { LogEntry } from "winston";

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
      // Попробуем переподключиться через 5 секунд
      setTimeout(() => this.connect(), 5000);
    }
  }

  async log(info: LogEntry, callback: () => void) {
    setImmediate(() => {
      this.emit("logged", info);
    });

    const logData = {
      timestamp: new Date().toISOString(),
      level: info.level,
      message: info.message,
      ...info,
    };

    try {
      if (!this.connected) {
        throw new Error("Not connected to Kafka");
      }

      await this.producer.send({
        topic: this.topic,
        messages: [
          {
            value: JSON.stringify(logData),
            key: info.serviceId || "unknown",
          },
        ],
      });
    } catch (error) {
      console.error("Error sending log to Kafka:", error);
      if (!this.connected) {
        this.connect();
      }
    }

    callback();
  }

  async close() {
    await this.producer.disconnect();
    this.connected = false;
  }
}
