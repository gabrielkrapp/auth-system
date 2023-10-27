import express from "express";
import { pool } from "../database/database";
import dotenv from "dotenv";
import { VerifyIfUserIsAdmin } from "../utils/VerifyIfUserIsAdmin";
import { GetUsersQuery } from "../database/Querys/RoutersQuerys";

dotenv.config();

const router = express.Router();

router.get("/users", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const { isAdmin, error } = await VerifyIfUserIsAdmin(token);

  if (!isAdmin) {
    return res.status(403).json({ error });
  }

  try {
    const client = await pool.connect();
    const { rows } = await client.query(GetUsersQuery);
    client.release();

    return res.status(200).json({ rows });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
