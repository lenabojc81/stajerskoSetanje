import request from "supertest";
import { app, server } from "../src/index";
import { mongoose } from "../src/db";
import {describe, expect, it, afterAll} from '@jest/globals';

describe('GET /DBconnection', () => {
    it('should check MongoDB connection', async () => {
      const response = await request(app).get('/DBconnection');
      expect(response.statusCode).toBe(200);
      expect(response.text).toEqual("Successfully connected to MongoDB using Mongoose!");
    });
});

describe("GET /", () => {
  it("should return 200 and Hello, TypeScript with Express!", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Hello, TypeScript with Express!");
  });
});

describe('POST /dodajPot', () => {
  it('should create a new path and return 201 status', async () => {
    const newPathData = {
      ime: 'Scenic Mountain Trail',
      tezavnost: 3,
      dolzina: 5.2,
      opis: 'A beautiful and challenging trail through the mountains.',
      vmesne_tocke: [
        {
          ime: 'Start Point',
          lokacija: {
            lat: 46.056946,
            lng: 14.505751
          }
        },
        {
          ime: 'Checkpoint',
          lokacija: {
            lat: 46.056946,
            lng: 14.505752
          }
        },
        {
          ime: 'End Point',
          lokacija: {
            lat: 46.056947,
            lng: 14.505753
          }
        }
      ]
    };

    const response = await request(app)
      .post('/dodajPot')
      .send(newPathData)
      .set('Accept', 'application/json');

    expect(response.status).toBe(201);
    expect(response.body.ime).toBe(newPathData.ime);
    
  });
});

describe("GET /premikNaZacetnoTocko/:startLong/:startLat/:endLong/:endLat", () => {

});

afterAll(async () => {
  await mongoose.disconnect();
  server.close();
});