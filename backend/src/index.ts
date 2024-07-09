import express, { NextFunction, Request, Response } from 'express';
import { router as dbRouter } from './db';
import pathsRouter from './paths';
import mapRouter from './map';

const app = express();
const port = 3000;

app.use(express.json());
app.use(dbRouter);
app.use(pathsRouter);
app.use(mapRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export { app, server };