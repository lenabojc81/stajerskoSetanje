import request from "supertest";
import { app, server } from "../src/index";
import { mongoose } from "../src/db";
import {describe, expect, it, afterAll} from '@jest/globals';
import { v4 as uuid4 } from 'uuid';

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

describe('POST /api/path/dodajPot', () => {
  it('should create a new path and return 201 status', async () => {
    const newPathData = {
      ime: 'Scenic Mountain Trail',
      tezavnost: 3,
      dolzina: 5.2,
      opis: 'A beautiful and challenging trail through the mountains.',
      tocke: 100,
      zacetna_lokacija: {
        lat: 46.056946,
        lng: 14.505751
      },
      vmesne_tocke: [
        {
          ime: 'Start Point',
          lokacija: {
            lat: 46.056946,
            lng: 14.505751
          },
          uganka: 'test uganka',
          odgovor: {
            odgovor: 'test odgovor',
            tip_odgovor: 'text'
          },
          dodatna_vprasanja: [
            {
              vprasanje: 'test vprasanje',
              odgovori: [
                {
                  odgovor: 'test odgovor',
                  pravilen: true
                },
                {
                  odgovor: 'test odgovor',
                  pravilen: false
                },
                {
                  odgovor: 'test odgovor',
                  pravilen: false
                }
              ]
            }
          ]
        },
        {
          ime: 'Checkpoint',
          lokacija: {
            lat: 46.056946,
            lng: 14.505752
          },
          uganka: 'test uganka',
          odgovor: {
            odgovor: 'test odgovor',
            tip_odgovor: 'text'
          },
          dodatna_vprasanja: [
            {
              vprasanje: 'test vprasanje',
              odgovori: [
                {
                  odgovor: 'test odgovor',
                  pravilen: true
                },
                {
                  odgovor: 'test odgovor',
                  pravilen: false
                },
                {
                  odgovor: 'test odgovor',
                  pravilen: false
                }
              ]
            }
          ]
        },
        {
          ime: 'End Point',
          lokacija: {
            lat: 46.056947,
            lng: 14.505753
          },
          uganka: 'test uganka',
          odgovor: {
            odgovor: 'test odgovor',
            tip_odgovor: 'text'
          },
          dodatna_vprasanja: [
            {
              vprasanje: 'test vprasanje',
              odgovori: [
                {
                  odgovor: 'test odgovor',
                  pravilen: true
                },
                {
                  odgovor: 'test odgovor',
                  pravilen: false
                },
                {
                  odgovor: 'test odgovor',
                  pravilen: false
                }
              ]
            }
          ]
        }
      ]
    };

    const response = await request(app)
      .post('/api/paths/dodajPot')
      .send(newPathData)
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body.ime).toBe(newPathData.ime);
    
  });
});

describe('GET /api/paths/pridobiPoti', () => {
  it('should get all the paths from DB', async () => {
    const response = await request(app).get('/api/paths/pridobiPoti');
    expect(response.statusCode).toBe(200);
  });
});

describe('POST /api/paths/pridobiOdgovore', () => {
  it('should return 200 and a list of odgovori', async () => {
      const response = await request(app)
          .post('/api/paths/pridobiOdgovore')
          .send({
              tipOdgovora: 'nekTipOdgovora',
              neOdgovor: 'nekNeOdgovor'
          });

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      // Dodatne preverbe glede na strukturo podatkov
      response.body.forEach((odgovor: any) => {
          expect(odgovor).toHaveProperty('vmesne_tocke.odgovor.odgovor');
          expect(odgovor).toHaveProperty('vmesne_tocke.lokacija');
      });
  });
});

describe('POST /auth/register', () => {
  it('should return 400 if email or password is missing', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({ email: '', password: '' });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      status: 'error',
      message: 'Email and password are required',
    });
  });

  it('should return 201 and user data if registration is successful', async () => {
    const uniqueEmail = `${uuid4()}@example.com`;
    const response = await request(app)
      .post('/api/auth/register')
      .send({ email: uniqueEmail, password: 'password123' });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      status: 'success',
      data: expect.objectContaining({
        email: uniqueEmail,
      }),
      message: 'User registered successfully',
    });
  });

  it('should return 500 if there is a server error', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({ email: 'test@example.com', password: 'password123' });

    expect(response.status).toBe(500);
  });
});

describe('POST /auth/login', () => {
  it('should return 400 if email or password is missing', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({ email: '', password: '' });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      status: 'error',
      message: 'Email and password are required',
    });
  });

  it('should return 401 if credentials are invalid', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({ email: 'invalid@example.com', password: 'wrongpassword' });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      status: 'error',
      message: 'Invalid credentials',
    });
  });

  it('should return 200 and user data if login is successful', async () => {
    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'password123' });

    expect(loginResponse.status).toBe(200);
    expect(loginResponse.body).toEqual({
      status: 'success',
      data: expect.any(Object),
      token: expect.any(String),
      message: 'User logged in successfully',
    });
  });
});




afterAll(async () => {
  await mongoose.disconnect();
  server.close();
});