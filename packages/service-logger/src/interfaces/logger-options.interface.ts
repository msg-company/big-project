export interface LoggerModuleOptions {
  serviceId: string;
  kafka: {
    brokers: string[];
    topic?: string;
  };
}
