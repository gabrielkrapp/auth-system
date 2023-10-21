import { pool } from "../database/database";

export async function GetUserBy(
  username: string,
): Promise<{ id: string; username: string } | null>;
export async function GetUserBy(
  id: string,
): Promise<{ id: string; username: string } | null>;

export async function GetUserBy(
  value: string,
): Promise<{ id: string; username: string } | null> {
  const client = await pool.connect();

  const isUuid =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
      value,
    );
  const field = isUuid ? "id" : "username";

  try {
    const query = `SELECT id, username FROM users WHERE ${field} = $1`;
    const { rows } = await client.query(query, [value]);

    if (rows.length > 0) {
      return {
        id: rows[0].id,
        username: rows[0].username,
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error(
      `Error searching for user by ${field} in the database:`,
      error,
    );
    return null;
  } finally {
    client.release();
  }
}
