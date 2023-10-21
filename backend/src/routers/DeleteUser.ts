import express from 'express';
import { pool } from '../database/database';
import bcrypt from 'bcryptjs';
import { GetUserBy } from '../utils/GetUserBy';

const router = express.Router();

router.delete('/users/:id', async (req, res) => {
    const { id } = req.params
    const user = await GetUserBy(id);

    if (!user) {
        return res.status(400).json({ error: "User not found" });
    }

    try {
        const client = await pool.connect();
        const query =
        "DELETE FROM users WHERE id = $1";
        await client.query(query, [id]);
        client.release();

        res.status(200).json({
            message: "User deleted successfully",
        });

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;