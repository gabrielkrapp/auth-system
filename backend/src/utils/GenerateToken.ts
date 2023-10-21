import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function generateToken(userId: string, username: string, permissions: string, expiresIn: string = '1h'): string {
    return jwt.sign(
        {
            id: userId,
            username: username,
            permissions: permissions
        },
        process.env.JWT_SECRET!,
        {
            expiresIn: expiresIn
        }
    );
}
