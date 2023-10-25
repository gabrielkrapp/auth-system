import express from "express";
import { pool } from "../database/database";
import { GetUserBy } from "../utils/GetUserBy";
import dotenv from "dotenv";
import { GetUserQuery } from "../database/Querys/RoutersQuerys";
import { verifyToken } from "../utils/VerifyToken";
import { VerifyIfUserIsAdmin } from "../utils/VerifyIfUserIsAdmin";

dotenv.config();

const router = express.Router();

router.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization?.split(" ")[1];

  const { decodedToken, error } = await verifyToken(token);

  if (!decodedToken) {
    return res.status(400).json({ error });
  }

  if (decodedToken!["user.id"] !== id) {
    const { isAdmin, error: adminError } = await VerifyIfUserIsAdmin(token);

    if (!isAdmin) {
      return res.status(403).json({ error: adminError || "Access denied" });
    }
  }

  const verifyUser = await GetUserBy(id);
  if (!verifyUser) {
    return res.status(400).json({ error: "User not found" });
  }

  try {
    const client = await pool.connect();
    const { rows } = await client.query(GetUserQuery, [id]);
    client.release();

    return res.status(200).json({ rows });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
