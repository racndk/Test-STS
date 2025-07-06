import React from 'react';
import { jwtDecode } from 'jwt-decode';
import AdminLayout from '../components/AdminLayout';

function Dashboard() {
  const token = localStorage.getItem('token');
  if (!token) return <p>Unauthorized</p>;

  const user = jwtDecode(token);

  return (
    <AdminLayout user={user}>
      <h1>Dashboard</h1>
      <p>Selamat datang, {user.nik} (Level: {user.level})</p>
    </AdminLayout>
  );
}

export default Dashboard;
