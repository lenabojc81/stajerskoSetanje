// routes/auth.ts
import express from 'express';
import { registerUser, authenticateUser } from '../services/authService'; // Adjust the path as necessary

const router = express.Router();

const createResponse = (status: string, data: any = null, message: string = '') => {
  return { status, data, message };
};

router.post('/register', async (req, res) => {
  console.log('Register request body:', req.body); // Debugging: Log the request body
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json(createResponse('error', null, 'Email and password are required'));
    }
    const user = await registerUser(email, password);
    const responseData = {
      email: user.email,
      id: user._id,
    };
    res.status(201).json(createResponse('success', responseData, 'User registered successfully'));
  } catch (err) {
    console.error('Registration error:', err); // Add error logging
    if (err instanceof Error) {
      res.status(500).json(createResponse('error', null, err.message));
    } else {
      res.status(500).json(createResponse('error', null, 'An unknown error occurred'));
    }
  }
});

router.post('/login', async (req, res) => {
  console.log('Login request body:', req.body); // Debugging: Log the request body
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json(createResponse('error', null, 'Email and password are required'));
    }
    const user = await authenticateUser(email, password);
    if (user) {
      const responseData = {
        email: user.email,
        id: user._id,
      };
      res.status(200).json(createResponse('success', responseData, 'User logged in successfully'));
    } else {
      res.status(401).json(createResponse('error', null, 'Invalid credentials'));
    }
  } catch (err) {
    console.error('Login error:', err); // Add error logging
    if (err instanceof Error) {
      res.status(500).json(createResponse('error', null, err.message));
    } else {
      res.status(500).json(createResponse('error', null, 'An unknown error occurred'));
    }
  }
});

export default router;
