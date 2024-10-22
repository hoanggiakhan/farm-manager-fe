import React, { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from './Auth';
import { isToken } from './JwtService';


const PrivateRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const isAuthenticated = isToken();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
