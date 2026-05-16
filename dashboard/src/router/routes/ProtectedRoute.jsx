import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../../components/Loader";

const ProtectedRoute = ({ route, children }) => {
    const { userInfo, role, loader } = useSelector((state) => state.auth);
    const token = localStorage.getItem("accessToken");

    // 🛡️ STEP 1: Auth Check
    if (!userInfo && !token) {
        return route.path.includes("admin") 
            ? <Navigate to="/admin-login" replace /> 
            : <Navigate to="/login" replace />;
    }

    // 🛡️ STEP 2: Role Check
    if (route.role) {
        const userRole = role?.toLowerCase();
        const requiredRole = route.role?.toLowerCase();

        if (userRole !== requiredRole) {
            return <Navigate to="/login" replace />;
        }
    }

    // 🛡️ STEP 3: The Stable Render
    return (
        <>
            {/* Overlay loader keeps children mounted to prevent API re-fetch loops */}
            {loader && <Loader />} 
            <Suspense fallback={<Loader />}>
                {children}
            </Suspense>
        </>
    );
};

export default ProtectedRoute; 