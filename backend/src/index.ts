import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("The MONGODB_URI environment variable is not set.");

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

app.get('/DBconnection', async (req, res) => {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    res.status(200).send("Successfully connected to MongoDB!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to connect to MongoDB.");
  } finally {
    await client.close();
  }
});


app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export { app, client, server };