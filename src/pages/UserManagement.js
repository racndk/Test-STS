import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../components/AdminLayout';
import { jwtDecode } from 'jwt-decode'; 
import { Modal } from 'antd';

const levelOptions = [
  { value: 'pusat', label: 'Admin Pusat' },
  { value: 'provinsi', label: 'Admin Provinsi' },
  { value: 'kabupaten', label: 'Admin Kabupaten' },
  { value: 'kecamatan', label: 'Admin Kecamatan' },
  { value: 'kelurahan', label: 'Admin Kelurahan' },
];

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form, setForm] = useState({
    nik: '',
    password: '',
    level: 'default',
    provinsi: '',
    kabupaten: '',
    kecamatan: '',
    kelurahan: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');
  const user = jwtDecode(token);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      alert('Gagal mengambil data pengguna');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const openAddModal = () => {
    setEditingId(null);
    setForm({
      nik: '',
      password: '',
      level: 'default',
      provinsi: '',
      kabupaten: '',
      kecamatan: '',
      kelurahan: '',
    });
    setIsModalVisible(true);
  };

  const handleEdit = (user) => {
    setEditingId(user.id);
    setForm({
      nik: user.nik,
      password: '',
      level: user.level,
      provinsi: user.provinsi,
      kabupaten: user.kabupaten,
      kecamatan: user.kecamatan,
      kelurahan: user.kelurahan,
    });
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      if (editingId) {
        // Edit
        await axios.put(`http://localhost:5000/api/users/${editingId}`, form, config);
        alert('Pengguna berhasil diperbarui');
      } else {
        // Tambah
        if (!form.password) {
          alert('Password harus diisi saat membuat user baru');
          setLoading(false);
          return;
        }
        await axios.post('http://localhost:5000/api/users', form, config);
        alert('Pengguna berhasil ditambahkan');
      }

      setForm({
        nik: '',
        password: '',
        level: 'default',
        provinsi: '',
        kabupaten: '',
        kecamatan: '',
        kelurahan: '',
      });
      setEditingId(null);
      setIsModalVisible(false);
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert('Gagal menyimpan pengguna');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Yakin ingin menghapus pengguna ini?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Pengguna dihapus');
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert('Gagal menghapus pengguna');
    }
  };

  return (
    <AdminLayout user={user}>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Manajemen Pengguna</h2>
          <button
            onClick={openAddModal}
            className="bg-green-600 hover:bg-green-700 text-black px-2 py-1 rounded text-lg font-bold"
          >
            + Tambah Pengguna
          </button>
        </div>

        <Modal
          title={editingId ? 'Edit Pengguna' : 'Tambah Pengguna'}
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <form onSubmit={handleSubmit} className="grid gap-4 mt-4">
            <input
              name="nik"
              placeholder="Username / NIK"
              className="border p-2 rounded"
              value={form.nik}
              onChange={handleChange}
              required
            />
            <input
              name="password"
              type="password"
              placeholder={editingId ? 'Kosongkan jika tidak diubah' : 'Password'}
              className="border p-2 rounded"
              value={form.password}
              onChange={handleChange}
              {...(!editingId && { required: true })}
            />
            <select
              name="level"
              className="border p-2 rounded"
              value={form.level}
              onChange={handleChange}
              required
            >
              <option value="default" disabled>Pilih Tingkatan</option>
              {levelOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>

            <input
              name="provinsi"
              placeholder="Provinsi"
              className="border p-2 rounded"
              value={form.provinsi}
              onChange={handleChange}
              required
            />
            <input
              name="kabupaten"
              placeholder="Kabupaten"
              className="border p-2 rounded"
              value={form.kabupaten}
              onChange={handleChange}
              required
            />
            <input
              name="kecamatan"
              placeholder="Kecamatan"
              className="border p-2 rounded"
              value={form.kecamatan}
              onChange={handleChange}
              required
            />
            <input
              name="kelurahan"
              placeholder="Kelurahan"
              className="border p-2 rounded"
              value={form.kelurahan}
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-black p-2 rounded"
            >
              {loading ? 'Menyimpan...' : 'Simpan'}
            </button>
          </form>
        </Modal>

        <table className="w-full border text-sm mt-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">No</th>
              <th className="border p-2">Username</th>
              <th className="border p-2">Tingkat</th>
              <th className="border p-2">Wilayah</th>
              <th className="border p-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={u.id}>
                <td className="border p-2 text-center">{i + 1}</td>
                <td className="border p-2">{u.nik}</td>
                <td className="border p-2 capitalize">{u.level}</td>
                <td className="border p-2">
                  {[u.provinsi, u.kabupaten, u.kecamatan, u.kelurahan].filter(Boolean).join(' - ')}
                </td>
                <td className="border p-2 text-center">
                  <button onClick={() => handleEdit(u)} className="text-blue-600 mr-2">Edit</button>
                  <button onClick={() => handleDelete(u.id)} className="text-red-600">Hapus</button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={5} className="border p-2 text-center text-gray-500">Belum ada data pengguna</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default UserManagement;
