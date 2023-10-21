import express from 'express';
import { FindUser } from '../utils/FindUserByUsername';
import { ValidatePassword } from '../utils/ValidatePassword';
import { GetUserId } from '../utils/GetUserId';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const existingUser = await FindUser(username);
    const validatePassword = await ValidatePassword(username, password);

    if (!existingUser) {
        return res.status(400).json({ error: "User not found" });
    }

    if (validatePassword) {
        const userId = await GetUserId(username);
        console.log(userId);
        const token = jwt.sign({
            id: userId,
            username: username,
        }, process.env.JWT_SECRET!);

        res.status(200).json({ token });
    } else {
        res.status(400).json({ error: "Invalid password" });
    }
});

export default router;