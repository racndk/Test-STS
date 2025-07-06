const express = require('express');
const router = express.Router();
const { db } = require('../db');
const authenticateToken = require('../middlewares/authMiddleware');
const ExcelJS = require('exceljs');

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
  const { tingkat, page } = req.query;
  const offset = ((page ? parseInt(page) : 1) - 1) * 5;
  const { id, level } = req.user;
  const { clause, values } = await getWhereClauseFromDB(id, level);

  try {
    let result;
    if (tingkat !== 'kelurahan') {
      [result] = await db.execute(
        `SELECT ${tingkat} AS nama, COUNT(*) AS total 
         FROM anggota 
         WHERE ${clause}
         GROUP BY ${tingkat} 
         ORDER BY total DESC 
         LIMIT 5 OFFSET ?`,
        [...values, offset]
      );
    } else {
      [result] = await db.execute(
        `SELECT nama, no_ktp, no_hp, provinsi, kabupaten, kecamatan, kelurahan, created_at
         FROM anggota
         WHERE ${clause}
         ORDER BY created_at DESC
         LIMIT 5 OFFSET ?`,
        [...values, offset]
      );
    }

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal mengambil data rekapitulasi' });
  }
});

router.get('/count', authenticateToken, async (req, res) => {
  const { tingkat } = req.query;
  const { id, level } = req.user;
  const { clause, values } = await getWhereClauseFromDB(id, level);

  try {
    const [rows] = await db.execute(
      `SELECT COUNT(*) as total FROM anggota WHERE ${clause}`,
      values
    );

    res.json({ total: rows[0].total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal menghitung total data' });
  }
});

router.get('/export', authenticateToken, async (req, res) => {
  const { tingkat } = req.query;
  const { id, level } = req.user;
  const { clause, values } = await getWhereClauseFromDB(id, level);

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet(`Rekap ${tingkat}`);

  try {
    let result;
    if (tingkat !== 'kelurahan') {
      [result] = await db.execute(
        `SELECT ${tingkat} AS nama, COUNT(*) AS total 
         FROM anggota 
         WHERE ${clause}
         GROUP BY ${tingkat}
         ORDER BY total DESC`,
        values
      );

      sheet.columns = [
        { header: 'No', key: 'no', width: 10 },
        { header: `Nama ${tingkat}`, key: 'nama', width: 30 },
        { header: 'Total Anggota', key: 'total', width: 15 },
      ];

      result.forEach((row, index) => {
        sheet.addRow({ no: index + 1, ...row });
      });
    } else {
      [result] = await db.execute(
        `SELECT nama, no_ktp, no_hp, provinsi, kabupaten, kecamatan, kelurahan, created_at
         FROM anggota
         WHERE ${clause}
         ORDER BY created_at DESC`,
        values
      );

      sheet.columns = [
        { header: 'Nama', key: 'nama', width: 20 },
        { header: 'No KTP', key: 'no_ktp', width: 20 },
        { header: 'No HP', key: 'no_hp', width: 15 },
        { header: 'Provinsi', key: 'provinsi', width: 20 },
        { header: 'Kabupaten', key: 'kabupaten', width: 20 },
        { header: 'Kecamatan', key: 'kecamatan', width: 20 },
        { header: 'Kelurahan', key: 'kelurahan', width: 20 },
        { header: 'Tanggal Daftar', key: 'created_at', width: 25 },
      ];

      result.forEach(row => sheet.addRow(row));
    }

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader('Content-Disposition', `attachment; filename=rekap-${tingkat}.xlsx`);

    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal mengekspor data' });
  }
});

module.exports = router;
