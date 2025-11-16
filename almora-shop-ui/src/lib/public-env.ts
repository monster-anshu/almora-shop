import { z } from "zod";

const schema = z.object({
  NEXT_PUBLIC_VENDURE_SHOP_API_URL: z.string().url(),
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
});

export const publicEnv = schema.parse({
  NEXT_PUBLIC_VENDURE_SHOP_API_URL:
    process.env.NEXT_PUBLIC_VENDURE_SHOP_API_URL ??
    process.env.VENDURE_SHOP_API_URL,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
});
