import { z } from 'zod';

const portSchema = z.coerce.number().int().positive().max(65535);

export const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  PORT: portSchema.default(4000),

  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),

  CORS_ORIGINS: z.string().optional(),
});

export type Env = z.infer<typeof envSchema>;

export const validateEnv = (config: Record<string, unknown>) => {
  const result = envSchema.safeParse(config);

  if (result.success) {
    return result.data;
  }

  const message = result.error.issues
    .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
    .join('; ');

  throw new Error(`Invalid API environment configuration: ${message}`);
};
