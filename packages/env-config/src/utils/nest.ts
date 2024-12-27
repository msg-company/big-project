import { Injectable } from '@nestjs/common';
import { z } from 'zod';

export interface NestGatewayEnv {
  PORT: number;
  USERS_SERVICE_PORT: number;
  AUTH_SERVICE_PORT: number;
  IDENTITY_SERVICE_PORT: number;
  AUDIT_LOGGING_SERVICE_PORT: number;
  NOTIFICATION_SERVICE_PORT: number;
  SSO_PROVIDER_SERVICE_PORT: number;
}

export interface NestAuditLoggingServiceEnv {
  PORT: number;
  POSTGRES_DB: string;
}

export interface NestAuthServiceEnv {
  PORT: number;
  POSTGRES_DB: string;
}

export interface NestIdentityServiceEnv {
  PORT: number;
  POSTGRES_DB: string;
}

export interface NestNotificationServiceEnv {
  PORT: number;
  POSTGRES_DB: string;
}

export interface NestSsoProviderServiceEnv {
  PORT: number;
  POSTGRES_DB: string;
}

export interface NestUsersServiceEnv {
  PORT: number;
  POSTGRES_DB: string;
  POSTGRES_HOST: string;
  POSTGRES_PORT: number;
  POSTGRES_USER: string;
  POSTGRES_PASSWORD?: string;
}

export interface NestDockerEnv {
  POSTGRES_MULTIPLE_DATABASES: string;
  TIMEZONE: string;
  COMPOSE_PROJECT_NAME: string;
  MEMORY_LIMIT: string;
  MEMORY_RESERVATION: string;
  HEALTHCHECK_INTERVAL: string;
  HEALTHCHECK_TIMEOUT: string;
  HEALTHCHECK_RETRIES: number;
  HEALTHCHECK_START_PERIOD: string;
  ELASTIC_VERSION: string;
  LOGSTASH_INTERNAL_PASSWORD?: string;
  METRICBEAT_INTERNAL_PASSWORD?: string;
  FILEBEAT_INTERNAL_PASSWORD?: string;
  HEARTBEAT_INTERNAL_PASSWORD?: string;
  MONITORING_INTERNAL_PASSWORD?: string;
  BEATS_SYSTEM_PASSWORD?: string;
  ELASTICSEARCH_PORT: number;
  ELASTICSEARCH_MEM_LIMIT: string;
  ELASTICSEARCH_MEM_LIMIT_MIN: string;
  ELASTICSEARCH_CLUSTER_NAME: string;
  ELASTIC_PASSWORD?: string;
  KIBANA_SYSTEM_PASSWORD?: string;
  LOGSTASH_PORT: number;
  LOGSTASH_MEM_LIMIT: string;
  LOGSTASH_MEM_LIMIT_MIN: string;
  KIBANA_PORT: number;
  KIBANA_MEM_LIMIT: string;
  KIBANA_MEM_LIMIT_MIN: string;
  KIBANA_SERVICE_TOKEN?: string;
  POSTGRES_VERSION: string;
  POSTGRES_PORT: number;
  POSTGRES_USER: string;
  POSTGRES_PASSWORD?: string;
  POSTGRES_MEM_LIMIT: string;
  POSTGRES_MEM_LIMIT_MIN: string;
  REDIS_VERSION: string;
  REDIS_PORT: number;
  REDIS_PASSWORD?: string;
  REDIS_MEM_LIMIT: string;
  REDIS_MEM_LIMIT_MIN: string;
  MINIO_VERSION: string;
  MINIO_API_PORT: number;
  MINIO_CONSOLE_PORT: number;
  MINIO_ROOT_USER: string;
  MINIO_ROOT_PASSWORD?: string;
  MINIO_MEM_LIMIT: string;
  MINIO_MEM_LIMIT_MIN: string;
  GRAFANA_VERSION: string;
  GRAFANA_PORT: number;
  GRAFANA_ADMIN_PASSWORD: string;
  GRAFANA_MEM_LIMIT: string;
  GRAFANA_MEM_LIMIT_MIN: string;
  PROMETHEUS_VERSION: string;
  PROMETHEUS_PORT: number;
  PROMETHEUS_MEM_LIMIT: string;
  PROMETHEUS_MEM_LIMIT_MIN: string;
  JAEGER_VERSION: string;
  JAEGER_PORT: number;
  JAEGER_MEM_LIMIT: string;
  JAEGER_MEM_LIMIT_MIN: string;
  VAULT_VERSION: string;
  VAULT_PORT: number;
  VAULT_MEM_LIMIT: string;
  VAULT_MEM_LIMIT_MIN: string;
  TRAEFIK_VERSION: string;
  TRAEFIK_HTTP_PORT: number;
  TRAEFIK_HTTPS_PORT: number;
  TRAEFIK_DASHBOARD_PORT: number;
  TRAEFIK_MEM_LIMIT: string;
  TRAEFIK_MEM_LIMIT_MIN: string;
  DOMAIN_BASE: string;
  AUTH_DOMAIN: string;
  TRAEFIK_DOMAIN: string;
  KIBANA_DOMAIN: string;
  GRAFANA_DOMAIN: string;
  PROMETHEUS_DOMAIN: string;
  JAEGER_DOMAIN: string;
  PORTAINER_DOMAIN: string;
  PGADMIN_DOMAIN: string;
  REDIS_DOMAIN: string;
  MINIO_DOMAIN: string;
  MINIO_API_DOMAIN: string;
  VAULT_DOMAIN: string;
  SONARQUBE_DOMAIN: string;
  KAFKA_UI_DOMAIN: string;
  FRONTEND_PORT: number;
  BACKEND_PORT: number;
  SONARQUBE_VERSION: string;
  SONARQUBE_PORT: number;
  SONARQUBE_MEM_LIMIT: string;
  SONARQUBE_MEM_LIMIT_MIN: string;
  SONARQUBE_DB: string;
  PORTAINER_VERSION: string;
  PORTAINER_PORT: number;
  PORTAINER_MEM_LIMIT: string;
  PORTAINER_MEM_LIMIT_MIN: string;
  PGADMIN_VERSION: string;
  PGADMIN_PORT: number;
  PGADMIN_DEFAULT_EMAIL: string;
  PGADMIN_DEFAULT_PASSWORD?: string;
  PGADMIN_MEM_LIMIT: string;
  PGADMIN_MEM_LIMIT_MIN: string;
  ZOOKEEPER_VERSION: string;
  KAFKA_VERSION: string;
  KAFKA_EXTERNAL_PORT: number;
  KAFKA_UI_PORT: number;
}

