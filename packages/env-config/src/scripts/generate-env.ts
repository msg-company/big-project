import { mkdirSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import { envConfig } from '../env-config';

// Получаем эквивалент __dirname для ES-модулей
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Типы для конфигурации
interface EnvValue {
  type: string;
  value: string;
  required: boolean;
}

interface EnvObject {
  [key: string]: EnvValue;
}

interface PlatformConfig {
  type: string;
  development?: EnvObject;
  production?: EnvObject;
}

interface Config {
  platforms: {
    [key: string]: PlatformConfig;
  };
}

function loadConfig(): Config {
  const platforms: { [key: string]: PlatformConfig } = {};

  for (const [key, value] of Object.entries(envConfig.platforms)) {
    platforms[key] = {
      type: value.type,
      development: value.development,
      production: value.production,
    };
  }

  return { platforms };
}

function ensureDirectoryExists(path: string) {
  mkdirSync(path, { recursive: true });
}

function generateEnvFile(
  appName: string,
  type: string,
  env: string,
  variables: Record<string, any>,
) {
  const content = Object.entries(variables)
    .map(([key, config]) => `${key}=${config.value}`)
    .join('\n');

  // Путь к корневой директории проекта (где находится apps)
  const rootDir = join(__dirname, '../../../../');

  // Путь к приложению (apps/frontend/sso или apps/backend/gateway)
  const appPath = join(rootDir, 'apps', type, appName);
  ensureDirectoryExists(appPath);

  // Генерируем .env файл
  const filePath = join(appPath, env === 'development' ? '.env.development' : '.env.production');
  writeFileSync(filePath, content);
  console.log(`✨ Generated apps/${type}/${appName}/.env.${env}`);
}

try {
  const config = loadConfig();

  // Генерируем .env файлы для каждой платформы и окружения
  Object.entries(config.platforms).forEach(([appName, platformConfig]) => {
    // Пропускаем платформу docker
    if (appName === 'docker') {
      return;
    }

    const type = platformConfig.type;

    // Пропускаем если тип не указан
    if (!type) {
      console.warn(`⚠️ Skipping ${appName}: type not specified`);
      return;
    }

    // Генерируем для development и production
    if (platformConfig.development) {
      generateEnvFile(appName, type, 'development', platformConfig.development);
    }

    if (platformConfig.production) {
      generateEnvFile(appName, type, 'production', platformConfig.production);
    }
  });

  console.log('✨ All .env files generated successfully!');
} catch (error) {
  console.error('❌ Error generating .env files:', error);
  process.exit(1);
}
