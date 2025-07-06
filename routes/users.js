const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const { db } = require('../db');
const authenticateToken = require('../middlewares/authMiddleware');

// List semua user (khusus admin pusat)
router.get('/', authenticateToken, async (req, res) => {
  if (req.user.level !== 'pusat') {
    return res.status(403).json({ message: 'Akses ditolak' });
  }

  try {
    const [result] = await db.query(
      'SELECT id, nik, level, provinsi, kabupaten, kecamatan, kelurahan FROM users'
    );
    res.json(result);
  } catch (err) {
    console.error('Error mengambil pengguna:', err);
    res.status(500).json({ message: 'Gagal mengambil data pengguna' });
  }
});

// Tambah pengguna baru
router.post('/', authenticateToken, async (req, res) => {
  if (req.user.level !== 'pusat') {
    return res.status(403).json({ message: 'Akses ditolak' });
  }

  const { nik, password, level, provinsi, kabupaten, kecamatan, kelurahan } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      `INSERT INTO users (nik, password, level, provinsi, kabupaten, kecamatan, kelurahan)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [nik, hashedPassword, level, provinsi, kabupaten, kecamatan, kelurahan]
    );

    res.json({ message: 'Pengguna ditambahkan' });
  } catch (err) {
    console.error('Error tambah pengguna:', err);
    res.status(500).json({ message: 'Gagal menambahkan pengguna' });
  }
});

// Edit pengguna
router.put('/:id', authenticateToken, async (req, res) => {
  if (req.user.level !== 'pusat') {
    return res.status(403).json({ message: 'Akses ditolak' });
  }

  const { nik, password, level, provinsi, kabupaten, kecamatan, kelurahan } = req.body;
  const { id } = req.params;

  try {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
    }

    const existingUser = rows[0];
    const hashedPassword = password ? await bcrypt.hash(password, 10) : existingUser.password;

    await db.query(
      `UPDATE users SET nik = ?, password = ?, level = ?, provinsi = ?, kabupaten = ?, kecamatan = ?, kelurahan = ? WHERE id = ?`,
      [nik, hashedPassword, level, provinsi, kabupaten, kecamatan, kelurahan, id]
    );

    res.json({ message: 'Pengguna diupdate' });
  } catch (err) {
    console.error('Error update pengguna:', err);
    res.status(500).json({ message: 'Gagal update pengguna' });
  }
});

// Hapus pengguna
router.delete('/:id', authenticateToken, async (req, res) => {
  if (req.user.level !== 'pusat') {
    return res.status(403).json({ message: 'Akses ditolak' });
  }

  try {
    await db.query('DELETE FROM users WHERE id = ?', [req.params.id]);
    res.json({ message: 'Pengguna dihapus' });
  } catch (err) {
    console.error('Error hapus pengguna:', err);
    res.status(500).json({ message: 'Gagal menghapus pengguna' });
  }
});

module.exports = router;
