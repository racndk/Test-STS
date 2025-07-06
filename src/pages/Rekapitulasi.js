import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../components/AdminLayout';
import { jwtDecode } from 'jwt-decode';

const levels = ['provinsi', 'kabupaten', 'kecamatan', 'kelurahan'];

function Rekapitulasi() {
  const token = localStorage.getItem('token');
  const user = jwtDecode(token);
  const [tingkat, setTingkat] = useState(user.level === 'pusat' ? 'provinsi' : user.level);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);

  const fetchTotal = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/rekapitulasi/count', {
        headers: { Authorization: `Bearer ${token}` },
        params: { tingkat },
      });
      setTotalData(res.data.total);
    } catch (err) {
      console.error('Gagal mengambil total:', err);
    }
  };

  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/rekapitulasi`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { tingkat, page },
      });
      setData(res.data);
      setIsLastPage(res.data.length < 5); 
    } catch (err) {
      console.error('Gagal fetch data:', err);
    }
  };  

    useEffect(() => {
        fetchData();
        fetchTotal();
    }, [tingkat, page]);

  const exportExcel = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/rekapitulasi/export`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { tingkat },
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `rekap-${tingkat}.xlsx`);
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error('Gagal ekspor Excel:', err);
    }
  };

  return (
    <AdminLayout user={user}>
      <div className="container">
        <h2>Rekapitulasi Anggota</h2>

        <div className="mb-3">
          <label htmlFor="tingkat">Tingkat:</label>
          <select
            id="tingkat"
            className="form-select w-auto d-inline-block ms-2"
            value={tingkat}
            onChange={(e) => {
              setTingkat(e.target.value);
              setPage(1);
            }}
          >
            {levels.map((lvl) => (
              <option key={lvl} value={lvl}>
                {lvl.charAt(0).toUpperCase() + lvl.slice(1)}
              </option>
            ))}
          </select>

          <button className="btn btn-success ms-3" onClick={exportExcel}>
            Export Excel
          </button>
        </div>

        <table className="table table-bordered">
          <thead>
            <tr>
              {tingkat !== 'kelurahan' ? (
                <>
                  <th>No</th>
                  <th>Nama {tingkat}</th>
                  <th>Total Anggota</th>
                </>
              ) : (
                <>
                  <th>Nama</th>
                  <th>NIK</th>
                  <th>No HP</th>
                  <th>Provinsi</th>
                  <th>Kabupaten</th>
                  <th>Kecamatan</th>
                  <th>Kelurahan</th>
                  <th>Tanggal Daftar</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => (
              <tr key={i}>
                {tingkat !== 'kelurahan' ? (
                  <>
                    <td>{(page - 1) * 5 + i + 1}</td>
                    <td>{item.nama}</td>
                    <td>{item.total}</td>
                  </>
                ) : (
                  <>
                    <td>{item.nama}</td>
                    <td>{item.no_ktp}</td>
                    <td>{item.no_hp}</td>
                    <td>{item.provinsi}</td>
                    <td>{item.kabupaten}</td>
                    <td>{item.kecamatan}</td>
                    <td>{item.kelurahan}</td>
                    <td>{new Date(item.created_at).toLocaleDateString()}</td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="d-flex justify-content-between align-items-center mt-3">
            <button
                className="btn btn-outline-primary"
                onClick={() => setPage((prev) => prev - 1)}
                disabled={page === 1}
            >
                Previous
            </button>

            <span className="mx-3">Halaman {page}</span>

            <button
                className="btn btn-outline-primary"
                onClick={() => setPage((prev) => prev + 1)}
                disabled={isLastPage}
            >
                Next
            </button>
        </div>

      </div>
    </AdminLayout>
  );
}

export default Rekapitulasi;
