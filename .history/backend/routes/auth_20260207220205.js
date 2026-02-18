import express from 'express';
import { User, saveUser, getUserByEmail, getUserById } from '../models/User.js';
import { generateToken, verifyToken, authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Register
router.post('/register', (req, res) => {
  try {
    const { email, password, firstName, lastName, country } = req.body;

    if (!email || !password || !firstName || !lastName || !country) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (getUserByEmail(email)) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    const user = new User(email, password, firstName, lastName, country, 'customer');
    saveUser(user);

    const token = generateToken(user);
    res.status(201).json({
      user: user.toJSON(),
      token
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login
router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const user = getUserByEmail(email);
    if (!user || !user.verifyPassword(password)) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = generateToken(user);
    res.json({
      user: user.toJSON(),
      token
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get current user
router.get('/me', authenticateToken, (req, res) => {
  res.json(req.user.toJSON());
});

// Verify token
router.post('/verify', (req, res) => {
  const { token } = req.body;
  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ valid: false });
  }
  const user = getUserById(decoded.id);
  res.json({ valid: true, user: user.toJSON() });
});

export default router;
