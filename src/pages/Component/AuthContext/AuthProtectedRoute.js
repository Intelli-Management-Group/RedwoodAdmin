// src/pages/Component/AuthContext/AuthProtectedRoute.js
import React from 'react';
import { useAuth } from './AuthContextComponents'
import { Navigate } from 'react-router-dom';
const AuthProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default AuthProtectedRoute;
