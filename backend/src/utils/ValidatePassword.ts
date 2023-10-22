import { ValidatePasswordQuery } from "../database/Querys/UtilQuerys";
import { pool } from "../database/database";
import bcrypt from "bcryptjs";

export async function ValidatePassword(username: string, password: string) {
  const client = await pool.connect();

  try {
    const { rows } = await client.query(ValidatePasswordQuery, [username]);

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
