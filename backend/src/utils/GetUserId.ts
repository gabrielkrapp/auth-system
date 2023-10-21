import { pool } from "../database/database";

export async function GetUserId(username: string): Promise<number | null> {
    const client = await pool.connect();
    
    try {
        const query = "SELECT id FROM users WHERE username = $1";
        const { rows } = await client.query(query, [username]);

        if (rows.length > 0) {
            return rows[0].id;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error searching for user in the database:", error);
        return null;
    } finally {
        client.release();
    }
}
