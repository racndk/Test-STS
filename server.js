const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
const anggotaApi = require('./routes/anggota');
const rekapApi = require('./routes/rekap');
const grafikRoutes = require('./routes/grafik');
const userRoutes = require('./routes/users');

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/anggota', anggotaApi);
app.use('/api/rekapitulasi', rekapApi);
app.use('/api/grafik', grafikRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
