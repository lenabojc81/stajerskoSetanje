// routes/auth.ts
import express from 'express';
import { registerUser, authenticateUser } from '../services/authService';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ status: 'error', message: 'Email and password are required' });
    }
    const user = await registerUser(email, password);
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

export default router;
