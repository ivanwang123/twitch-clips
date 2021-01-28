import { Pool } from "pg";

// Use local env file during development
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const connectionString =
  process.env.DATABASE_URL || process.env.DB_CONNECTION_STRING;

const pool = new Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default pool;
