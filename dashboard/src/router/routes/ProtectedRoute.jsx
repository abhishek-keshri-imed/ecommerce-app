import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../../components/Loader"; // Import your new loader

const ProtectedRoute = ({ route, children }) => {
  const { userInfo, role, loader } = useSelector((state) => state.auth);
  const token = localStorage.getItem("accessToken");

  // If Redux is still loading the login action, show the loader
  // instead of redirecting back to login
  if (loader) {
    return <Loader />;
  }

  // 1. Check if user is logged in
  if (!userInfo && !token) {
    // If trying to access admin area, send to admin login, otherwise general login
    return route.path.includes("admin") ? (
      <Navigate to="/admin-login" replace />
    ) : (
      <Navigate to="/login" replace />
    );
  }
  // 2. Check if user has the correct role
  if (route.role) {
    // Force both to lowercase to avoid "Seller" vs "seller" issues
    const userRole = role?.toLowerCase();
    const requiredRole = route.role?.toLowerCase();

    if (userRole !== requiredRole) {
      console.log(
        `Access Denied: User role (${userRole}) does not match required role (${requiredRole})`
      );
      return <Navigate to="/login" replace />;
    }
  }

  return <Suspense fallback={<Loader />}>{children}</Suspense>;
};

export default ProtectedRoute;
