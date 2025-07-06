import React, { useState } from 'react';
import axios from 'axios';
import AdminLayout from '../components/AdminLayout';
import { jwtDecode } from 'jwt-decode';
import './Pendaftaran.css';

function Pendaftaran() {
  const token = localStorage.getItem('token');
  const user = jwtDecode(token);

  const [formData, setFormData] = useState({
    no_ktp: '',
    nama: '',
    no_hp: '',
    provinsi: user.provinsi || '',
    kabupaten: user.kabupaten || '',
    kecamatan: user.kecamatan || '',
    kelurahan: user.kelurahan || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/anggota', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Data berhasil ditambahkan!');
      setFormData({
        no_ktp: '',
        nama: '',
        no_hp: '',
        provinsi: '',
        kabupaten: '',
        kecamatan: '',
        kelurahan: '',
      });
    } catch (err) {
      console.error(err);
      alert('Gagal menambahkan data');
    }
  };

  return (
    <AdminLayout user={user}>
      <div className="form-container">
        <h2>Pendaftaran Anggota</h2>
        <form onSubmit={handleSubmit} className="form-grid">
          <div className="form-group">
            <label>No KTP</label>
            <input type="text" name="no_ktp" value={formData.no_ktp} onChange={handleChange} required maxLength={16} />
          </div>

          <div className="form-group">
            <label>Nama</label>
            <input type="text" name="nama" value={formData.nama} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>No HP</label>
            <input type="text" name="no_hp" value={formData.no_hp} onChange={handleChange} required maxLength={15} />
          </div>

          <div className="form-group">
            <label>Provinsi</label>
            <input type="text" name="provinsi" value={formData.provinsi} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Kabupaten</label>
            <input type="text" name="kabupaten" value={formData.kabupaten} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Kecamatan</label>
            <input type="text" name="kecamatan" value={formData.kecamatan} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Kelurahan</label>
            <input type="text" name="kelurahan" value={formData.kelurahan} onChange={handleChange} required />
          </div>

          <div className="form-group full-width">
            <button type="submit">Simpan</button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}

export default Pendaftaran;
