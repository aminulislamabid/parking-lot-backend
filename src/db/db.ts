import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import {
  parkingLot,
  parkingLotRelations,
  parkingSlot,
  parkingSlotRelations,
} from "./schema";

const pool = new Pool({
  connectionString:
    "postgresql://parking-lot-db_owner:tPAmenV1ijL7@ep-weathered-snowflake-a1i1qn20-pooler.ap-southeast-1.aws.neon.tech/parking-lot-db?sslmode=require",
});

const db = drizzle(pool, {
  schema: {
    parkingLot,
    parkingSlot,
    parkingLotRelations,
    parkingSlotRelations,
  },
});

export default db;