const nestGatewayEnvSchema = z.object({
  PORT: z.string().transform(Number),
  USERS_SERVICE_PORT: z.string().transform(Number),
  AUTH_SERVICE_PORT: z.string().transform(Number),
  IDENTITY_SERVICE_PORT: z.string().transform(Number),
  AUDIT_LOGGING_SERVICE_PORT: z.string().transform(Number),
  NOTIFICATION_SERVICE_PORT: z.string().transform(Number),
  SSO_PROVIDER_SERVICE_PORT: z.string().transform(Number),
});

const nestAuditLoggingServiceEnvSchema = z.object({
  PORT: z.string().transform(Number),
  POSTGRES_DB: z.string(),
});

const nestAuthServiceEnvSchema = z.object({
  PORT: z.string().transform(Number),
  POSTGRES_DB: z.string(),
});

const nestIdentityServiceEnvSchema = z.object({
  PORT: z.string().transform(Number),
  POSTGRES_DB: z.string(),
});

const nestNotificationServiceEnvSchema = z.object({
  PORT: z.string().transform(Number),
  POSTGRES_DB: z.string(),
});

const nestSsoProviderServiceEnvSchema = z.object({
  PORT: z.string().transform(Number),
  POSTGRES_DB: z.string(),
});

const nestUsersServiceEnvSchema = z.object({
  PORT: z.string().transform(Number),
  POSTGRES_DB: z.string(),
  POSTGRES_HOST: z.string(),
  POSTGRES_PORT: z.string().transform(Number),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string().optional(),
});

