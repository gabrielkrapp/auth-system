import express from "express";
import { pool } from "../database/database";
import { GetUserBy } from "../utils/GetUserBy";
import dotenv from "dotenv";
import { VerifyIfUserIsAdmin } from "../utils/VerifyIfUserIsAdmin";

dotenv.config();

const router = express.Router();

router.put("/users/:id", async (req, res) => {
    const { id } = req.params;
    const token = req.headers.authorization?.split(' ')[1];
    const { isAdmin, error } = await VerifyIfUserIsAdmin(token);
    const userToAdmin = await GetUserBy(id);

    if (!isAdmin) {
        return res.status(403).json({ error });
    }

    if (!userToAdmin) {
        return res.status(400).json({ error: "User not found" });
    }

    try {
        const client = await pool.connect();
        const query = "UPDATE users SET permissions = 'admin' WHERE id = $1";
        await client.query(query, [id]);
        client.release();

        return res.status(200).json({
            message: "User became administrator successfully",
        });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
