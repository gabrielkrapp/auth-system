import jwt from "jsonwebtoken";
import { generateToken } from "../../utils/GenerateToken";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

dotenv.config();
const userId = uuidv4()

describe("generateToken function", () => {
    const username = "testuser";
    const permissions = "user";

    it("should generate a valid token", () => {
        const token = generateToken(userId, username, permissions);
        expect(token).toBeTruthy();

        const decodedToken: any = jwt.decode(token);
        expect(decodedToken).toBeTruthy();
    });

    it("should contain correct payload data", () => {
        const token = generateToken(userId, username, permissions);

        const decodedToken: any = jwt.decode(token);
        expect(decodedToken.id).toBe(userId);
        expect(decodedToken.username).toBe(username);
        expect(decodedToken.permissions).toBe(permissions);
    });

    it("should expire after the specified duration", async () => {
        const shortExpiryTime = "1s";
        const token = generateToken(userId, username, permissions, shortExpiryTime);

        await new Promise((resolve) => setTimeout(resolve, 1500));

        expect(() => {
            jwt.verify(token, process.env.JWT_SECRET!);
        }).toThrow(jwt.TokenExpiredError);
    });
});