const nestDockerEnvSchema = z.object({
  POSTGRES_MULTIPLE_DATABASES: z.string(),
  TIMEZONE: z.string(),
  COMPOSE_PROJECT_NAME: z.string(),
  MEMORY_LIMIT: z.string(),
  MEMORY_RESERVATION: z.string(),
  HEALTHCHECK_INTERVAL: z.string(),
  HEALTHCHECK_TIMEOUT: z.string(),
  HEALTHCHECK_RETRIES: z.string().transform(Number),
  HEALTHCHECK_START_PERIOD: z.string(),
  ELASTIC_VERSION: z.string(),
  LOGSTASH_INTERNAL_PASSWORD: z.string().optional(),
  METRICBEAT_INTERNAL_PASSWORD: z.string().optional(),
  FILEBEAT_INTERNAL_PASSWORD: z.string().optional(),
  HEARTBEAT_INTERNAL_PASSWORD: z.string().optional(),
  MONITORING_INTERNAL_PASSWORD: z.string().optional(),
  BEATS_SYSTEM_PASSWORD: z.string().optional(),
  ELASTICSEARCH_PORT: z.string().transform(Number),
  ELASTICSEARCH_MEM_LIMIT: z.string(),
  ELASTICSEARCH_MEM_LIMIT_MIN: z.string(),
  ELASTICSEARCH_CLUSTER_NAME: z.string(),
  ELASTIC_PASSWORD: z.string().optional(),
  KIBANA_SYSTEM_PASSWORD: z.string().optional(),
  LOGSTASH_PORT: z.string().transform(Number),
  LOGSTASH_MEM_LIMIT: z.string(),
  LOGSTASH_MEM_LIMIT_MIN: z.string(),
  KIBANA_PORT: z.string().transform(Number),
  KIBANA_MEM_LIMIT: z.string(),
  KIBANA_MEM_LIMIT_MIN: z.string(),
  KIBANA_SERVICE_TOKEN: z.string().optional(),
  POSTGRES_VERSION: z.string(),
  POSTGRES_PORT: z.string().transform(Number),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string().optional(),
  POSTGRES_MEM_LIMIT: z.string(),
  POSTGRES_MEM_LIMIT_MIN: z.string(),
  REDIS_VERSION: z.string(),
  REDIS_PORT: z.string().transform(Number),
  REDIS_PASSWORD: z.string().optional(),
  REDIS_MEM_LIMIT: z.string(),
  REDIS_MEM_LIMIT_MIN: z.string(),
  MINIO_VERSION: z.string(),
  MINIO_API_PORT: z.string().transform(Number),
  MINIO_CONSOLE_PORT: z.string().transform(Number),
  MINIO_ROOT_USER: z.string(),
  MINIO_ROOT_PASSWORD: z.string().optional(),
  MINIO_MEM_LIMIT: z.string(),
  MINIO_MEM_LIMIT_MIN: z.string(),
  GRAFANA_VERSION: z.string(),
  GRAFANA_PORT: z.string().transform(Number),
  GRAFANA_ADMIN_PASSWORD: z.string(),
  GRAFANA_MEM_LIMIT: z.string(),
  GRAFANA_MEM_LIMIT_MIN: z.string(),
  PROMETHEUS_VERSION: z.string(),
  PROMETHEUS_PORT: z.string().transform(Number),
  PROMETHEUS_MEM_LIMIT: z.string(),
  PROMETHEUS_MEM_LIMIT_MIN: z.string(),
  JAEGER_VERSION: z.string(),
  JAEGER_PORT: z.string().transform(Number),
  JAEGER_MEM_LIMIT: z.string(),
  JAEGER_MEM_LIMIT_MIN: z.string(),
  VAULT_VERSION: z.string(),
  VAULT_PORT: z.string().transform(Number),
  VAULT_MEM_LIMIT: z.string(),
  VAULT_MEM_LIMIT_MIN: z.string(),
  TRAEFIK_VERSION: z.string(),
  TRAEFIK_HTTP_PORT: z.string().transform(Number),
  TRAEFIK_HTTPS_PORT: z.string().transform(Number),
  TRAEFIK_DASHBOARD_PORT: z.string().transform(Number),
  TRAEFIK_MEM_LIMIT: z.string(),
  TRAEFIK_MEM_LIMIT_MIN: z.string(),
  DOMAIN_BASE: z.string(),
  AUTH_DOMAIN: z.string(),
  TRAEFIK_DOMAIN: z.string(),
  KIBANA_DOMAIN: z.string(),
  GRAFANA_DOMAIN: z.string(),
  PROMETHEUS_DOMAIN: z.string(),
  JAEGER_DOMAIN: z.string(),
  PORTAINER_DOMAIN: z.string(),
  PGADMIN_DOMAIN: z.string(),
  REDIS_DOMAIN: z.string(),
  MINIO_DOMAIN: z.string(),
  MINIO_API_DOMAIN: z.string(),
  VAULT_DOMAIN: z.string(),
  SONARQUBE_DOMAIN: z.string(),
  KAFKA_UI_DOMAIN: z.string(),
  FRONTEND_PORT: z.string().transform(Number),
  BACKEND_PORT: z.string().transform(Number),
  SONARQUBE_VERSION: z.string(),
  SONARQUBE_PORT: z.string().transform(Number),
  SONARQUBE_MEM_LIMIT: z.string(),
  SONARQUBE_MEM_LIMIT_MIN: z.string(),
  SONARQUBE_DB: z.string(),
  PORTAINER_VERSION: z.string(),
  PORTAINER_PORT: z.string().transform(Number),
  PORTAINER_MEM_LIMIT: z.string(),
  PORTAINER_MEM_LIMIT_MIN: z.string(),
  PGADMIN_VERSION: z.string(),
  PGADMIN_PORT: z.string().transform(Number),
  PGADMIN_DEFAULT_EMAIL: z.string(),
  PGADMIN_DEFAULT_PASSWORD: z.string().optional(),
  PGADMIN_MEM_LIMIT: z.string(),
  PGADMIN_MEM_LIMIT_MIN: z.string(),
  ZOOKEEPER_VERSION: z.string(),
  KAFKA_VERSION: z.string(),
  KAFKA_EXTERNAL_PORT: z.string().transform(Number),
  KAFKA_UI_PORT: z.string().transform(Number),
});

