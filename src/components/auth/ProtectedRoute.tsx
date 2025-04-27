import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login page with the current location for redirect after login
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;
