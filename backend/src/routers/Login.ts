import express from "express";
import { ValidatePassword } from "../utils/ValidatePassword";
import { GetUserBy } from "../utils/GetUserBy";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await GetUserBy(username);
  const validatePassword = await ValidatePassword(username, password);

  if (!user) {
    return res.status(400).json({ error: "User not found" });
  }

  if (validatePassword) {
    const { id } = user;
    const token = jwt.sign(
      {
        id: id,
        username: username,
      },
      process.env.JWT_SECRET!,
    );
    res.status(200).json({ token });
  } else {
    res.status(400).json({ error: "Invalid password" });
  }
});

export default router;
