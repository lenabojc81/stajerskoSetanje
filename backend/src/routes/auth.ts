import express from 'express';
import { registerUser, authenticateUser, getUserFromToken } from '../services/authService';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { email, password, username } = req.body;
  try {
    if (!email || !password || !username) {
      return res.status(400).json({ status: 'error', message: 'Email and password are required' });
    }
    const user = await registerUser(email, password, username);
    res.status(201).json({ status: 'success', data: user, message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: (err as Error).message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ status: 'error', message: 'Email and password are required' });
    }
    const result = await authenticateUser(email, password);
    if (result) {
      res.status(200).json({ status: 'success', data: result.user, token: result.token, message: 'User logged in successfully' });
    } else {
      res.status(401).json({ status: 'error', message: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ status: 'error', message: (err as Error).message });
  }
});

router.get('/user', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ status: 'error', message: 'Token is missing' });
    }

    const user = await getUserFromToken(token);
    if (user) {
      console.log('User found:', user); 
      res.status(200).json({ status: 'success', data: user });
    } else {
      res.status(404).json({ status: 'error', message: 'User not found' });
    }
  } catch (err) {
    console.error('Error in /user route:', (err as Error).message); 
    res.status(500).json({ status: 'error', message: (err as Error).message });
  }
});




export default router;
