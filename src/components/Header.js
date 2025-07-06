import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light justify-content-end">
      <div className="nav-item dropdown mr-3">
        <FaUserCircle
          size={25}
          style={{ cursor: 'pointer' }}
          onClick={() => setShowDropdown(!showDropdown)}
        />
        {showDropdown && (
          <div className="dropdown-menu dropdown-menu-right show" style={{ position: 'absolute' }}>
            <button className="dropdown-item" onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Header;