@Injectable()
export class NestGatewayEnvService {
  constructor() {
    const result = nestGatewayEnvSchema.safeParse(process.env);
    if (!result.success) {
      console.error('❌ Invalid environment variables:', result.error.format());
      throw new Error('Invalid environment variables');
    }
  }

  get<K extends keyof NestGatewayEnv>(key: K): NestGatewayEnv[K] {
    const processEnvValue = process.env[key];

    if (processEnvValue === undefined) {
      throw new Error(`Missing environment variable: ${key}`);
    }

    switch (key) {
      case 'PORT': return Number(processEnvValue) as unknown as NestGatewayEnv[K];
      case 'USERS_SERVICE_PORT': return Number(processEnvValue) as unknown as NestGatewayEnv[K];
      case 'AUTH_SERVICE_PORT': return Number(processEnvValue) as unknown as NestGatewayEnv[K];
      case 'IDENTITY_SERVICE_PORT': return Number(processEnvValue) as unknown as NestGatewayEnv[K];
      case 'AUDIT_LOGGING_SERVICE_PORT': return Number(processEnvValue) as unknown as NestGatewayEnv[K];
      case 'NOTIFICATION_SERVICE_PORT': return Number(processEnvValue) as unknown as NestGatewayEnv[K];
      case 'SSO_PROVIDER_SERVICE_PORT': return Number(processEnvValue) as unknown as NestGatewayEnv[K];
      default: return processEnvValue as unknown as NestGatewayEnv[K];
    }
  }

  getOrDefault<K extends keyof NestGatewayEnv>(
    key: K,
    defaultValue: NestGatewayEnv[K]
  ): NestGatewayEnv[K] {
    try {
      return this.get(key);
    } catch {
      return defaultValue;
    }
  }
}

@Injectable()
export class NestAuditLoggingServiceEnvService {
  constructor() {
    const result = nestAuditLoggingServiceEnvSchema.safeParse(process.env);
    if (!result.success) {
      console.error('❌ Invalid environment variables:', result.error.format());
      throw new Error('Invalid environment variables');
    }
  }

  get<K extends keyof NestAuditLoggingServiceEnv>(key: K): NestAuditLoggingServiceEnv[K] {
    const processEnvValue = process.env[key];

    if (processEnvValue === undefined) {
      throw new Error(`Missing environment variable: ${key}`);
    }

    switch (key) {
      case 'PORT': return Number(processEnvValue) as unknown as NestAuditLoggingServiceEnv[K];
      case 'POSTGRES_DB': return processEnvValue as unknown as NestAuditLoggingServiceEnv[K];
      default: return processEnvValue as unknown as NestAuditLoggingServiceEnv[K];
    }
  }

  getOrDefault<K extends keyof NestAuditLoggingServiceEnv>(
    key: K,
    defaultValue: NestAuditLoggingServiceEnv[K]
  ): NestAuditLoggingServiceEnv[K] {
    try {
      return this.get(key);
    } catch {
      return defaultValue;
    }
  }
}

@Injectable()
export class NestAuthServiceEnvService {
  constructor() {
    const result = nestAuthServiceEnvSchema.safeParse(process.env);
    if (!result.success) {
      console.error('❌ Invalid environment variables:', result.error.format());
      throw new Error('Invalid environment variables');
    }
  }

  get<K extends keyof NestAuthServiceEnv>(key: K): NestAuthServiceEnv[K] {
    const processEnvValue = process.env[key];

    if (processEnvValue === undefined) {
      throw new Error(`Missing environment variable: ${key}`);
    }

    switch (key) {
      case 'PORT': return Number(processEnvValue) as unknown as NestAuthServiceEnv[K];
      case 'POSTGRES_DB': return processEnvValue as unknown as NestAuthServiceEnv[K];
      default: return processEnvValue as unknown as NestAuthServiceEnv[K];
    }
  }

