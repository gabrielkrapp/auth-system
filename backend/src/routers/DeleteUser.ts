import express from 'express';
import { pool } from '../database/database';
import { GetUserBy } from '../utils/GetUserBy';
import { VerifyIfUserIsAdmin } from '../utils/VerifyIfUserIsAdmin';
import { DeleteUserQuery } from '../database/Querys/RoutersQuerys';

const router = express.Router();

router.delete('/users/:id', async (req, res) => {
    const { id } = req.params
    const token = req.headers.authorization?.split(' ')[1];
    const { isAdmin, error } = await VerifyIfUserIsAdmin(token);
    const deletedUser = await GetUserBy(id);

    if (!isAdmin) {
        return res.status(403).json({ error });
    }

    if (!deletedUser) {
        return res.status(400).json({ error: "User not found" });
    }
    

    try {
        const client = await pool.connect();
        await client.query(DeleteUserQuery, [id]);
        client.release();

        res.status(200).json({
            message: "User deleted successfully",
        });

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
