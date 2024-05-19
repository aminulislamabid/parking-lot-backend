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
    "postgresql://parking-lot-db_owner:kxSHVOKE5eG1@ep-old-feather-a1bdnck9-pooler.ap-southeast-1.aws.neon.tech/parking-lot-db?sslmode=require",
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
