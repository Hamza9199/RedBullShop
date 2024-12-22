import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const isLoggedIn = JSON.parse(localStorage.getItem("korisnik") || 'null') || {};

  if(isLoggedIn.accessToken === undefined || isLoggedIn.accessToken === null) {
    return <Navigate to="/login" />;
  }

  if (!isLoggedIn.accessToken || !isLoggedIn) {
    return <Navigate to="/login" />;
  }
  else {
    return element;
  }

};

export default ProtectedRoute;