  getOrDefault<K extends keyof NestAuthServiceEnv>(
    key: K,
    defaultValue: NestAuthServiceEnv[K]
  ): NestAuthServiceEnv[K] {
    try {
      return this.get(key);
    } catch {
      return defaultValue;
    }
  }
}

@Injectable()
export class NestIdentityServiceEnvService {
  constructor() {
    const result = nestIdentityServiceEnvSchema.safeParse(process.env);
    if (!result.success) {
      console.error('❌ Invalid environment variables:', result.error.format());
      throw new Error('Invalid environment variables');
    }
  }

  get<K extends keyof NestIdentityServiceEnv>(key: K): NestIdentityServiceEnv[K] {
    const processEnvValue = process.env[key];

    if (processEnvValue === undefined) {
      throw new Error(`Missing environment variable: ${key}`);
    }

    switch (key) {
      case 'PORT': return Number(processEnvValue) as unknown as NestIdentityServiceEnv[K];
      case 'POSTGRES_DB': return processEnvValue as unknown as NestIdentityServiceEnv[K];
      default: return processEnvValue as unknown as NestIdentityServiceEnv[K];
    }
  }

  getOrDefault<K extends keyof NestIdentityServiceEnv>(
    key: K,
    defaultValue: NestIdentityServiceEnv[K]
  ): NestIdentityServiceEnv[K] {
    try {
      return this.get(key);
    } catch {
      return defaultValue;
    }
  }
}

@Injectable()
export class NestNotificationServiceEnvService {
  constructor() {
    const result = nestNotificationServiceEnvSchema.safeParse(process.env);
    if (!result.success) {
      console.error('❌ Invalid environment variables:', result.error.format());
      throw new Error('Invalid environment variables');
    }
  }

  get<K extends keyof NestNotificationServiceEnv>(key: K): NestNotificationServiceEnv[K] {
    const processEnvValue = process.env[key];

    if (processEnvValue === undefined) {
      throw new Error(`Missing environment variable: ${key}`);
    }

    switch (key) {
      case 'PORT': return Number(processEnvValue) as unknown as NestNotificationServiceEnv[K];
      case 'POSTGRES_DB': return processEnvValue as unknown as NestNotificationServiceEnv[K];
      default: return processEnvValue as unknown as NestNotificationServiceEnv[K];
    }
  }

  getOrDefault<K extends keyof NestNotificationServiceEnv>(
    key: K,
    defaultValue: NestNotificationServiceEnv[K]
  ): NestNotificationServiceEnv[K] {
    try {
      return this.get(key);
    } catch {
      return defaultValue;
    }
  }
}

@Injectable()
export class NestSsoProviderServiceEnvService {
  constructor() {
    const result = nestSsoProviderServiceEnvSchema.safeParse(process.env);
    if (!result.success) {
      console.error('❌ Invalid environment variables:', result.error.format());
      throw new Error('Invalid environment variables');
    }
  }

  get<K extends keyof NestSsoProviderServiceEnv>(key: K): NestSsoProviderServiceEnv[K] {
    const processEnvValue = process.env[key];

    if (processEnvValue === undefined) {
      throw new Error(`Missing environment variable: ${key}`);
    }

    switch (key) {
      case 'PORT': return Number(processEnvValue) as unknown as NestSsoProviderServiceEnv[K];
      case 'POSTGRES_DB': return processEnvValue as unknown as NestSsoProviderServiceEnv[K];
      default: return processEnvValue as unknown as NestSsoProviderServiceEnv[K];
    }
  }

  getOrDefault<K extends keyof NestSsoProviderServiceEnv>(
    key: K,
    defaultValue: NestSsoProviderServiceEnv[K]
  ): NestSsoProviderServiceEnv[K] {
    try {
      return this.get(key);
    } catch {
      return defaultValue;
    }
  }
}

@Injectable()
export class NestUsersServiceEnvService {
  constructor() {
    const result = nestUsersServiceEnvSchema.safeParse(process.env);
    if (!result.success) {
      console.error('❌ Invalid environment variables:', result.error.format());
      throw new Error('Invalid environment variables');
    }
  }

