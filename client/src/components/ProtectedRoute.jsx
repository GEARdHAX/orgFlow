import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../lib/authStore';

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuthStore();

  // Still verifying session; don't redirect yet
  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-gray-200">
        Checking session...
      </div>
    );
  }

  // After loading, if not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Authenticated → Allow access
  return <Outlet />;
};

export default ProtectedRoute;
