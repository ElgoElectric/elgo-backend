import { timestamp, char, pgTable } from "drizzle-orm/pg-core";
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';

const db = drizzle(sql);

export const anomaly = pgTable("anomaly", {
	device_label: char("device_label", { length: 256 }).primaryKey(),
	
  // For collective anomalies: 
  timestamp_start: timestamp("timestamp_start"), 
	timestamp_end: timestamp("timestamp_end"), 
	// ... add more parameters
});
