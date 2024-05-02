import App from '@/app';
import { prismaMock } from '@/test/prisma';
import request from 'supertest';

const requestBody = {
  fullName: 'botak',
  email: 'user@mail.com',
  password: 'user@mail.com',
};

describe('POST /auth/register', () => {
  const { app } = new App();
  it('should register user successfully', async () => {
    prismaMock.user.findFirst.mockResolvedValueOnce(null);
    prismaMock.user.create.mockResolvedValueOnce({
      id: 1,
      fullName: 'mock fullname',
      email: 'mock email',
      password: 'mock password',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const response = await request(app).post('/api/auth/register').send(requestBody);

    // console.log(response.status);
    // console.log(response.body)

    expect(response.status).toBe(200)
    // expect(response.body)
  });

  it('should return error if email already exist', async () => {
    prismaMock.user.findFirst.mockResolvedValueOnce({
      id: 1,
      fullName: 'mock fullname',
      email: 'mock email',
      password: 'mock password',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const response = await request(app).post('/api/auth/register').send(requestBody);

    expect(response.status).toBe(500);
    expect(response.text).toBe('Email already exist');
  });
});
