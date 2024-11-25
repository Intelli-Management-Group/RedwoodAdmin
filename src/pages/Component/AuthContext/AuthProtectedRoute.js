// src/pages/Component/AuthContext/AuthProtectedRoute.js
import React from 'react';
import { useAuth } from './AuthContextComponents';
import { Navigate } from 'react-router-dom';

const AuthProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === null) {
    // While authentication is being determined, show a loading spinner or placeholder
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default AuthProtectedRoute;
