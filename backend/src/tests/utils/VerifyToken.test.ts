import { verifyToken } from "../../utils/VerifyToken";
import jwt from "jsonwebtoken";

jest.mock("jsonwebtoken", () => ({
  verify: jest.fn(),
}));

describe("verifyToken function", () => {
  const mockSecret = "testSecret";
  process.env.JWT_SECRET = mockSecret;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should correctly decode a valid token", async () => {
    const mockToken = "validToken";
    const mockDecoded = { id: "123", permissions: "admin" };

    (jwt.verify as jest.Mock).mockReturnValueOnce(mockDecoded);

    const result = await verifyToken(mockToken);

    expect(result).toEqual({ decodedToken: mockDecoded });
  });

  it("should return an error when no token is provided", async () => {
    const result = await verifyToken(undefined);

    expect(result).toEqual({ error: "Authorization token not provided" });
  });

  it("should return an error for invalid or expired tokens", async () => {
    const mockToken = "invalidToken";
    (jwt.verify as jest.Mock).mockImplementationOnce(() => {
      throw new Error("Invalid token");
    });

    const result = await verifyToken(mockToken);

    expect(result).toEqual({ error: "Invalid or expired token" });
  });
});
