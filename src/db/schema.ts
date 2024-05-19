import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const parkingLot = pgTable("parking_lot", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  name: varchar("name").notNull(),
  slot: integer("slot").notNull(),
});

export const parkingLotRelations = relations(parkingLot, ({ many }) => ({
  slots: many(parkingSlot),
}));

export const parkingSlot = pgTable("parking_slot", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  status: varchar("status", { enum: ["free", "occupied"] }).default("free"),
  parkedAt: timestamp("parked_at"),
  parkingLotId: uuid("parking_lot_id")
    .notNull()
    .references(() => parkingLot.id),
});

export const parkingSlotRelations = relations(parkingSlot, ({ one }) => ({
  parkingLot: one(parkingLot, {
    fields: [parkingSlot.parkingLotId],
    references: [parkingLot.id],
  }),
}));
