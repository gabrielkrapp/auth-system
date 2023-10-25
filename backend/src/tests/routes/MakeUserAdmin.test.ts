import request from "supertest";
import { app } from "../../index";
import { generateToken } from "../../utils/GenerateToken";
import { v4 as uuidv4 } from "uuid";
import { GetUserBy } from "../../utils/GetUserBy";
import { VerifyIfUserIsAdmin } from "../../utils/VerifyIfUserIsAdmin";

jest.mock("../../utils/VerifyIfUserIsAdmin");
jest.mock("../../utils/GetUserBy");

describe("MakeUserAdmin router", () => {
  const id = uuidv4();
  const testTimeout = 10000;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it(
    "should return 403 if user is not an admin",
    async () => {
      const token = generateToken(id, "testeUser", "user");

      (VerifyIfUserIsAdmin as jest.Mock).mockResolvedValueOnce({
        isAdmin: false,
      });

      const response = await request(app)
        .put(`/users/admin/${id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(403);
    },
    testTimeout,
  );

  it(
    "should return 400 if user does not exist",
    async () => {
      const token = generateToken(id, "testuser", "admin");

      (GetUserBy as jest.Mock).mockResolvedValueOnce(null);
      (VerifyIfUserIsAdmin as jest.Mock).mockResolvedValueOnce({
        isAdmin: true,
      });

      const response = await request(app)
        .put(`/users/admin/${id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(400);
    },
    testTimeout,
  );

  it(
    "should make user admin if user exists and requester is an admin",
    async () => {
      const token = generateToken(id, "testuser", "admin");

      (GetUserBy as jest.Mock).mockResolvedValueOnce({
        id: id,
        username: "testuser",
        permissions: "admin",
      });
      (VerifyIfUserIsAdmin as jest.Mock).mockResolvedValueOnce({
        isAdmin: true,
      });

      const response = await request(app)
        .put(`/users/admin/${id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
    },
    testTimeout,
  );

  it(
    "should return 403 if token is invalid",
    async () => {
      const invalidToken = "1234";

      (VerifyIfUserIsAdmin as jest.Mock).mockResolvedValueOnce({
        isAdmin: false,
        error: "Invalid token",
      });

      const response = await request(app)
        .delete(`/users/${id}`)
        .set("Authorization", `Bearer ${invalidToken}`);

      expect(response.status).toBe(403);
    },
    testTimeout,
  );

  it(
    "should return 403 when no token is provided",
    async () => {
      (VerifyIfUserIsAdmin as jest.Mock).mockResolvedValueOnce({
        isAdmin: false,
        error: "Authorization token not provided",
      });

      const response = await request(app).delete(`/users/${id}`);

      expect(response.status).toBe(403);
    },
    testTimeout,
  );
});
