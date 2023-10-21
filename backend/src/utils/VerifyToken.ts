import { CustomJwtPayload } from "../interfaces/CustomJwtPayload";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

export async function verifyToken(token: string | undefined): Promise<{ decodedToken?: CustomJwtPayload, error?: string }> {
    if (!token) {
        return { error: "Authorization token not provided" };
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as CustomJwtPayload;
        return { decodedToken };
    } catch (error) {
        return { error: "Invalid or expired token" };
    }
}