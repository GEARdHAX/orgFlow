import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../lib/authStore';

const PublicOnlyRoute = () => {
  const { isAuthenticated, isLoading } = useAuthStore();

  // 1. Wait for session check to finish
  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-gray-200">
        Checking session...
      </div>
    );
  }

  // 2. If ALREADY authenticated, redirect away from login (to Home "/")
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // 3. If not authenticated, allow them to see the Login page
  return <Outlet />;
};

export default PublicOnlyRoute;