import { migrate } from "drizzle-orm/node-postgres/migrator";
import db from "../src/db/db";

migrate(db, { migrationsFolder: "./drizzle" })
  .then(() => {
    console.log("Migrations ran successfully");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error running migrations", error);
    process.exit(1);
  });
