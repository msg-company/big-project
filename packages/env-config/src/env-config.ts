type EnvConfigType = 'number' | 'string' | 'boolean';

interface EnvConfigItem {
  type: EnvConfigType;
  value: string;
  required: boolean;
}

interface PlatformConfig {
  type: 'backend' | 'frontend';
  development: ServiceConfig;
  production: ServiceConfig;
}

interface ServiceConfig {
  [key: string]: EnvConfigItem;
}

interface DockerEnvConfig {
  type: string;
  development: Record<string, EnvConfigItem>;
  production?: Record<string, EnvConfigItem>;
}

interface EnvConfigPlatforms {
  gateway: PlatformConfig;
  sso: PlatformConfig;
  'audit-logging-service': PlatformConfig;
  'auth-service': PlatformConfig;
  'identity-service': PlatformConfig;
  'notification-service': PlatformConfig;
  'sso-provider-service': PlatformConfig;
  'users-service': PlatformConfig;
  docker: DockerEnvConfig;
}

interface EnvConfigStructure {
  platforms: EnvConfigPlatforms;
}

// Общие константы портов
export const PORTS = {
  GATEWAY: '4200',
  AUDIT_LOGGING_SERVICE: '4201',
  AUTH_SERVICE: '4202',
  IDENTITY_SERVICE: '4203',
  NOTIFICATION_SERVICE: '4204',
  SSO_PROVIDER_SERVICE: '4205',
  USERS_SERVICE: '4206',
  SSO: {
    DEVELOPMENT: '3001',
    PRODUCTION: '443',
  },
} as const;

export const DOCKER_PORTS = {
  // Инфраструктурные сервисы
  ELASTICSEARCH: '9200',
  LOGSTASH: '5044',
  KIBANA: '5601',
  POSTGRES: '5432',
  REDIS: '6379',
  MINIO_API: '9001',
  MINIO_CONSOLE: '9002',

  // Мониторинг
  GRAFANA: '2000',
  PROMETHEUS: '2001',
  JAEGER: '2002',
  TRAEFIK_DASHBOARD: '2003',
  VAULT: '2006',
  SONARQUBE: '2007',
  PORTAINER: '2008',
  PGADMIN: '5050',

  // Kafka и другие
  KAFKA_EXTERNAL: '9092',
  KAFKA_UI: '8080',

  // Основные порты
  FRONTEND: '3001',
  BACKEND: '4200',
  TRAEFIK_HTTP: '80',
  TRAEFIK_HTTPS: '443',
} as const;

export const COMMON_CREDENTIALS = {
  USER: 'admin',
  PASSWORD: 'changeme',
  ADMIN_EMAIL: 'admin@zip.io',
} as const;

export const POSTGRES_CONFIG = {
  HOST: 'localhost',
  USER: COMMON_CREDENTIALS.USER,
  PASSWORD: COMMON_CREDENTIALS.PASSWORD,
  DATABASES: {
    USERS: 'user_db',
    AUTH: 'auth_db',
    IDENTITY: 'identity_db',
    NOTIFICATION: 'notification_db',
    AUDIT_LOGGING: 'audit_db',
    SSO_PROVIDER: 'sso_provider_db',
    MAIN: 'main_db',
    SONARQUBE: 'sonarqube_db',
  },
} as const;

