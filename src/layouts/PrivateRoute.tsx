import { useAuthStore } from '@/store/auth-person.store';
import { Navigate, Outlet } from 'react-router-dom';
import React from 'react';

export const PrivateRoute: React.FC = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated()); 

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};