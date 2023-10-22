import { ValidatePassword } from "../../utils/ValidatePassword";
import { pool } from "../../database/database";
import bcrypt from "bcryptjs";

jest.mock("../../database/database", () => ({
  pool: {
    connect: jest.fn()
  }
}));

jest.mock("bcryptjs", () => ({
  compare: jest.fn()
}));

const username = "testuser";
const password = "testpassword";
const hashedPassword = "hashedpassword";

describe("ValidatePassword function", () => {
  const mockRelease = jest.fn();
  const mockQuery = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (pool.connect as jest.Mock).mockResolvedValue({
      query: mockQuery,
      release: mockRelease
    });
  });

  it("should return true if the password matches", async () => {
    const username = "testuser";
    const password = "testpassword";
    const hashedPassword = "hashedpassword";

    mockQuery.mockResolvedValueOnce({
      rows: [{ password: hashedPassword }]
    });

    (bcrypt.compare as jest.Mock).mockResolvedValueOnce(true);

    const result = await ValidatePassword(username, password);

    expect(result).toBe(true);
  });

  it("should return false if the password doesn't match", async () => {
    const username = "testuser";
    const password = "wrongpassword";
    const hashedPassword = "hashedpassword";

    mockQuery.mockResolvedValueOnce({
      rows: [{ password: hashedPassword }]
    });

    (bcrypt.compare as jest.Mock).mockResolvedValueOnce(false);

    const result = await ValidatePassword(username, password);

    expect(result).toBe(false);
  });

  it("should return false if the user is not found", async () => {
    const username = "unknownuser";
    const password = "testpassword";

    mockQuery.mockResolvedValueOnce({
      rows: []
    });

    const result = await ValidatePassword(username, password);

    expect(result).toBe(false);
  });

  it("should handle database errors and return false", async () => {
    const username = "testuser";
    const password = "testpassword";

    mockQuery.mockRejectedValueOnce(new Error("Database error"));

    const result = await ValidatePassword(username, password);

    expect(result).toBe(false);
  });

  it("should release the client after querying", async () => {
    const username = "testuser";
    const password = "testpassword";
    const hashedPassword = "hashedpassword";

    mockQuery.mockResolvedValueOnce({
      rows: [{ password: hashedPassword }]
    });

    (bcrypt.compare as jest.Mock).mockResolvedValueOnce(true);

    await ValidatePassword(username, password);

    expect(mockRelease).toHaveBeenCalled();
  });
});
