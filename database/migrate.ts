import "dotenv/config";
import { migrate } from "drizzle-orm/libsql/migrator";
// import { db, connection } from "./index.js";

import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema.js";

const connection = createClient({
	url: process.env.DATABASE_URL as string,
	authToken: process.env.DATABASE_TOKEN as string,
});

const db = drizzle(connection, { schema });

// This will run migrations on the database, skipping the ones already applied
migrate(db, { migrationsFolder: "./database/migrations" })
	.then(() => {
		connection.close();
		console.log("Migration successful.");
		process.exit(0);
	})
	.catch((e) => {
		console.error("Error performing migration: ", e);
		process.exit(1);
	});