  get<K extends keyof NestUsersServiceEnv>(key: K): NestUsersServiceEnv[K] {
    const processEnvValue = process.env[key];

    if (processEnvValue === undefined) {
      throw new Error(`Missing environment variable: ${key}`);
    }

    switch (key) {
      case 'PORT': return Number(processEnvValue) as unknown as NestUsersServiceEnv[K];
      case 'POSTGRES_DB': return processEnvValue as unknown as NestUsersServiceEnv[K];
      case 'POSTGRES_HOST': return processEnvValue as unknown as NestUsersServiceEnv[K];
      case 'POSTGRES_PORT': return Number(processEnvValue) as unknown as NestUsersServiceEnv[K];
      case 'POSTGRES_USER': return processEnvValue as unknown as NestUsersServiceEnv[K];
      case 'POSTGRES_PASSWORD': return processEnvValue as unknown as NestUsersServiceEnv[K];
      default: return processEnvValue as unknown as NestUsersServiceEnv[K];
    }
  }

  getOrDefault<K extends keyof NestUsersServiceEnv>(
    key: K,
    defaultValue: NestUsersServiceEnv[K]
  ): NestUsersServiceEnv[K] {
    try {
      return this.get(key);
    } catch {
      return defaultValue;
    }
  }
}

@Injectable()
export class NestDockerEnvService {
  constructor() {
    const result = nestDockerEnvSchema.safeParse(process.env);
    if (!result.success) {
      console.error('❌ Invalid environment variables:', result.error.format());
      throw new Error('Invalid environment variables');
    }
  }

