import request from "supertest";
import { app } from "../../index";
import { v4 as uuidv4 } from "uuid";
import { GetUserBy } from "../../utils/GetUserBy";
import { generateToken } from "../../utils/GenerateToken";

jest.mock("../../utils/GetUserBy");

describe("RegisterUser router", () => {
  const testTimeout = 10000;
  const username = "testuser";
  const password = "testpassword";
  const id = uuidv4();
  const token = generateToken(id, "testeUser", "user");

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it(
    "should return 400 if user does not exist",
    async () => {
      (GetUserBy as jest.Mock).mockResolvedValueOnce(null);

      const response = await request(app)
        .put(`/users/${id}`)
        .send({ username, password })
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(400);
    },
    testTimeout,
  );

  it(
    "should return 200 if user update is successful",
    async () => {
      (GetUserBy as jest.Mock).mockResolvedValueOnce({
        id: id,
        username: "newuser",
        permissions: "user",
      });

      const response = await request(app)
        .put(`/users/${id}`)
        .send({ username, password })
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe(
        "User informations updated successfully",
      );
    },
    testTimeout,
  );

  it(
    "should return 400 if token is invalid",
    async () => {
      const invalidToken = "1234";

      const response = await request(app)
        .put(`/users/${id}`)
        .send({ username, password })
        .set("Authorization", `Bearer ${invalidToken}`);

      expect(response.status).toBe(400);
    },
    testTimeout,
  );

  it(
    "should return 400 when no token is provided",
    async () => {
      const response = await request(app)
        .put(`/users/${id}`)
        .send({ username, password });

      expect(response.status).toBe(400);
    },
    testTimeout,
  );

  it(
    "should return 400 when invalid input parameters are provided",
    async () => {
      const invalidUsername = "";
      const response = await request(app)
        .put(`/users/${id}`)
        .send({ username: invalidUsername, password })
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(400);
    },
    testTimeout,
  );
});
