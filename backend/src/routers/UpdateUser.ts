import express from 'express';
import { pool } from '../database/database';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import { GetUserBy } from '../utils/GetUserBy';

const router = express.Router();

router.put('/users/:id', async (req, res) => {
    const { id } = req.params
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await GetUserBy(id);

    if (!user) {
        return res.status(400).json({ error: "User not found" });
    }

    try {
        const client = await pool.connect();
        const query =
        "UPDATE users SET username = $1, password = $2 WHERE id = $3";
        await client.query(query, [username, hashedPassword, id]);
        client.release();

        res.status(200).json({
            message: "User informations updated successfully",
        });

    } catch (error) {
        console.error("Error updating user into the database:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;