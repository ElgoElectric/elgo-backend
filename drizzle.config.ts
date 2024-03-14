require("dotenv").config();

import type { Config } from "drizzle-kit";

export default {
	schema: "./db/schema/*.ts",
	out: "./drizzle",
	driver: "pg",
	dbCredentials: {
		connectionString: "" + process.env.POSTGRES_URL,
	},
} satisfies Config;
