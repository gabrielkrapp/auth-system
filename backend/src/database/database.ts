import { Pool } from "pg";
import dotenv from "dotenv";
import databaseCircuit from "../utils/DatabaseCircuitBreaker";

dotenv.config();

export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

pool.connect(async (err, client, release) => {
  if (err) {
    console.error("Error connecting to the database:", err.stack);

    try {
      await databaseCircuit.fire();
    } catch (breakerError) {
      console.error("Circuit Breaker tripped:", breakerError);
    }
      
    return;
  }
  console.log("Connected to the database successfully!");
  release();
});
