import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Initially null to indicate "loading"
  
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    setIsAuthenticated(authToken === 'true'); // Update state based on localStorage
  }, []);

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem('authToken', 'true');
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('authToken');
  };

  if (isAuthenticated === null) {
    // Show a loading spinner or placeholder while checking authentication
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
