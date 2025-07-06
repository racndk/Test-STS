import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const RequireAuth = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/" replace />;
  }

  try {
    jwtDecode(token); 
    return children;
  } catch (err) {
    return <Navigate to="/" replace />;
  }
};

export default RequireAuth;
