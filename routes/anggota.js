const express = require('express');
const router = express.Router();
const { db } = require('../db');
const authenticateToken = require('../middlewares/authMiddleware');

router.get('/', authenticateToken, async (req, res) => {
  const { id, level } = req.user;

  let query = 'SELECT * FROM anggota WHERE 1=1';
  const params = [];

  try {
    const [userRows] = await db.execute(
      'SELECT provinsi, kabupaten, kecamatan, kelurahan FROM users WHERE id = ?',
      [id]
    );

    if (userRows.length === 0) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }

    const user = userRows[0];

    if (level === 'provinsi') {
      query += ' AND provinsi = ?';
      params.push(user.provinsi);
    } else if (level === 'kabupaten') {
      query += ' AND kabupaten = ?';
      params.push(user.kabupaten);
    } else if (level === 'kecamatan') {
      query += ' AND kecamatan = ?';
      params.push(user.kecamatan);
    } else if (level === 'kelurahan') {
      query += ' AND kelurahan = ?';
      params.push(user.kelurahan);
    }

    const [rows] = await db.execute(query, params);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal mengambil data anggota' });
  }
});

router.post('/', authenticateToken, async (req, res) => {
  const { no_ktp, nama, no_hp, provinsi, kabupaten, kecamatan, kelurahan } = req.body;

  try {
    const query = `
      INSERT INTO anggota (no_ktp, nama, no_hp, provinsi, kabupaten, kecamatan, kelurahan)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    await db.execute(query, [no_ktp, nama, no_hp, provinsi, kabupaten, kecamatan, kelurahan]);

    res.status(201).json({ message: 'Anggota berhasil ditambahkan' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal menambahkan anggota' });
  }
});

module.exports = router;
