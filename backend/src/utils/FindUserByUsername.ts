import { pool } from "../database/database";

export async function FindUser(username: String) {
    const client = await pool.connect();
    
    try {
        const query = "SELECT * FROM users WHERE username = $1";
        const { rows } = await client.query(query, [username]);
        return rows.length > 0;
    } catch (error) {
        console.error("Error searching for user in the database:", error);
        return false;
    } finally {
        client.release();
    }
}