  get<K extends keyof NestDockerEnv>(key: K): NestDockerEnv[K] {
    const processEnvValue = process.env[key];

    if (processEnvValue === undefined) {
      throw new Error(`Missing environment variable: ${key}`);
    }

    switch (key) {
      case 'POSTGRES_MULTIPLE_DATABASES': return processEnvValue as unknown as NestDockerEnv[K];
      case 'TIMEZONE': return processEnvValue as unknown as NestDockerEnv[K];
      case 'COMPOSE_PROJECT_NAME': return processEnvValue as unknown as NestDockerEnv[K];
      case 'MEMORY_LIMIT': return processEnvValue as unknown as NestDockerEnv[K];
      case 'MEMORY_RESERVATION': return processEnvValue as unknown as NestDockerEnv[K];
      case 'HEALTHCHECK_INTERVAL': return processEnvValue as unknown as NestDockerEnv[K];
      case 'HEALTHCHECK_TIMEOUT': return processEnvValue as unknown as NestDockerEnv[K];
      case 'HEALTHCHECK_RETRIES': return Number(processEnvValue) as unknown as NestDockerEnv[K];
      case 'HEALTHCHECK_START_PERIOD': return processEnvValue as unknown as NestDockerEnv[K];
      case 'ELASTIC_VERSION': return processEnvValue as unknown as NestDockerEnv[K];
      case 'LOGSTASH_INTERNAL_PASSWORD': return processEnvValue as unknown as NestDockerEnv[K];
      case 'METRICBEAT_INTERNAL_PASSWORD': return processEnvValue as unknown as NestDockerEnv[K];
      case 'FILEBEAT_INTERNAL_PASSWORD': return processEnvValue as unknown as NestDockerEnv[K];
      case 'HEARTBEAT_INTERNAL_PASSWORD': return processEnvValue as unknown as NestDockerEnv[K];
      case 'MONITORING_INTERNAL_PASSWORD': return processEnvValue as unknown as NestDockerEnv[K];
      case 'BEATS_SYSTEM_PASSWORD': return processEnvValue as unknown as NestDockerEnv[K];
      case 'ELASTICSEARCH_PORT': return Number(processEnvValue) as unknown as NestDockerEnv[K];
      case 'ELASTICSEARCH_MEM_LIMIT': return processEnvValue as unknown as NestDockerEnv[K];
      case 'ELASTICSEARCH_MEM_LIMIT_MIN': return processEnvValue as unknown as NestDockerEnv[K];
      case 'ELASTICSEARCH_CLUSTER_NAME': return processEnvValue as unknown as NestDockerEnv[K];
      case 'ELASTIC_PASSWORD': return processEnvValue as unknown as NestDockerEnv[K];
      case 'KIBANA_SYSTEM_PASSWORD': return processEnvValue as unknown as NestDockerEnv[K];
      case 'LOGSTASH_PORT': return Number(processEnvValue) as unknown as NestDockerEnv[K];
      case 'LOGSTASH_MEM_LIMIT': return processEnvValue as unknown as NestDockerEnv[K];
      case 'LOGSTASH_MEM_LIMIT_MIN': return processEnvValue as unknown as NestDockerEnv[K];
      case 'KIBANA_PORT': return Number(processEnvValue) as unknown as NestDockerEnv[K];
      case 'KIBANA_MEM_LIMIT': return processEnvValue as unknown as NestDockerEnv[K];
      case 'KIBANA_MEM_LIMIT_MIN': return processEnvValue as unknown as NestDockerEnv[K];
      case 'KIBANA_SERVICE_TOKEN': return processEnvValue as unknown as NestDockerEnv[K];
      case 'POSTGRES_VERSION': return processEnvValue as unknown as NestDockerEnv[K];
      case 'POSTGRES_PORT': return Number(processEnvValue) as unknown as NestDockerEnv[K];
      case 'POSTGRES_USER': return processEnvValue as unknown as NestDockerEnv[K];
      case 'POSTGRES_PASSWORD': return processEnvValue as unknown as NestDockerEnv[K];
      case 'POSTGRES_MEM_LIMIT': return processEnvValue as unknown as NestDockerEnv[K];
      case 'POSTGRES_MEM_LIMIT_MIN': return processEnvValue as unknown as NestDockerEnv[K];
      case 'REDIS_VERSION': return processEnvValue as unknown as NestDockerEnv[K];
      case 'REDIS_PORT': return Number(processEnvValue) as unknown as NestDockerEnv[K];
      case 'REDIS_PASSWORD': return processEnvValue as unknown as NestDockerEnv[K];
      case 'REDIS_MEM_LIMIT': return processEnvValue as unknown as NestDockerEnv[K];
      case 'REDIS_MEM_LIMIT_MIN': return processEnvValue as unknown as NestDockerEnv[K];
      case 'MINIO_VERSION': return processEnvValue as unknown as NestDockerEnv[K];
      case 'MINIO_API_PORT': return Number(processEnvValue) as unknown as NestDockerEnv[K];
      case 'MINIO_CONSOLE_PORT': return Number(processEnvValue) as unknown as NestDockerEnv[K];
      case 'MINIO_ROOT_USER': return processEnvValue as unknown as NestDockerEnv[K];
      case 'MINIO_ROOT_PASSWORD': return processEnvValue as unknown as NestDockerEnv[K];
      case 'MINIO_MEM_LIMIT': return processEnvValue as unknown as NestDockerEnv[K];
      case 'MINIO_MEM_LIMIT_MIN': return processEnvValue as unknown as NestDockerEnv[K];
      case 'GRAFANA_VERSION': return processEnvValue as unknown as NestDockerEnv[K];
      case 'GRAFANA_PORT': return Number(processEnvValue) as unknown as NestDockerEnv[K];
      case 'GRAFANA_ADMIN_PASSWORD': return processEnvValue as unknown as NestDockerEnv[K];
      case 'GRAFANA_MEM_LIMIT': return processEnvValue as unknown as NestDockerEnv[K];
      case 'GRAFANA_MEM_LIMIT_MIN': return processEnvValue as unknown as NestDockerEnv[K];
      case 'PROMETHEUS_VERSION': return processEnvValue as unknown as NestDockerEnv[K];
      case 'PROMETHEUS_PORT': return Number(processEnvValue) as unknown as NestDockerEnv[K];
      case 'PROMETHEUS_MEM_LIMIT': return processEnvValue as unknown as NestDockerEnv[K];
      case 'PROMETHEUS_MEM_LIMIT_MIN': return processEnvValue as unknown as NestDockerEnv[K];
      case 'JAEGER_VERSION': return processEnvValue as unknown as NestDockerEnv[K];
      case 'JAEGER_PORT': return Number(processEnvValue) as unknown as NestDockerEnv[K];
      case 'JAEGER_MEM_LIMIT': return processEnvValue as unknown as NestDockerEnv[K];
      case 'JAEGER_MEM_LIMIT_MIN': return processEnvValue as unknown as NestDockerEnv[K];
      case 'VAULT_VERSION': return processEnvValue as unknown as NestDockerEnv[K];
      case 'VAULT_PORT': return Number(processEnvValue) as unknown as NestDockerEnv[K];
      case 'VAULT_MEM_LIMIT': return processEnvValue as unknown as NestDockerEnv[K];
      case 'VAULT_MEM_LIMIT_MIN': return processEnvValue as unknown as NestDockerEnv[K];
      case 'TRAEFIK_VERSION': return processEnvValue as unknown as NestDockerEnv[K];
      case 'TRAEFIK_HTTP_PORT': return Number(processEnvValue) as unknown as NestDockerEnv[K];
      case 'TRAEFIK_HTTPS_PORT': return Number(processEnvValue) as unknown as NestDockerEnv[K];
      case 'TRAEFIK_DASHBOARD_PORT': return Number(processEnvValue) as unknown as NestDockerEnv[K];
      case 'TRAEFIK_MEM_LIMIT': return processEnvValue as unknown as NestDockerEnv[K];
      case 'TRAEFIK_MEM_LIMIT_MIN': return processEnvValue as unknown as NestDockerEnv[K];
      case 'DOMAIN_BASE': return processEnvValue as unknown as NestDockerEnv[K];
      case 'AUTH_DOMAIN': return processEnvValue as unknown as NestDockerEnv[K];
      case 'TRAEFIK_DOMAIN': return processEnvValue as unknown as NestDockerEnv[K];
      case 'KIBANA_DOMAIN': return processEnvValue as unknown as NestDockerEnv[K];
      case 'GRAFANA_DOMAIN': return processEnvValue as unknown as NestDockerEnv[K];
      case 'PROMETHEUS_DOMAIN': return processEnvValue as unknown as NestDockerEnv[K];
      case 'JAEGER_DOMAIN': return processEnvValue as unknown as NestDockerEnv[K];
      case 'PORTAINER_DOMAIN': return processEnvValue as unknown as NestDockerEnv[K];
      case 'PGADMIN_DOMAIN': return processEnvValue as unknown as NestDockerEnv[K];
      case 'REDIS_DOMAIN': return processEnvValue as unknown as NestDockerEnv[K];
      case 'MINIO_DOMAIN': return processEnvValue as unknown as NestDockerEnv[K];
      case 'MINIO_API_DOMAIN': return processEnvValue as unknown as NestDockerEnv[K];
      case 'VAULT_DOMAIN': return processEnvValue as unknown as NestDockerEnv[K];
      case 'SONARQUBE_DOMAIN': return processEnvValue as unknown as NestDockerEnv[K];
      case 'KAFKA_UI_DOMAIN': return processEnvValue as unknown as NestDockerEnv[K];
      case 'FRONTEND_PORT': return Number(processEnvValue) as unknown as NestDockerEnv[K];
      case 'BACKEND_PORT': return Number(processEnvValue) as unknown as NestDockerEnv[K];
      case 'SONARQUBE_VERSION': return processEnvValue as unknown as NestDockerEnv[K];
      case 'SONARQUBE_PORT': return Number(processEnvValue) as unknown as NestDockerEnv[K];
      case 'SONARQUBE_MEM_LIMIT': return processEnvValue as unknown as NestDockerEnv[K];
      case 'SONARQUBE_MEM_LIMIT_MIN': return processEnvValue as unknown as NestDockerEnv[K];
      case 'SONARQUBE_DB': return processEnvValue as unknown as NestDockerEnv[K];
      case 'PORTAINER_VERSION': return processEnvValue as unknown as NestDockerEnv[K];
      case 'PORTAINER_PORT': return Number(processEnvValue) as unknown as NestDockerEnv[K];
      case 'PORTAINER_MEM_LIMIT': return processEnvValue as unknown as NestDockerEnv[K];
      case 'PORTAINER_MEM_LIMIT_MIN': return processEnvValue as unknown as NestDockerEnv[K];
      case 'PGADMIN_VERSION': return processEnvValue as unknown as NestDockerEnv[K];
      case 'PGADMIN_PORT': return Number(processEnvValue) as unknown as NestDockerEnv[K];
      case 'PGADMIN_DEFAULT_EMAIL': return processEnvValue as unknown as NestDockerEnv[K];
      case 'PGADMIN_DEFAULT_PASSWORD': return processEnvValue as unknown as NestDockerEnv[K];
      case 'PGADMIN_MEM_LIMIT': return processEnvValue as unknown as NestDockerEnv[K];
      case 'PGADMIN_MEM_LIMIT_MIN': return processEnvValue as unknown as NestDockerEnv[K];
      case 'ZOOKEEPER_VERSION': return processEnvValue as unknown as NestDockerEnv[K];
      case 'KAFKA_VERSION': return processEnvValue as unknown as NestDockerEnv[K];
      case 'KAFKA_EXTERNAL_PORT': return Number(processEnvValue) as unknown as NestDockerEnv[K];
      case 'KAFKA_UI_PORT': return Number(processEnvValue) as unknown as NestDockerEnv[K];
      default: return processEnvValue as unknown as NestDockerEnv[K];
    }
  }

  getOrDefault<K extends keyof NestDockerEnv>(
    key: K,
    defaultValue: NestDockerEnv[K]
  ): NestDockerEnv[K] {
    try {
      return this.get(key);
    } catch {
      return defaultValue;
    }
  }
}