export const envConfig: EnvConfigStructure = {
  platforms: {
    gateway: {
      type: 'backend',
      development: {
        PORT: { type: 'number', value: PORTS.GATEWAY, required: true },
        USERS_SERVICE_PORT: { type: 'number', value: PORTS.USERS_SERVICE, required: true },
        AUTH_SERVICE_PORT: { type: 'number', value: PORTS.AUTH_SERVICE, required: true },
        IDENTITY_SERVICE_PORT: { type: 'number', value: PORTS.IDENTITY_SERVICE, required: true },
        AUDIT_LOGGING_SERVICE_PORT: {
          type: 'number',
          value: PORTS.AUDIT_LOGGING_SERVICE,
          required: true,
        },
        NOTIFICATION_SERVICE_PORT: {
          type: 'number',
          value: PORTS.NOTIFICATION_SERVICE,
          required: true,
        },
        SSO_PROVIDER_SERVICE_PORT: {
          type: 'number',
          value: PORTS.SSO_PROVIDER_SERVICE,
          required: true,
        },
      },
      production: {
        PORT: { type: 'number', value: PORTS.GATEWAY, required: true },
        USERS_SERVICE_PORT: { type: 'number', value: PORTS.USERS_SERVICE, required: true },
        AUTH_SERVICE_PORT: { type: 'number', value: PORTS.AUTH_SERVICE, required: true },
        IDENTITY_SERVICE_PORT: { type: 'number', value: PORTS.IDENTITY_SERVICE, required: true },
        AUDIT_LOGGING_SERVICE_PORT: {
          type: 'number',
          value: PORTS.AUDIT_LOGGING_SERVICE,
          required: true,
        },
        NOTIFICATION_SERVICE_PORT: {
          type: 'number',
          value: PORTS.NOTIFICATION_SERVICE,
          required: true,
        },
        SSO_PROVIDER_SERVICE_PORT: {
          type: 'number',
          value: PORTS.SSO_PROVIDER_SERVICE,
          required: true,
        },
      },
    },
    sso: {
      type: 'frontend',
      development: {
        PORT: { type: 'number', value: PORTS.SSO.DEVELOPMENT, required: true },
      },
      production: {
        PORT: { type: 'number', value: PORTS.SSO.PRODUCTION, required: true },
      },
    },
    'audit-logging-service': {
      type: 'backend',
      development: {
        PORT: { type: 'number', value: PORTS.AUDIT_LOGGING_SERVICE, required: true },
        POSTGRES_DB: {
          type: 'string',
          value: POSTGRES_CONFIG.DATABASES.AUDIT_LOGGING,
          required: true,
        },
      },
      production: {
        PORT: { type: 'number', value: PORTS.AUDIT_LOGGING_SERVICE, required: true },
        POSTGRES_DB: {
          type: 'string',
          value: POSTGRES_CONFIG.DATABASES.AUDIT_LOGGING,
          required: true,
        },
      },
    },
    'auth-service': {
      type: 'backend',
      development: {
        PORT: { type: 'number', value: PORTS.AUTH_SERVICE, required: true },
        POSTGRES_DB: { type: 'string', value: POSTGRES_CONFIG.DATABASES.AUTH, required: true },
      },
      production: {
        PORT: { type: 'number', value: PORTS.AUTH_SERVICE, required: true },
        POSTGRES_DB: { type: 'string', value: POSTGRES_CONFIG.DATABASES.AUTH, required: true },
      },
    },
    'identity-service': {
      type: 'backend',
      development: {
        PORT: { type: 'number', value: PORTS.IDENTITY_SERVICE, required: true },
        POSTGRES_DB: { type: 'string', value: POSTGRES_CONFIG.DATABASES.IDENTITY, required: true },
      },
      production: {
        PORT: { type: 'number', value: PORTS.IDENTITY_SERVICE, required: true },
        POSTGRES_DB: { type: 'string', value: POSTGRES_CONFIG.DATABASES.IDENTITY, required: true },
      },
    },
    'notification-service': {
      type: 'backend',
      development: {
        PORT: { type: 'number', value: PORTS.NOTIFICATION_SERVICE, required: true },
        POSTGRES_DB: {
          type: 'string',
          value: POSTGRES_CONFIG.DATABASES.NOTIFICATION,
          required: true,
        },
      },
      production: {
        PORT: { type: 'number', value: PORTS.NOTIFICATION_SERVICE, required: true },
        POSTGRES_DB: {
          type: 'string',
          value: POSTGRES_CONFIG.DATABASES.NOTIFICATION,
          required: true,
        },
      },
    },
    'sso-provider-service': {
      type: 'backend',
      development: {
        PORT: { type: 'number', value: PORTS.SSO_PROVIDER_SERVICE, required: true },
        POSTGRES_DB: {
          type: 'string',
          value: POSTGRES_CONFIG.DATABASES.SSO_PROVIDER,
          required: true,
        },
      },
      production: {
        PORT: { type: 'number', value: PORTS.SSO_PROVIDER_SERVICE, required: true },
        POSTGRES_DB: {
          type: 'string',
          value: POSTGRES_CONFIG.DATABASES.SSO_PROVIDER,
          required: true,
        },
      },
    },
    'users-service': {
      type: 'backend',
      development: {
        PORT: { type: 'number', value: PORTS.USERS_SERVICE, required: true },
        POSTGRES_DB: { type: 'string', value: POSTGRES_CONFIG.DATABASES.USERS, required: true },
        POSTGRES_HOST: { type: 'string', value: POSTGRES_CONFIG.HOST, required: true },
        POSTGRES_PORT: { type: 'number', value: DOCKER_PORTS.POSTGRES, required: true },
        POSTGRES_USER: { type: 'string', value: POSTGRES_CONFIG.USER, required: true },
        POSTGRES_PASSWORD: { type: 'string', value: POSTGRES_CONFIG.PASSWORD, required: false },
      },
      production: {
        PORT: { type: 'number', value: PORTS.USERS_SERVICE, required: true },
        POSTGRES_DB: { type: 'string', value: POSTGRES_CONFIG.DATABASES.USERS, required: true },
        POSTGRES_HOST: { type: 'string', value: POSTGRES_CONFIG.HOST, required: true },
        POSTGRES_PORT: { type: 'number', value: DOCKER_PORTS.POSTGRES, required: true },
        POSTGRES_USER: { type: 'string', value: POSTGRES_CONFIG.USER, required: true },
        POSTGRES_PASSWORD: { type: 'string', value: POSTGRES_CONFIG.PASSWORD, required: false },
      },
    },
    docker: {
      type: 'backend',
      development: {
        // Глобальные настройки
        POSTGRES_MULTIPLE_DATABASES: {
          type: 'string',
          value: Object.values(POSTGRES_CONFIG.DATABASES).join(','),
          required: true,
        },
        TIMEZONE: { type: 'string', value: 'Europe/London', required: true },
        COMPOSE_PROJECT_NAME: { type: 'string', value: 'main-app', required: true },

        // Лимиты памяти
        MEMORY_LIMIT: { type: 'string', value: '512m', required: true },
        MEMORY_RESERVATION: { type: 'string', value: '256m', required: true },

        // Настройки проверки здоровья
        HEALTHCHECK_INTERVAL: { type: 'string', value: '10s', required: true },
        HEALTHCHECK_TIMEOUT: { type: 'string', value: '5s', required: true },
        HEALTHCHECK_RETRIES: { type: 'number', value: '5', required: true },
        HEALTHCHECK_START_PERIOD: { type: 'string', value: '30s', required: true },

        // ELK Stack
        ELASTIC_VERSION: { type: 'string', value: '8.17.0', required: true },
        LOGSTASH_INTERNAL_PASSWORD: { type: 'string', value: 'changeme', required: false },
        METRICBEAT_INTERNAL_PASSWORD: { type: 'string', value: 'changeme', required: false },
        FILEBEAT_INTERNAL_PASSWORD: { type: 'string', value: 'changeme', required: false },
        HEARTBEAT_INTERNAL_PASSWORD: { type: 'string', value: 'changeme', required: false },
        MONITORING_INTERNAL_PASSWORD: { type: 'string', value: 'changeme', required: false },
        BEATS_SYSTEM_PASSWORD: { type: 'string', value: 'changeme', required: false },

        // Elasticsearch
        ELASTICSEARCH_PORT: { type: 'number', value: DOCKER_PORTS.ELASTICSEARCH, required: true },
        ELASTICSEARCH_MEM_LIMIT: { type: 'string', value: '2g', required: true },
        ELASTICSEARCH_MEM_LIMIT_MIN: { type: 'string', value: '1g', required: true },
        ELASTICSEARCH_CLUSTER_NAME: { type: 'string', value: 'docker-cluster', required: true },
        ELASTIC_PASSWORD: { type: 'string', value: 'changeme', required: false },
        KIBANA_SYSTEM_PASSWORD: { type: 'string', value: 'changeme', required: false },

        // Logstash
        LOGSTASH_PORT: { type: 'number', value: DOCKER_PORTS.LOGSTASH, required: true },
        LOGSTASH_MEM_LIMIT: { type: 'string', value: '1g', required: true },
        LOGSTASH_MEM_LIMIT_MIN: { type: 'string', value: '512m', required: true },

        // Kibana
        KIBANA_PORT: { type: 'number', value: DOCKER_PORTS.KIBANA, required: true },
        KIBANA_MEM_LIMIT: { type: 'string', value: '1g', required: true },
        KIBANA_MEM_LIMIT_MIN: { type: 'string', value: '512m', required: true },
        KIBANA_SERVICE_TOKEN: {
          type: 'string',
          value: 'AAEAAWVsYXN0aWMva2liYW5hL2RlZmF1bHQ6ZGVmYXVsdF90b2tlbg',
          required: false,
        },

        // PostgreSQL
        POSTGRES_VERSION: { type: 'string', value: '14.15', required: true },
        POSTGRES_PORT: { type: 'number', value: DOCKER_PORTS.POSTGRES, required: true },
        POSTGRES_USER: { type: 'string', value: POSTGRES_CONFIG.USER, required: true },
        POSTGRES_PASSWORD: { type: 'string', value: POSTGRES_CONFIG.PASSWORD, required: false },
        POSTGRES_MEM_LIMIT: { type: 'string', value: '1G', required: true },
        POSTGRES_MEM_LIMIT_MIN: { type: 'string', value: '512m', required: true },

        // Redis
        REDIS_VERSION: { type: 'string', value: 'latest', required: true },
        REDIS_PORT: { type: 'number', value: DOCKER_PORTS.REDIS, required: true },
        REDIS_PASSWORD: {
          type: 'string',
          value: COMMON_CREDENTIALS.PASSWORD,
          required: false,
        },
        REDIS_MEM_LIMIT: { type: 'string', value: '512m', required: true },
        REDIS_MEM_LIMIT_MIN: { type: 'string', value: '256m', required: true },

        // MinIO
        MINIO_VERSION: { type: 'string', value: 'latest', required: true },
        MINIO_API_PORT: { type: 'number', value: DOCKER_PORTS.MINIO_API, required: true },
        MINIO_CONSOLE_PORT: { type: 'number', value: DOCKER_PORTS.MINIO_CONSOLE, required: true },
        MINIO_ROOT_USER: { type: 'string', value: COMMON_CREDENTIALS.USER, required: true },
        MINIO_ROOT_PASSWORD: {
          type: 'string',
          value: COMMON_CREDENTIALS.PASSWORD,
          required: false,
        },
        MINIO_MEM_LIMIT: { type: 'string', value: '512m', required: true },
        MINIO_MEM_LIMIT_MIN: { type: 'string', value: '256m', required: true },

        // Мониторинг - Grafana
        GRAFANA_VERSION: { type: 'string', value: 'latest', required: true },
        GRAFANA_PORT: { type: 'number', value: DOCKER_PORTS.GRAFANA, required: true },
        GRAFANA_ADMIN_PASSWORD: {
          type: 'string',
          value: COMMON_CREDENTIALS.PASSWORD,
          required: true,
        },
        GRAFANA_MEM_LIMIT: { type: 'string', value: '512m', required: true },
        GRAFANA_MEM_LIMIT_MIN: { type: 'string', value: '256m', required: true },

        // Prometheus
        PROMETHEUS_VERSION: { type: 'string', value: 'latest', required: true },
        PROMETHEUS_PORT: { type: 'number', value: DOCKER_PORTS.PROMETHEUS, required: true },
        PROMETHEUS_MEM_LIMIT: { type: 'string', value: '1G', required: true },
        PROMETHEUS_MEM_LIMIT_MIN: { type: 'string', value: '512M', required: true },

        // Jaeger
        JAEGER_VERSION: { type: 'string', value: 'latest', required: true },
        JAEGER_PORT: { type: 'number', value: DOCKER_PORTS.JAEGER, required: true },
        JAEGER_MEM_LIMIT: { type: 'string', value: '512G', required: true },
        JAEGER_MEM_LIMIT_MIN: { type: 'string', value: '256M', required: true },

        // Vault
        VAULT_VERSION: { type: 'string', value: '1.13.3', required: true },
        VAULT_PORT: { type: 'number', value: DOCKER_PORTS.VAULT, required: true },
        VAULT_MEM_LIMIT: { type: 'string', value: '512M', required: true },
        VAULT_MEM_LIMIT_MIN: { type: 'string', value: '256M', required: true },

        // Traefik
        TRAEFIK_VERSION: { type: 'string', value: 'latest', required: true },
        TRAEFIK_HTTP_PORT: { type: 'number', value: DOCKER_PORTS.TRAEFIK_HTTP, required: true },
        TRAEFIK_HTTPS_PORT: { type: 'number', value: DOCKER_PORTS.TRAEFIK_HTTPS, required: true },
        TRAEFIK_DASHBOARD_PORT: {
          type: 'number',
          value: DOCKER_PORTS.TRAEFIK_DASHBOARD,
          required: true,
        },
        TRAEFIK_MEM_LIMIT: { type: 'string', value: '256M', required: true },
        TRAEFIK_MEM_LIMIT_MIN: { type: 'string', value: '128M', required: true },

        // Домены
        DOMAIN_BASE: { type: 'string', value: 'localhost', required: true },
        AUTH_DOMAIN: { type: 'string', value: 'auth.${DOMAIN_BASE}', required: true },
        TRAEFIK_DOMAIN: { type: 'string', value: 'traefik.${DOMAIN_BASE}', required: true },
        KIBANA_DOMAIN: { type: 'string', value: 'kibana.${DOMAIN_BASE}', required: true },
        GRAFANA_DOMAIN: { type: 'string', value: 'grafana.${DOMAIN_BASE}', required: true },
        PROMETHEUS_DOMAIN: { type: 'string', value: 'prometheus.${DOMAIN_BASE}', required: true },
        JAEGER_DOMAIN: { type: 'string', value: 'jaeger.${DOMAIN_BASE}', required: true },
        PORTAINER_DOMAIN: { type: 'string', value: 'portainer.${DOMAIN_BASE}', required: true },
        PGADMIN_DOMAIN: { type: 'string', value: 'pgadmin.${DOMAIN_BASE}', required: true },
        REDIS_DOMAIN: { type: 'string', value: 'redis-commander.${DOMAIN_BASE}', required: true },
        MINIO_DOMAIN: { type: 'string', value: 'minio.${DOMAIN_BASE}', required: true },
        MINIO_API_DOMAIN: { type: 'string', value: 'minio-api.${DOMAIN_BASE}', required: true },
        VAULT_DOMAIN: { type: 'string', value: 'vault.${DOMAIN_BASE}', required: true },
        SONARQUBE_DOMAIN: { type: 'string', value: 'sonarqube.${DOMAIN_BASE}', required: true },
        KAFKA_UI_DOMAIN: { type: 'string', value: 'kafka-ui.${DOMAIN_BASE}', required: true },

        // Порты фронтенда и бэкенда
        FRONTEND_PORT: { type: 'number', value: DOCKER_PORTS.FRONTEND, required: true },
        BACKEND_PORT: { type: 'number', value: DOCKER_PORTS.BACKEND, required: true },

        // Дополнительные сервисы
        SONARQUBE_VERSION: { type: 'string', value: 'latest', required: true },
        SONARQUBE_PORT: { type: 'number', value: DOCKER_PORTS.SONARQUBE, required: true },
        SONARQUBE_MEM_LIMIT: { type: 'string', value: '2G', required: true },
        SONARQUBE_MEM_LIMIT_MIN: { type: 'string', value: '1G', required: true },
        SONARQUBE_DB: {
          type: 'string',
          value: POSTGRES_CONFIG.DATABASES.SONARQUBE,
          required: true,
        },

        PORTAINER_VERSION: { type: 'string', value: 'latest', required: true },
        PORTAINER_PORT: { type: 'number', value: DOCKER_PORTS.PORTAINER, required: true },
        PORTAINER_MEM_LIMIT: { type: 'string', value: '512M', required: true },
        PORTAINER_MEM_LIMIT_MIN: { type: 'string', value: '256M', required: true },

        PGADMIN_VERSION: { type: 'string', value: 'latest', required: true },
        PGADMIN_PORT: { type: 'number', value: DOCKER_PORTS.PGADMIN, required: true },
        PGADMIN_DEFAULT_EMAIL: {
          type: 'string',
          value: COMMON_CREDENTIALS.ADMIN_EMAIL,
          required: true,
        },
        PGADMIN_DEFAULT_PASSWORD: {
          type: 'string',
          value: COMMON_CREDENTIALS.PASSWORD,
          required: false,
        },
        PGADMIN_MEM_LIMIT: { type: 'string', value: '512M', required: true },
        PGADMIN_MEM_LIMIT_MIN: { type: 'string', value: '256M', required: true },

        // Kafka
        ZOOKEEPER_VERSION: { type: 'string', value: 'latest', required: true },
        KAFKA_VERSION: { type: 'string', value: 'latest', required: true },
        KAFKA_EXTERNAL_PORT: { type: 'number', value: DOCKER_PORTS.KAFKA_EXTERNAL, required: true },
        KAFKA_UI_PORT: { type: 'number', value: DOCKER_PORTS.KAFKA_UI, required: true },
      },
      production: {
        POSTGRES_MULTIPLE_DATABASES: {
          type: 'string',
          value: Object.values(POSTGRES_CONFIG.DATABASES).join(','),
          required: true,
        },
        POSTGRES_USER: { type: 'string', value: POSTGRES_CONFIG.USER, required: true },
        POSTGRES_PASSWORD: { type: 'string', value: POSTGRES_CONFIG.PASSWORD, required: false },
        // Остальные переменные остаются без изменений
        TIMEZONE: { type: 'string', value: 'Europe/London', required: true },
        COMPOSE_PROJECT_NAME: { type: 'string', value: 'main-app', required: true },

        // Лимиты памяти
        MEMORY_LIMIT: { type: 'string', value: '512m', required: true },
        MEMORY_RESERVATION: { type: 'string', value: '256m', required: true },

        // Настройки проверки здоровья
        HEALTHCHECK_INTERVAL: { type: 'string', value: '10s', required: true },
        HEALTHCHECK_TIMEOUT: { type: 'string', value: '5s', required: true },
        HEALTHCHECK_RETRIES: { type: 'number', value: '5', required: true },
        HEALTHCHECK_START_PERIOD: { type: 'string', value: '30s', required: true },

        // ELK Stack
        ELASTIC_VERSION: { type: 'string', value: '8.17.0', required: true },
        LOGSTASH_INTERNAL_PASSWORD: { type: 'string', value: 'changeme', required: false },
        METRICBEAT_INTERNAL_PASSWORD: { type: 'string', value: 'changeme', required: false },
        FILEBEAT_INTERNAL_PASSWORD: { type: 'string', value: 'changeme', required: false },
        HEARTBEAT_INTERNAL_PASSWORD: { type: 'string', value: 'changeme', required: false },
        MONITORING_INTERNAL_PASSWORD: { type: 'string', value: 'changeme', required: false },
        BEATS_SYSTEM_PASSWORD: { type: 'string', value: 'changeme', required: false },

        // Elasticsearch
        ELASTICSEARCH_PORT: { type: 'number', value: DOCKER_PORTS.ELASTICSEARCH, required: true },
        ELASTICSEARCH_MEM_LIMIT: { type: 'string', value: '2g', required: true },
        ELASTICSEARCH_MEM_LIMIT_MIN: { type: 'string', value: '1g', required: true },
        ELASTICSEARCH_CLUSTER_NAME: { type: 'string', value: 'docker-cluster', required: true },
        ELASTIC_PASSWORD: { type: 'string', value: 'changeme', required: false },
        KIBANA_SYSTEM_PASSWORD: { type: 'string', value: 'changeme', required: false },

        // Logstash
        LOGSTASH_PORT: { type: 'number', value: DOCKER_PORTS.LOGSTASH, required: true },
        LOGSTASH_MEM_LIMIT: { type: 'string', value: '1g', required: true },
        LOGSTASH_MEM_LIMIT_MIN: { type: 'string', value: '512m', required: true },

        // Kibana
        KIBANA_PORT: { type: 'number', value: DOCKER_PORTS.KIBANA, required: true },
        KIBANA_MEM_LIMIT: { type: 'string', value: '1g', required: true },
        KIBANA_MEM_LIMIT_MIN: { type: 'string', value: '512m', required: true },
        KIBANA_SERVICE_TOKEN: {
          type: 'string',
          value: 'AAEAAWVsYXN0aWMva2liYW5hL2RlZmF1bHQ6ZGVmYXVsdF90b2tlbg',
          required: false,
        },

        // PostgreSQL
        POSTGRES_VERSION: { type: 'string', value: '14.15', required: true },
        POSTGRES_PORT: { type: 'number', value: DOCKER_PORTS.POSTGRES, required: true },
        POSTGRES_MEM_LIMIT: { type: 'string', value: '1G', required: true },
        POSTGRES_MEM_LIMIT_MIN: { type: 'string', value: '512m', required: true },

        // Redis
        REDIS_VERSION: { type: 'string', value: 'latest', required: true },
        REDIS_PORT: { type: 'number', value: DOCKER_PORTS.REDIS, required: true },
        REDIS_PASSWORD: {
          type: 'string',
          value: COMMON_CREDENTIALS.PASSWORD,
          required: false,
        },
        REDIS_MEM_LIMIT: { type: 'string', value: '512m', required: true },
        REDIS_MEM_LIMIT_MIN: { type: 'string', value: '256m', required: true },

        // MinIO
        MINIO_VERSION: { type: 'string', value: 'latest', required: true },
        MINIO_API_PORT: { type: 'number', value: DOCKER_PORTS.MINIO_API, required: true },
        MINIO_CONSOLE_PORT: { type: 'number', value: DOCKER_PORTS.MINIO_CONSOLE, required: true },
        MINIO_ROOT_USER: { type: 'string', value: COMMON_CREDENTIALS.USER, required: true },
        MINIO_ROOT_PASSWORD: {
          type: 'string',
          value: COMMON_CREDENTIALS.PASSWORD,
          required: false,
        },
        MINIO_MEM_LIMIT: { type: 'string', value: '512m', required: true },
        MINIO_MEM_LIMIT_MIN: { type: 'string', value: '256m', required: true },

        // Мониторинг - Grafana
        GRAFANA_VERSION: { type: 'string', value: 'latest', required: true },
        GRAFANA_PORT: { type: 'number', value: DOCKER_PORTS.GRAFANA, required: true },
        GRAFANA_ADMIN_PASSWORD: {
          type: 'string',
          value: COMMON_CREDENTIALS.PASSWORD,
          required: false,
        },
        GRAFANA_MEM_LIMIT: { type: 'string', value: '512m', required: true },
        GRAFANA_MEM_LIMIT_MIN: { type: 'string', value: '256m', required: true },

        // Prometheus
        PROMETHEUS_VERSION: { type: 'string', value: 'latest', required: true },
        PROMETHEUS_PORT: { type: 'number', value: DOCKER_PORTS.PROMETHEUS, required: true },
        PROMETHEUS_MEM_LIMIT: { type: 'string', value: '1G', required: true },
        PROMETHEUS_MEM_LIMIT_MIN: { type: 'string', value: '512M', required: true },

        // Jaeger
        JAEGER_VERSION: { type: 'string', value: 'latest', required: true },
        JAEGER_PORT: { type: 'number', value: DOCKER_PORTS.JAEGER, required: true },
        JAEGER_MEM_LIMIT: { type: 'string', value: '512G', required: true },
        JAEGER_MEM_LIMIT_MIN: { type: 'string', value: '256M', required: true },

        // Vault
        VAULT_VERSION: { type: 'string', value: '1.13.3', required: true },
        VAULT_PORT: { type: 'number', value: DOCKER_PORTS.VAULT, required: true },
        VAULT_MEM_LIMIT: { type: 'string', value: '512M', required: true },
        VAULT_MEM_LIMIT_MIN: { type: 'string', value: '256M', required: true },

        // Traefik
        TRAEFIK_VERSION: { type: 'string', value: 'latest', required: true },
        TRAEFIK_HTTP_PORT: { type: 'number', value: DOCKER_PORTS.TRAEFIK_HTTP, required: true },
        TRAEFIK_HTTPS_PORT: { type: 'number', value: DOCKER_PORTS.TRAEFIK_HTTPS, required: true },
        TRAEFIK_DASHBOARD_PORT: {
          type: 'number',
          value: DOCKER_PORTS.TRAEFIK_DASHBOARD,
          required: true,
        },
        TRAEFIK_MEM_LIMIT: { type: 'string', value: '256M', required: true },
        TRAEFIK_MEM_LIMIT_MIN: { type: 'string', value: '128M', required: true },

        // Домены
        DOMAIN_BASE: { type: 'string', value: 'localhost', required: true },
        AUTH_DOMAIN: { type: 'string', value: 'auth.${DOMAIN_BASE}', required: true },
        TRAEFIK_DOMAIN: { type: 'string', value: 'traefik.${DOMAIN_BASE}', required: true },
        KIBANA_DOMAIN: { type: 'string', value: 'kibana.${DOMAIN_BASE}', required: true },
        GRAFANA_DOMAIN: { type: 'string', value: 'grafana.${DOMAIN_BASE}', required: true },
        PROMETHEUS_DOMAIN: { type: 'string', value: 'prometheus.${DOMAIN_BASE}', required: true },
        JAEGER_DOMAIN: { type: 'string', value: 'jaeger.${DOMAIN_BASE}', required: true },
        PORTAINER_DOMAIN: { type: 'string', value: 'portainer.${DOMAIN_BASE}', required: true },
        PGADMIN_DOMAIN: { type: 'string', value: 'pgadmin.${DOMAIN_BASE}', required: true },
        REDIS_DOMAIN: { type: 'string', value: 'redis-commander.${DOMAIN_BASE}', required: true },
        MINIO_DOMAIN: { type: 'string', value: 'minio.${DOMAIN_BASE}', required: true },
        MINIO_API_DOMAIN: { type: 'string', value: 'minio-api.${DOMAIN_BASE}', required: true },
        VAULT_DOMAIN: { type: 'string', value: 'vault.${DOMAIN_BASE}', required: true },
        SONARQUBE_DOMAIN: { type: 'string', value: 'sonarqube.${DOMAIN_BASE}', required: true },
        KAFKA_UI_DOMAIN: { type: 'string', value: 'kafka-ui.${DOMAIN_BASE}', required: true },

        // Порты фронтенда и бэкенда
        FRONTEND_PORT: { type: 'number', value: DOCKER_PORTS.FRONTEND, required: true },
        BACKEND_PORT: { type: 'number', value: DOCKER_PORTS.BACKEND, required: true },

        // Дополнительные сервисы
        SONARQUBE_VERSION: { type: 'string', value: 'latest', required: true },
        SONARQUBE_PORT: { type: 'number', value: DOCKER_PORTS.SONARQUBE, required: true },
        SONARQUBE_MEM_LIMIT: { type: 'string', value: '2G', required: true },
        SONARQUBE_MEM_LIMIT_MIN: { type: 'string', value: '1G', required: true },
        SONARQUBE_DB: {
          type: 'string',
          value: POSTGRES_CONFIG.DATABASES.SONARQUBE,
          required: true,
        },

        PORTAINER_VERSION: { type: 'string', value: 'latest', required: true },
        PORTAINER_PORT: { type: 'number', value: DOCKER_PORTS.PORTAINER, required: true },
        PORTAINER_MEM_LIMIT: { type: 'string', value: '512M', required: true },
        PORTAINER_MEM_LIMIT_MIN: { type: 'string', value: '256M', required: true },

        PGADMIN_VERSION: { type: 'string', value: 'latest', required: true },
        PGADMIN_PORT: { type: 'number', value: DOCKER_PORTS.PGADMIN, required: true },
        PGADMIN_DEFAULT_EMAIL: {
          type: 'string',
          value: COMMON_CREDENTIALS.ADMIN_EMAIL,
          required: true,
        },
        PGADMIN_DEFAULT_PASSWORD: {
          type: 'string',
          value: COMMON_CREDENTIALS.PASSWORD,
          required: false,
        },
        PGADMIN_MEM_LIMIT: { type: 'string', value: '512M', required: true },
        PGADMIN_MEM_LIMIT_MIN: { type: 'string', value: '256M', required: true },

        // Kafka
        ZOOKEEPER_VERSION: { type: 'string', value: 'latest', required: true },
        KAFKA_VERSION: { type: 'string', value: 'latest', required: true },
        KAFKA_EXTERNAL_PORT: { type: 'number', value: DOCKER_PORTS.KAFKA_EXTERNAL, required: true },
        KAFKA_UI_PORT: { type: 'number', value: DOCKER_PORTS.KAFKA_UI, required: true },
      },
    },
  },
};
