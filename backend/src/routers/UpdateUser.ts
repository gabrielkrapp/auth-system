import express from "express";
import { pool } from "../database/database";
import bcrypt from "bcryptjs";
import { GetUserBy } from "../utils/GetUserBy";
import { verifyToken } from "../utils/VerifyToken";
import { UpdateUserQuery } from "../database/Querys/RoutersQuerys";

const router = express.Router();

router.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await GetUserBy(id);
  const token = req.headers.authorization?.split(' ')[1];
  const { decodedToken, error } = await verifyToken(token);
    
  if (error) {
    return res.status(400).json({ error });
  }

  if (!user) {
    return res.status(400).json({ error: "User not found" });
  }

  try {
    const client = await pool.connect();
    const query = UpdateUserQuery;
    await client.query(query, [username, hashedPassword, id]);
    client.release();

    res.status(200).json({
      message: "User informations updated successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
