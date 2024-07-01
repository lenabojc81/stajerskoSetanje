import request from "supertest";
import { app, server } from "../src/index";

describe('GET /DBconnection', () => {
    it('should check MongoDB connection', async () => {
      const response = await request(app).get('/DBconnection');
      expect(response.statusCode).toBe(200);
      expect(response.text).toEqual("Successfully connected to MongoDB!");
    });
});

describe("GET /", () => {
  it("should return 200 and Hello, TypeScript with Express!", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Hello, TypeScript with Express!");
  });
});

afterAll(() => {
  server.close();
});