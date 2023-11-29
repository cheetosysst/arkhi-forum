import "dotenv/config";
import type { Config } from "drizzle-kit";

export default {
	schema: "./database/schema.ts",
	out: "./database/migrations",
	driver: "turso", // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
	dbCredentials: {
		url: process.env.DATABASE_URL!,
		authToken: process.env.DATABASE_TOKEN,
	},
	breakpoints: true,
} satisfies Config;
