// Этот файл может быть пустым, так как мы больше не экспортируем типы
// Пакет теперь используется только для генерации .env файлов

// Динамический экспорт всех сгенерированных утилит

// Next.js утилиты
export { getNextSsoEnv } from './utils/next.js';

// Nest.js сервисы окружения
export {
  NestGatewayEnvService,
  NestAuditLoggingServiceEnvService,
  NestAuthServiceEnvService,
  NestIdentityServiceEnvService,
  NestNotificationServiceEnvService,
  NestSsoProviderServiceEnvService,
  NestUsersServiceEnvService,
} from './utils/nest.js';
