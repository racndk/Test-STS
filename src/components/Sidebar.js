import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar({ user }) {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <a href="/" className="brand-link text-center">
        <span className="brand-text font-weight-light">Organisasi X</span>
      </a>

      <div className="sidebar">
        <nav className="mt-2">
          <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu">
            <li className="nav-item">
                <Link to="/data-anggota" className="nav-link">
                    <i className="nav-icon fas fa-users"></i>
                    <p>Data Anggota</p>
                </Link>
            </li>
            <li className="nav-item">
                <Link to="/rekapitulasi" className="nav-link" >
                    <i className="fas fa-table" /> <span>Rekapitulasi</span>
                </Link>
            </li>
            <li className="nav-item">
                <Link to="/grafik" className="nav-link">
                    <i className="nav-icon fas fa-chart-line"></i>
                    <p>Grafik</p>
                </Link>
            </li>
            <li className="nav-item">
                <Link to="/pendaftaran" className="nav-link">
                    <i className="nav-icon fas fa-edit"></i>
                    <p>Pendaftaran</p>
                </Link>
            </li>
            {user.level === 'pusat' && (
              <li className="nav-item">
                <Link to="/manajemen-pengguna" className="nav-link">
                  <i className="nav-icon fas fa-user-cog"></i>
                  <p>Manajemen Pengguna</p>
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
