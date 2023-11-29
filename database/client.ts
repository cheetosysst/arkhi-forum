import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema.js";

// This is not ideal, using token here may cause leak, and is only used for demonstration purpose.
export const connection = createClient({
	url: import.meta.env.PUBLIC_ENV__DATABASE_URL!,
	authToken: import.meta.env.PUBLIC_ENV__DATABASE_TOKEN!,
});

export const db = drizzle(connection, { schema });
