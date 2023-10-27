import express from "express";
import dotenv from "dotenv";
import { verifyToken } from "../utils/VerifyToken";

dotenv.config();

const router = express.Router();

router.get("/getuser", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const { decodedToken, error } = await verifyToken(token);

  if (!decodedToken || error) {
    return res.status(400).json({ error: error || "Invalid token" });
  }

  return res.status(200).json({
    id: decodedToken.id,
    username: decodedToken.username,
    permissions: decodedToken.permissions,
  });
});

export default router;
