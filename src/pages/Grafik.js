import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../components/AdminLayout';
import { jwtDecode } from 'jwt-decode';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

function Grafik() {
  const token = localStorage.getItem('token');
  const user = jwtDecode(token);
  const [chartData, setChartData] = useState([]);
  const [totalToday, setTotalToday] = useState(0);
  const [totalAll, setTotalAll] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [grafikRes, todayRes, totalRes] = await Promise.all([
        axios.get('http://localhost:5000/api/grafik', {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get('http://localhost:5000/api/grafik/today', {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get('http://localhost:5000/api/grafik/total', {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setChartData(grafikRes.data);
      setTotalToday(todayRes.data.total);
      setTotalAll(totalRes.data.total);
    } catch (err) {
      console.error('Gagal mengambil data grafik:', err);
    }
  };

  return (
    <AdminLayout user={user}>
      <div className="container">
        <h2>Grafik Pendaftaran Anggota</h2>

        <div className="row mb-4">
          <div className="col-md-6">
            <div className="card text-white bg-info mb-3">
              <div className="card-body">
                <h5 className="card-title">Total Pendaftaran Hari Ini</h5>
                <p className="card-text fs-3">{totalToday}</p>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card text-white bg-success mb-3">
              <div className="card-body">
                <h5 className="card-title">Total Anggota Terdaftar</h5>
                <p className="card-text fs-3">{totalAll}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">Grafik Pendaftaran per 5 Menit (30 Menit Terakhir)</div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#007bff" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default Grafik;
