import { GetUserBy } from "../../utils/GetUserBy";
import { pool } from "../../database/database";
import { v4 as uuidv4 } from "uuid";

jest.mock("../../database/database", () => ({
  pool: {
    connect: jest.fn()
  }
}));

const id = uuidv4()
const username = "testuser";

describe("GetUserBy function", () => {
  const mockRelease = jest.fn();
  const mockQuery = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (pool.connect as jest.Mock).mockResolvedValue({
      query: mockQuery,
      release: mockRelease
    });
  });

  it("should return user data when searching by username", async () => {
    mockQuery.mockResolvedValueOnce({
      rows: [{ id: id, username: "testuser", permissions: "user" }]
    });

    const result = await GetUserBy(username);
    expect(result).toEqual({ id: id, username: "testuser", permissions: "user" });
  });

  it("should return user data when searching by id", async () => {
    mockQuery.mockResolvedValueOnce({
      rows: [{ id: id, username: "testuser", permissions: "user" }]
    });

    const result = await GetUserBy(id);
    expect(result).toEqual({ id: id, username: "testuser", permissions: "user" });
  });

  it("should return null if no user is found", async () => {
    mockQuery.mockResolvedValueOnce({ rows: [] });

    const result = await GetUserBy(username);
    expect(result).toBeNull();
  });

  it("should handle errors and return null", async () => {
    mockQuery.mockRejectedValueOnce(new Error("Database error"));

    const result = await GetUserBy(username);
    expect(result).toBeNull();
  });

  it("should release the client after querying", async () => {
    mockQuery.mockResolvedValueOnce({ rows: [] });

    await GetUserBy(username);
    expect(mockRelease).toHaveBeenCalled();
  });
});
