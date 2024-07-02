import dotenv from 'dotenv';
import mongoose from 'mongoose';
import express from 'express';

dotenv.config();
const router = express.Router();

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("The MONGODB_URI environment variable is not set.");

mongoose.connect(uri)
.then(() => console.log('Successfully connected to MongoDB using Mongoose!'))
.catch(error => console.error('Error connecting to MongoDB:', error));

// Test the connection
router.get('/DBconnection', async (req, res) => {
    try {
      res.status(200).send("Successfully connected to MongoDB using Mongoose!");
    } catch (error) {
      console.error(error);
      res.status(500).send("Failed to connect to MongoDB.");
    }
});



export { router, mongoose };
