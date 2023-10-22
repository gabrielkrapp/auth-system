import request from 'supertest';
import { app } from '../../index';
import { v4 as uuidv4 } from "uuid";
import { GetUserBy } from '../../utils/GetUserBy';
import { ValidatePassword } from '../../utils/ValidatePassword';
import jwt from "jsonwebtoken";

jest.mock('../../utils/GetUserBy');
jest.mock('../../utils/ValidatePassword')

describe('Login router', () => {

  const testTimeout = 10000;
  const id = uuidv4()
  const username = "testuser";
  const password = "testpassword";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 400 if username don´t exists', async () => {

    (GetUserBy as jest.Mock).mockResolvedValueOnce(null);

    const response = await request(app).post('/login').send({ username, password });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('User not found');
  }, testTimeout);
  
  it('should return 400 if password is invalid', async () => {

    (GetUserBy as jest.Mock).mockResolvedValueOnce({ id: uuidv4(), username });
    (ValidatePassword as jest.Mock).mockResolvedValueOnce(false); 

    const response = await request(app).post('/login').send({ username, password });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Invalid password');
  }, testTimeout);

  it('should return 200 if login is successful and a valid token', async () => {

    (GetUserBy as jest.Mock).mockResolvedValueOnce({ id: id, username: 'testuser', permissions: "user" });
    (ValidatePassword as jest.Mock).mockResolvedValueOnce(true); 

    const response = await request(app).post('/login').send({ username, password });

    expect(response.status).toBe(200);

    const decodedToken = jwt.decode(response.body.token);
    expect(decodedToken).not.toBeNull();
    expect((decodedToken as any).id).toBe(id);
    expect((decodedToken as any).username).toBe('testuser');
    expect((decodedToken as any).permissions).toBe('user');
    }, testTimeout);

    it('should return 400 if request body is missing', async () => {
        const response = await request(app).post('/login');
        expect(response.status).toBe(400);
    }, testTimeout);
    
    it('should return 400 if username or password is missing', async () => {
        const response = await request(app).post('/login').send({ username });
        expect(response.status).toBe(400);
    }, testTimeout);
    
});
