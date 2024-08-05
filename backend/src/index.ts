// index.ts (or server.ts)
import express, { Request, Response } from 'express';
import cors from 'cors'; // Import cors
import { connectDB, router as dbRouter } from './db'; // Adjust the path as necessary
import pathsRouter from './routes/paths'; // Adjust the path as necessary
import mapRouter from './routes/map'; // Adjust the path as necessary
import authRouter from './routes/auth'; // Adjust the path as necessary

const app = express();
const port = 3000;

// Connect to MongoDB
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Enable CORS
app.use(cors()); // Use cors middleware

// Define routes
app.use(dbRouter); // Test DB connection route
app.use('/api/paths', pathsRouter); // Adjust the path as necessary
app.use('/api/map', mapRouter); // Adjust the path as necessary
app.use('/api/auth', authRouter); // Authentication routes

// Root endpoint
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

// Start the server
const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export { app, server };
