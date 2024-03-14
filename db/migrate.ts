require("dotenv").config();

import { drizzle } from "drizzle-orm/vercel-postgres";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

async function main() {
    const connectionString = "postgres://default:lkCV7KUX6EsY@ep-noisy-hill-a14afswn.ap-southeast-1.aws.neon.tech:5432/verceldb?sslmode=require";
    const sql = postgres(connectionString, {max: 1});
    const db = drizzle(sql);
	await migrate(db, { migrationsFolder: "./drizzle" });
}

main()