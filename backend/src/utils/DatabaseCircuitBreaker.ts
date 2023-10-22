import CircuitBreaker from "opossum";
import { pool } from "../database/database";

const breakerOptions = {
    timeout: 5000,      
    errorThresholdPercentage: 50,
    resetTimeout: 10000,
};

const databaseCircuit = new CircuitBreaker(async () => {
    const client = await pool.connect();
    client.release();
}, breakerOptions);

databaseCircuit.on("open", () => {
    console.error("Circuit Breaker is open. Blocking all further database connection attempts for some time.");
});

databaseCircuit.on("halfOpen", () => {
    console.log("Circuit Breaker is half open. A new request will be tested...");
});

databaseCircuit.on("close", () => {
    console.log("Circuit Breaker is closed. Database operations will proceed.");
});

export default databaseCircuit;
