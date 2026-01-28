// src/router/routes/AppRoutes.jsx
import PublicRoute from "./PublicRoute";
import { getRoutes } from "./index"; // This gets adminRoutes + PrivateRoute wrapped in ProtectedRoute

const protectedRoutes = getRoutes();

const AppRoutes = [
  ...PublicRoute,
  ...protectedRoutes
];

export default AppRoutes;