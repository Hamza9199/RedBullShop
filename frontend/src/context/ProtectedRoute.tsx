import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const isLoggedIn = localStorage.getItem('isAuthenticated');

  if (isLoggedIn === null) {
    return <Navigate to="/login" />;
  }
  else {
    return element;
  }

};

export default ProtectedRoute;