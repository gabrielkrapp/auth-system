import { VerifyIfUserIsAdmin } from "../../utils/VerifyIfUserIsAdmin";
import { verifyToken } from "../../utils/VerifyToken"

jest.mock("../../utils/VerifyToken", () => ({
  verifyToken: jest.fn()
}));

describe("VerifyIfUserIsAdmin function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should identify an admin user", async () => {
    const mockToken = "mockToken";
    (verifyToken as jest.Mock).mockResolvedValueOnce({
      decodedToken: { permissions: "admin" }
    });

    const result = await VerifyIfUserIsAdmin(mockToken);

    expect(result).toEqual({ isAdmin: true });
  });

  it("should deny permission for non-admin user", async () => {
    const mockToken = "mockToken";
    (verifyToken as jest.Mock).mockResolvedValueOnce({
      decodedToken: { permissions: "user" }
    });

    const result = await VerifyIfUserIsAdmin(mockToken);

    expect(result).toEqual({ isAdmin: false, error: "Permission denied" });
  });

  it("should handle invalid or expired tokens", async () => {
    const mockToken = "invalidToken";
    (verifyToken as jest.Mock).mockResolvedValueOnce({
      error: "Invalid token"
    });

    const result = await VerifyIfUserIsAdmin(mockToken);

    expect(result).toEqual({ isAdmin: false, error: "Invalid token" });
  });

  it("should handle missing tokens", async () => {
    (verifyToken as jest.Mock).mockResolvedValueOnce({
      error: "Token is missing"
    });

    const result = await VerifyIfUserIsAdmin(undefined);

    expect(result).toEqual({ isAdmin: false, error: "Token is missing" });
  });
});
