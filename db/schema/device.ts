import { char, pgTable } from "drizzle-orm/pg-core";
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';

const db = drizzle(sql);

export const device = pgTable("device", {
	device_label: char("device_label", { length: 256 }).primaryKey(),
	user_id: char("user_id", { length: 256 }), // used by frontend to access all the devices for a given user_id
	// ... add more parameters
});
