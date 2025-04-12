// src/components/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

// Check for token in localStorage
const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token'); // 🔧 match this to what you save

  return token ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
