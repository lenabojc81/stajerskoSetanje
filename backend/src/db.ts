import dotenv from 'dotenv';
import mongoose from 'mongoose';
import express from 'express';
import User from './models/users';

dotenv.config();
const router = express.Router();

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("The MONGODB_URI environment variable is not set.");

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log('Successfully connected to MongoDB using Mongoose!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit process with failure
  }
};

// Test the connection
router.get('/DBconnection', async (req, res) => {
  try {
    res.status(200).send("Successfully connected to MongoDB using Mongoose!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to connect to MongoDB.");
  }
});

export { connectDB, router, mongoose, User };
