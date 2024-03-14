CREATE TABLE IF NOT EXISTS "anomaly" (
	"device_label" char(256) PRIMARY KEY NOT NULL,
	"timestamp_start" timestamp,
	"timestamp_end" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "datastream" (
	"device_label" char(256) PRIMARY KEY NOT NULL,
	"power" numeric(10),
	"timestamp" timestamp,
	"on_off" boolean
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "device" (
	"device_label" char(256) PRIMARY KEY NOT NULL,
	"user_id" char(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"name" char(256),
	"user_id" char(256) PRIMARY KEY NOT NULL,
	"email" char(256)
);
