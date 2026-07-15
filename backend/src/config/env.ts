import { config } from "dotenv";
import { z } from "zod";

config();

const EnvSchema = z.object({
    PORT: z.coerce.number().default(3000),
    DATABASE_URL: z.url(),
    JWT_SECRET: z.string().min(32, "JWT_SECRET must be at least 32 characters"),
    JWT_ACCESS_EXPIRES_IN: z.string().default("15m"),
    JWT_REFRESH_EXPIRES_IN: z.string().default("7d"),
    NODE_ENV: z
        .enum(["development", "production", "test"])
        .default("development"),
});

export const env = EnvSchema.parse(process.env);