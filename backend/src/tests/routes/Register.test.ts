import request from 'supertest';
import { app } from '../../index';
import { v4 as uuidv4 } from "uuid";
import { GetUserBy } from '../../utils/GetUserBy';

jest.mock('../../utils/GetUserBy');

describe('RegisterUser router', () => {

  const testTimeout = 10000;
  const username = "testuser";
  const password = "testpassword";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 400 if username already exists', async () => {

    (GetUserBy as jest.Mock).mockResolvedValueOnce({ id: uuidv4(), username });

    const response = await request(app).post('/register').send({ username, password });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Username already exists');
  }, testTimeout);

  it('should return 200 if user registration is successful', async () => {

    (GetUserBy as jest.Mock).mockResolvedValueOnce(null);

    const response = await request(app).post('/register').send({ username, password });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('User registered successfully');
  }, testTimeout);
});
