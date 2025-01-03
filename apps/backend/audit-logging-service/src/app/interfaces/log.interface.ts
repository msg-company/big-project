export interface ServiceLog {
  message: string;
  level: string;
  timestamp?: string;
  serviceId: string;
  [key: string]: any;
}
