import express from "express";
import { pool } from "../database/database";
import { GetUserBy } from "../utils/GetUserBy";
import dotenv from "dotenv";
import { VerifyIfUserIsAdmin } from "../utils/VerifyIfUserIsAdmin";
import { GetUserQuery, GetUsersQuery } from "../database/Querys/RoutersQuerys";

dotenv.config();

const router = express.Router();

router.get("/users/:id?", async (req, res) => {
    const { id } = req.params;
    const token = req.headers.authorization?.split(' ')[1];
    const { isAdmin, error } = await VerifyIfUserIsAdmin(token);

    if (!isAdmin) {
        return res.status(403).json({ error });
    }

    if (id) {
        const verifyUser = await GetUserBy(id);
        if (!verifyUser) {
            return res.status(400).json({ error: "User not found" });
        }
    }

    try {
        const client = await pool.connect();
        let query;
        let values = [];

        if (id) {
            query = GetUserQuery;
            values.push(id);
        } else {
            query = GetUsersQuery;
        }

        const { rows } = await client.query(query, values);
        client.release();

        return res.status(200).json({ rows });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
