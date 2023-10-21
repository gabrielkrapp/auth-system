import { pool } from "../database/database";
import bcrypt from 'bcryptjs';

export async function ValidatePassword(username: string, password: string) {
    const client = await pool.connect();
    
    try {
        const query = "SELECT password FROM users WHERE username = $1";
        const { rows } = await client.query(query, [username]);
        
        if (!rows.length) return false;
        
        const hashedPassword = rows[0].password;

        const isMatch = await bcrypt.compare(password, hashedPassword);
        
        return isMatch;
    } catch (error) {
        console.error("Error validating password:", error);
        return false;
    } finally {
        client.release();
    }
}
