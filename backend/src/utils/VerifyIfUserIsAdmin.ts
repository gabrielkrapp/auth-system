import dotenv from "dotenv";
import { verifyToken } from "./VerifyToken";

dotenv.config();

export async function VerifyIfUserIsAdmin(token: string | undefined): Promise<{ isAdmin: boolean, error?: string }> {
    const { decodedToken, error } = await verifyToken(token);

    if (error) {
        return { isAdmin: false, error };
    }

    if (decodedToken!.permissions !== "admin") {
        return { isAdmin: false, error: "Permission denied" };
    }

    return { isAdmin: true };
}
