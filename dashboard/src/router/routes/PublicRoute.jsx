// src/router/routes/PublicRoute.jsx
import { lazy } from "react";

// Lazy load pages
const Login = lazy(() => import("../../views/auth/Login"));
const Register = lazy(() => import("../../views/auth/Register"));
const AdminLogin= lazy(()=>import("./../../views/auth/AdminLogin") )  ;
const NotFound = lazy(() => import("../../views/NotFound"));


// Array of public routes
const PublicRoute = [
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  {path:  "/admin-login",element: <AdminLogin/>},
  {
        path: '*', // This asterisk matches everything else
        element: <NotFound />
    }
];

export default PublicRoute;
