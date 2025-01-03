import { mkdirSync, writeFileSync } from 'fs';
import { dirname, resolve } from 'path';

import { envConfig } from '../env-config';

const __filename = resolve('generate-utils.ts');
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

function generateNextUtils(platforms: Record<string, PlatformConfig>): string {
  const nextPlatforms = Object.entries(platforms).filter(
    ([_, config]) => config.type === 'frontend',
  );

  const interfaceDefinitions = nextPlatforms
    .map(([name, config]) => {
      const envVars = config.development || {};
      const props = Object.entries(envVars)
        .map(([key, value]) => {
          const type =
            value.type === 'number' ? 'number' : value.type === 'boolean' ? 'boolean' : 'string';
          return `  ${key}${value.required ? '' : '?'}: ${type};`;
        })
        .join('\n');

      return `export interface Next${name.charAt(0).toUpperCase() + name.slice(1)}Env {
${props}
}`;
    })
    .join('\n\n');

  const schemaDefinitions = nextPlatforms
    .map(([name, config]) => {
      const envVars = config.development || {};
      const schema = Object.entries(envVars)
        .map(([key, value]) => {
          let schemaType = 'z.string()';
          if (value.type === 'number') {
            schemaType = 'z.string().transform(Number)';
          } else if (value.type === 'boolean') {
            schemaType = 'z.string().transform(val => val === "true")';
          }
          if (!value.required) {
            schemaType += '.optional()';
          }
          return `  ${key}: ${schemaType},`;
        })
        .join('\n');

      return `const next${name.charAt(0).toUpperCase() + name.slice(1)}EnvSchema = z.object({
${schema}
});`;
    })
    .join('\n\n');

  const getterDefinitions = nextPlatforms
    .map(([name, config]) => {
      const envVars = config.development || {};
      const getterLogic = Object.entries(envVars)
        .map(([key, value]) => {
          let getter = `    ${key}: `;
          if (value.type === 'number') {
            getter += `Number(process.env.${key})`;
          } else if (value.type === 'boolean') {
            getter += `process.env.${key} === 'true'`;
          } else {
            getter += `process.env.${key}`;
          }
          if (value.required) {
            getter += ` ?? throwError('${key}')`;
          }
          return getter + ',';
        })
        .join('\n');

      return `export function getNext${name.charAt(0).toUpperCase() + name.slice(1)}Env(): Next${name.charAt(0).toUpperCase() + name.slice(1)}Env {
  const result = next${name.charAt(0).toUpperCase() + name.slice(1)}EnvSchema.safeParse(process.env);

  if (!result.success) {
    console.error('❌ Invalid environment variables:', result.error.format());
    throw new Error('Invalid environment variables');
  }

  return {
${getterLogic}
  };
}`;
    })
    .join('\n\n');

  return `import { z } from 'zod';

function throwError(key: string): never {
  throw new Error(\`Missing environment variable: \${key}\`);
}

${interfaceDefinitions}

${schemaDefinitions}

${getterDefinitions}`;
}

