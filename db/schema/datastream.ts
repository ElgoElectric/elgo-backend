import { timestamp, char, numeric, boolean, pgTable } from "drizzle-orm/pg-core";

export const datastream = pgTable("datastream", {
	device_label: char("device_label", { length: 256 }).primaryKey(),
	power: numeric('power', { precision: 10 }),
	timestamp: timestamp("timestamp"),
	on_off: boolean("on_off")
});
