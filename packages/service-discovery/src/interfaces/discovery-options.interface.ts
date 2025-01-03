export type HealthCheckType = "db" | "memory" | "disk" | "nestjs" | "kafka";

export interface IDiscoveryModuleOptions {
  serviceId: string;
  consulHost: string;
  consulPort: number;
  healthCheckServices?: HealthCheckType[];
  dependencies?: string[];
  healthEndpoint?: string;
  kafkaOptions?: {
    brokers: string[];
    clientId: string;
  };
}
