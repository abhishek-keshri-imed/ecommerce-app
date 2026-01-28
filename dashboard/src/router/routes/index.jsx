import { adminRoutes } from "./adminRoutes";
import { customerRoutes } from "./CustomerRoute";
import { sellerRoutes } from "./SellerRoute";
import PrivateRoute from "./PrivateRoute";
import ProtectedRoute from "./ProtectedRoute";

export const getRoutes = () => {
  // 1. Combine all role-based and general private routes
  const allProtectedRoutes = [
    ...adminRoutes,
    ...customerRoutes,
    ...sellerRoutes,
    ...PrivateRoute,
  ];

  // 2. Apply the HOC (Higher Order Component) guard to each route
  return allProtectedRoutes.map((r) => {
    return {
      ...r,
      element: <ProtectedRoute route={r}>{r.element}</ProtectedRoute>,
    };
  });
};
