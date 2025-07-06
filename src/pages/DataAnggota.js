import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../components/AdminLayout';
import { jwtDecode } from 'jwt-decode';
import './DataAnggota.css';

function DataAnggota() {
  const token = localStorage.getItem('token');
  const user = jwtDecode(token);

  const [anggota, setAnggota] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchAnggota = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/anggota', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAnggota(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAnggota();
  }, [token]);

  const totalPages = Math.ceil(anggota.length / itemsPerPage);

  const currentData = anggota.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  return (
    <AdminLayout user={user}>
      <h2>Data Anggota</h2>
      <table className="table">
        <thead>
          <tr>
            <th>No</th><th>No KTP</th><th>Nama</th><th>No HP</th><th>Provinsi</th>
            <th>Kabupaten</th><th>Kecamatan</th><th>Kelurahan</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((a, i) => (
            <tr key={a.id}>
              <td>{(currentPage - 1) * itemsPerPage + i + 1}</td>
              <td>{a.no_ktp}</td>
              <td>{a.nama}</td>
              <td>{a.no_hp}</td>
              <td>{a.provinsi}</td>
              <td>{a.kabupaten}</td>
              <td>{a.kecamatan}</td>
              <td>{a.kelurahan}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={handlePrev} disabled={currentPage === 1}>
          &laquo; Prev
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Next &raquo;
        </button>
      </div>
    </AdminLayout>
  );
}

export default DataAnggota;
