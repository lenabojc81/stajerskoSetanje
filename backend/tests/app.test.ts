import request from 'supertest';
import express, { Request, Response } from 'express';

const app = express();
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

describe('GET /', () => {
  it('should return 200 and Hello, TypeScript with Express!', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello, TypeScript with Express!');
  });
});
