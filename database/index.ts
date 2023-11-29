import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema.js";

export const connection = createClient({
	url: process.env.DATABASE_URL!,
	authToken: process.env.DATABASE_TOKEN!,
});

export const db = drizzle(connection, { schema });
