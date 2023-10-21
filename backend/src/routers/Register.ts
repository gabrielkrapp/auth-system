import express from 'express';
import { pool } from '../database/database';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import { FindUser } from '../utils/FindUserByUsername';

const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const id = uuidv4();
    const existingUser = await FindUser(username);
    const hashedPassword = await bcrypt.hash(password, 10);

    if (existingUser) {
        return res.status(400).json({ error: "Username already exists" });
    }

    try {
        const client = await pool.connect();
        const query =
          "INSERT INTO users (id, username, password) VALUES ($1, $2, $3)";
        const { rows } = await client.query(query, [id, username, hashedPassword]);
        client.release();

        res.status(200).json({
            message: "User registered successfully",
        });

    } catch (error) {
        console.error("Error registering user into the database:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;