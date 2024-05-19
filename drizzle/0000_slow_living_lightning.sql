CREATE TABLE IF NOT EXISTS "parking_lot" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"slot" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "parking_slot" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"status" varchar DEFAULT 'free',
	"parked_at" timestamp,
	"parking_lot_id" uuid NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "parking_slot" ADD CONSTRAINT "parking_slot_parking_lot_id_parking_lot_id_fk" FOREIGN KEY ("parking_lot_id") REFERENCES "public"."parking_lot"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
