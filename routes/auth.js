const express = require('express');
const router = express.Router();
const { db } = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

router.post('/login', async (req, res) => {
    const { nik, password } = req.body;
  
    try {
      const [results] = await db.execute('SELECT * FROM users WHERE nik = ?', [nik]);
  
      if (results.length === 0) return res.status(401).json({ error: 'User tidak ditemukan' });
  
      const user = results[0];
  
      if (password !== user.password) {
        return res.status(401).json({ error: 'Password salah' });
      }
  
      const token = jwt.sign(
        { id: user.id, nik: user.nik, level: user.level },
        JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      res.json({ token });
    } catch (err) {
      console.error('Login error:', err);
      res.status(500).json({ error: 'Terjadi kesalahan server' });
    }
  });
  
  
module.exports = router;
