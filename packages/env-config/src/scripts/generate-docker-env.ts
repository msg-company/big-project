import { writeFileSync } from 'fs';
import { join } from 'path';

import { envConfig } from '../env-config';

function generateDockerEnvFile(env: 'development' | 'production' = 'development') {
  const dockerConfig = envConfig.platforms.docker[env];

  if (!dockerConfig) {
    throw new Error(`No docker configuration found for environment: ${env}`);
  }

  const envLines: string[] = [];

  for (const [key, config] of Object.entries(dockerConfig)) {
    // Пропускаем ключ 'type', так как это не env-переменная
    if (key === 'type') continue;

    // Обработка шаблонных строк с ${DOMAIN_BASE}
    let value = config.value;
    if (
      typeof value === 'string' &&
      value.includes('${DOMAIN_BASE}') &&
      'DOMAIN_BASE' in dockerConfig
    ) {
      const domainBase = dockerConfig['DOMAIN_BASE' as keyof typeof dockerConfig];
      if (domainBase && typeof domainBase.value === 'string') {
        value = value.replace('${DOMAIN_BASE}', domainBase.value);
      }
    }

    envLines.push(`${key}=${value}`);
  }

  return envLines.join('\n');
}

function writeDockerEnvFile(env: 'development' | 'production' = 'development', filePath?: string) {
  const dockerEnvContent = generateDockerEnvFile(env);

  const defaultPath = join(__dirname, '../../../../docker/.env');
  const targetPath = filePath || defaultPath;

  writeFileSync(targetPath, dockerEnvContent);
  console.log(`✨ Docker .env file generated at: ${targetPath}`);
}

try {
  // Генерация для development
  writeDockerEnvFile('development');

  // При необходимости можно сгенерировать и production
  // writeDockerEnvFile('production', '/path/to/production/docker/.env');
} catch (error) {
  console.error('❌ Error generating Docker .env file:', error);
  process.exit(1);
}
