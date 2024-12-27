import { z } from 'zod';

function throwError(key: string): never {
  throw new Error(`Missing environment variable: ${key}`);
}

export interface NextSsoEnv {
  PORT: number;
}

const nextSsoEnvSchema = z.object({
  PORT: z.string().transform(Number),
});

export function getNextSsoEnv(): NextSsoEnv {
  const result = nextSsoEnvSchema.safeParse(process.env);

  if (!result.success) {
    console.error('❌ Invalid environment variables:', result.error.format());
    throw new Error('Invalid environment variables');
  }

  return {
    PORT: Number(process.env.PORT) ?? throwError('PORT'),
  };
}