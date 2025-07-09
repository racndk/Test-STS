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
  const provinsiOptions = [
    { value: 'dki jakarta', label: 'DKI Jakarta' },
    { value: 'jawa barat', label: 'Jawa Barat' },
  ];
  
  const kabupatenOptions = {
    'dki jakarta': [
      { value: 'jakarta timur', label: 'Jakarta Timur' },
    ],
    'jawa barat': [
      { value: 'bandung', label: 'Bandung' },
    ],
  };
  const kecamatanOptions = {
    'jakarta timur': [
      { value: 'cakung', label: 'Cakung' },
    ],
    'bandung': [
      { value: 'coblong', label: 'Coblong' },
    ],
  };
  
  const kelurahanOptions = {
    'cakung': [
      { value: 'ujung menteng', label: 'Ujung Menteng' },
      { value: 'cakung barat', label: 'Cakung Barat' },
    ],
    'coblong': [
      { value: 'lebak gede', label: 'Lebak Gede' },
      { value: 'dago', label: 'Dago' },
    ],
  };
  
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
            <select name="provinsi" value={formData.provinsi} onChange={(e) => {
              const selectedProvinsi = e.target.value;
              setFormData(prev => ({
                ...prev,
                provinsi: selectedProvinsi,
                kabupaten: '' // reset kabupaten saat provinsi ganti
              }));
            }} required>
              <option value="">-- Pilih Provinsi --</option>
              {provinsiOptions.map((prov) => (
                <option key={prov.value} value={prov.value}>{prov.label}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Kabupaten</label>
            <select name="kabupaten" value={formData.kabupaten} onChange={handleChange} required>
              <option value="">-- Pilih Kabupaten --</option>
              {kabupatenOptions[formData.provinsi]?.map((kab) => (
                <option key={kab.value} value={kab.value}>{kab.label}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Kecamatan</label>
            <select
              name="kecamatan"
              value={formData.kecamatan}
              onChange={(e) => {
                const selectedKecamatan = e.target.value;
                setFormData(prev => ({
                  ...prev,
                  kecamatan: selectedKecamatan,
                  kelurahan: '', // reset kelurahan jika kecamatan ganti
                }));
              }}
              required
            >
              <option value="">-- Pilih Kecamatan --</option>
              {kecamatanOptions[formData.kabupaten]?.map((kec) => (
                <option key={kec.value} value={kec.value}>{kec.label}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Kelurahan</label>
            <select
              name="kelurahan"
              value={formData.kelurahan}
              onChange={handleChange}
              required
            >
              <option value="">-- Pilih Kelurahan --</option>
              {kelurahanOptions[formData.kecamatan]?.map((kel) => (
                <option key={kel.value} value={kel.value}>{kel.label}</option>
              ))}
            </select>
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
