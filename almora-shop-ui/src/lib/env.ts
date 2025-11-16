import "server-only";

import { z } from "zod";

const serverSchema = z.object({
  VENDURE_SHOP_API_URL: z.string().url(),
  VENDURE_AUTH_TOKEN_NAME: z.string().min(1),
  NEXTAUTH_SECRET: z.string().min(1),
  NEXTAUTH_URL: z.string().url().optional(),
});

export const serverEnv = serverSchema.parse({
  VENDURE_SHOP_API_URL: process.env.VENDURE_SHOP_API_URL,
  VENDURE_AUTH_TOKEN_NAME: process.env.VENDURE_AUTH_TOKEN_NAME,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
});
