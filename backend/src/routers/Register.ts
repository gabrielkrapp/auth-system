import express from "express";
import { pool } from "../database/database";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import { GetUserBy } from "../utils/GetUserBy";
import { RegisterUserQuery } from "../database/Querys/RoutersQuerys";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const id = uuidv4();
  const user = await GetUserBy(username);
  const hashedPassword = await bcrypt.hash(password, 10);

  if (user) {
    return res.status(400).json({ error: "Username already exists" });
  }

  try {
    const client = await pool.connect();
    const query = RegisterUserQuery;
    await client.query(query, [id, username, hashedPassword]);
    client.release();

    res.status(200).json({
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
