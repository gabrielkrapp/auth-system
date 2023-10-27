import express from "express";
import { pool } from "../database/database";
import bcrypt from "bcryptjs";
import { GetUserBy } from "../utils/GetUserBy";
import { verifyToken } from "../utils/VerifyToken";
import { UpdateUserQuery } from "../database/Querys/RoutersQuerys";
import { VerifyIfUserIsAdmin } from "../utils/VerifyIfUserIsAdmin"; 

const router = express.Router();

router.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { username, password, permissions } = req.body;
  const token = req.headers.authorization?.split(" ")[1];
  const { isAdmin, error } = await VerifyIfUserIsAdmin(token);

  if (!isAdmin) {
    return res.status(403).json({ error });
  }

  if (!username || !password || !permissions) {
    return res.status(400).json({ error: "Username, password or permissions must be provided" });
  }
  
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await GetUserBy(id);

  if (!user) {
    return res.status(400).json({ error: "User not found" });
  }

  try {
    const client = await pool.connect();
    await client.query(UpdateUserQuery, [username, permissions, hashedPassword, id]);
    client.release();

    res.status(200).json({
      message: "User informations updated successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