function generateNestUtils(platforms: Record<string, PlatformConfig>): string {
  const nestPlatforms = Object.entries(platforms).filter(
    ([_, config]) => config.type === 'backend',
  );

  const imports = new Set([
    "import { Injectable } from '@nestjs/common'",
    "import { z } from 'zod'",
  ]);
  const interfaces: string[] = [];
  const schemas: string[] = [];
  const services: string[] = [];

  nestPlatforms.forEach(([name, config]) => {
    const pascalCaseName = toPascalCase(name);
    const envVars = config.development || {};

    const interfaceProps = Object.entries(envVars)
      .map(([key, value]) => {
        const type =
          value.type === 'number' ? 'number' : value.type === 'boolean' ? 'boolean' : 'string';
        return `  ${key}${value.required ? '' : '?'}: ${type};`;
      })
      .join('\n');

    const schemaProps = Object.entries(envVars)
      .map(([key, value]) => {
        let schemaType = 'z.string()';
        if (value.type === 'number') {
          schemaType = 'z.string().transform(Number)';
        } else if (value.type === 'boolean') {
          schemaType = 'z.string().transform(val => val === "true")';
        }
        if (!value.required) {
          schemaType += '.optional()';
        }
        return `  ${key}: ${schemaType},`;
      })
      .join('\n');

    const switchCases = Object.entries(envVars)
      .map(([key, value]) => {
        if (value.type === 'number') {
          return `      case '${key}': return Number(processEnvValue) as unknown as Nest${pascalCaseName}Env[K];`;
        } else if (value.type === 'boolean') {
          return `      case '${key}': return (processEnvValue === 'true') as unknown as Nest${pascalCaseName}Env[K];`;
        }
        return `      case '${key}': return processEnvValue as unknown as Nest${pascalCaseName}Env[K];`;
      })
      .join('\n');

    interfaces.push(`export interface Nest${pascalCaseName}Env {
${interfaceProps}
}`);

    schemas.push(`const nest${pascalCaseName}EnvSchema = z.object({
${schemaProps}
});`);

    services.push(`@Injectable()
export class Nest${pascalCaseName}EnvService {
  constructor() {
    const result = nest${pascalCaseName}EnvSchema.safeParse(process.env);
    if (!result.success) {
      console.error('❌ Invalid environment variables:', result.error.format());
      throw new Error('Invalid environment variables');
    }
  }

  get<K extends keyof Nest${pascalCaseName}Env>(key: K): Nest${pascalCaseName}Env[K] {
    const processEnvValue = process.env[key];

    if (processEnvValue === undefined) {
      throw new Error(\`Missing environment variable: \${key}\`);
    }

    switch (key) {
${switchCases}
      default: return processEnvValue as unknown as Nest${pascalCaseName}Env[K];
    }
  }

  getOrDefault<K extends keyof Nest${pascalCaseName}Env>(
    key: K,
    defaultValue: Nest${pascalCaseName}Env[K]
  ): Nest${pascalCaseName}Env[K] {
    try {
      return this.get(key);
    } catch {
      return defaultValue;
    }
  }
}`);
  });

  return `${Array.from(imports).join(';\n')};\n\n${interfaces.join('\n\n')}\n\n${schemas.join('\n\n')}\n\n${services.join('\n\n')}`;
}

function generateIndex(platforms: Record<string, PlatformConfig>): string {
  const nextPlatforms = Object.entries(platforms).filter(
    ([_, config]) => config.type === 'frontend',
  );
  const nestPlatforms = Object.entries(platforms).filter(
    ([_, config]) => config.type === 'backend',
  );

  const nextExports = nextPlatforms
    .map(([name]) => `export { getNext${toPascalCase(name)}Env } from './next.js';`)
    .join('\n');

  const nestExports = nestPlatforms
    .map(([name]) => `export { Nest${toPascalCase(name)}EnvService } from './nest.js';`)
    .join('\n');

  return `// Динамический экспорт всех сгенерированных утилит

// Next.js утилиты
${nextExports}

// Nest.js сервисы окружения
${nestExports}
`;
}

// Функция для преобразования имен с дефисами в PascalCase
function toPascalCase(name: string) {
  return name
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

try {
  const config = loadConfig();
  const rootDir = resolve(__dirname, './src');
  const generateDir = resolve(rootDir, 'generate');
  ensureDirectoryExists(generateDir);

  // Генерация Next.js утилит
  const nextUtils = generateNextUtils(config.platforms);
  writeFileSync(resolve(generateDir, 'next.ts'), nextUtils);

  // Генерация Nest.js утилит
  const nestUtils = generateNestUtils(config.platforms);
  writeFileSync(resolve(generateDir, 'nest.ts'), nestUtils);

  // Генерация index.ts
  const indexContent = generateIndex(config.platforms);
  writeFileSync(resolve(generateDir, 'index.ts'), indexContent);

  console.log('✅ Утилиты успешно сгенерированы');
} catch (error) {
  console.error('❌ Ошибка при генерации утилит:', error);
  process.exit(1);
}
