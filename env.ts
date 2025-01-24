import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string(),
  SESSION_SECRET: z.string(),
  BASE_URL: z.string(),
  ADMIN_FIRSTNAME: z.string(),
  ADMIN_LASTNAME: z.string(),
  ADMIN_EMAIL: z.string().email(),
  ADMIN_PASSWORD: z.string(),
});

const env = envSchema.parse(process.env);

export type EnvVariables = z.infer<typeof envSchema>;
export const ENV = env;
