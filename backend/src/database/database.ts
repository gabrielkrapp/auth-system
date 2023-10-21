import { Pool } from "pg";

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "auth_system",
  port: 5432,
});