import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Pendaftaran from './pages/Pendaftaran';
import DataAnggota from './pages/DataAnggota';
import Rekapitulasi from './pages/Rekapitulasi';
import Grafik from './pages/Grafik';
import UserManagement from './pages/UserManagement';
import RequireAuth from './components/RequireAuth';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/pendaftaran"
          element={
            <RequireAuth>
              <Pendaftaran />
            </RequireAuth>
          }
        />
        <Route
          path="/rekapitulasi"
          element={
            <RequireAuth>
              <Rekapitulasi />
            </RequireAuth>
          }
        />
        <Route
          path="/data-anggota"
          element={
            <RequireAuth>
              <DataAnggota />
            </RequireAuth>
          }
        />
        <Route
          path="/manajemen-pengguna"
          element={
            <RequireAuth>
              <UserManagement />
            </RequireAuth>
          }
        />
        <Route
          path="/grafik"
          element={
            <RequireAuth>
              <Grafik />
            </RequireAuth>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
