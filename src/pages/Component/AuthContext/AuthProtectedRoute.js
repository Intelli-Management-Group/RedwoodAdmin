// src/pages/Component/AuthContext/AuthProtectedRoute.js
import React from 'react';
import { useAuth } from './AuthContextComponents'
const AuthProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : children; // <Navigate to="/" />
};

export default AuthProtectedRoute;
