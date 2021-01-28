import { Pool } from "pg";

// Use local env file during development
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default pool;
