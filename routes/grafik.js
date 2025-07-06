const express = require('express');
const router = express.Router();
const { db } = require('../db');
const authenticateToken = require('../middlewares/authMiddleware');

async function getWhereClauseFromDB(userId, level) {
  const [rows] = await db.execute(
    'SELECT provinsi, kabupaten, kecamatan, kelurahan FROM users WHERE id = ?',
    [userId]
  );

  if (!rows.length) return { clause: '1', values: [] };

  const user = rows[0];

  switch (level) {
    case 'provinsi':
      return { clause: 'provinsi = ?', values: [user.provinsi] };
    case 'kabupaten':
      return { clause: 'kabupaten = ?', values: [user.kabupaten] };
    case 'kecamatan':
      return { clause: 'kecamatan = ?', values: [user.kecamatan] };
    case 'kelurahan':
      return { clause: 'kelurahan = ?', values: [user.kelurahan] };
    default:
      return { clause: '1', values: [] };
  }
}

router.get('/', authenticateToken, async (req, res) => {
  const { id, level } = req.user;
  const { clause, values } = await getWhereClauseFromDB(id, level);

  try {
    const [rows] = await db.query(
      `
      SELECT 
        DATE_FORMAT(created_at, '%H:%i') as time,
        COUNT(*) as count
      FROM anggota
      WHERE created_at >= NOW() - INTERVAL 30 MINUTE AND ${clause}
      GROUP BY FLOOR(UNIX_TIMESTAMP(created_at)/300)
      ORDER BY time ASC
      `,
      values
    );
    res.json(rows);
  } catch (err) {
    console.error('Error grafik:', err);
    res.status(500).json({ message: 'Gagal mengambil data grafik' });
  }
});

router.get('/today', authenticateToken, async (req, res) => {
  const { id, level } = req.user;
  const { clause, values } = await getWhereClauseFromDB(id, level);

  try {
    const [rows] = await db.query(
      `
      SELECT COUNT(*) as total 
      FROM anggota 
      WHERE DATE(created_at) = CURDATE() AND ${clause}
      `,
      values
    );
    res.json(rows[0]);
  } catch (err) {
    console.error('Error total hari ini:', err);
    res.status(500).json({ message: 'Gagal mengambil total hari ini' });
  }
});

router.get('/total', authenticateToken, async (req, res) => {
  const { id, level } = req.user;
  const { clause, values } = await getWhereClauseFromDB(id, level);

  try {
    const [rows] = await db.query(
      `
      SELECT COUNT(*) as total 
      FROM anggota 
      WHERE ${clause}
      `,
      values
    );
    res.json(rows[0]);
  } catch (err) {
    console.error('Error total keseluruhan:', err);
    res.status(500).json({ message: 'Gagal mengambil total keseluruhan' });
  }
});

module.exports = router;
