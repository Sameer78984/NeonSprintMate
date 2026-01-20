import knex from "knex";
import knexConfig from "../../knexfile.js";

const db = knex(knexConfig.development);

// Connection "Sanity Check"
db.raw("SELECT 1")
  .then(() => {
    console.log("✅ Neon PostgreSQL: Connection Verified");
  })
  .catch((err) => {
    console.error("❌ Neon PostgreSQL: Connection Failed");
    console.error(err.message);
    process.exit(1);
  });

export default db;
