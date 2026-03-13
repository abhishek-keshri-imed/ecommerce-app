import { lazy } from "react";
const SellerDashboard = lazy(() =>import("../../views/seller/SellerDashboard"));
const SellerAddProduct=lazy(() => import("../../views/seller/SellerAddProduct"));
const MainLayout = lazy(() => import("../../layouts/MainLayout"));

export const sellerRoutes = [
  {
    path: "seller",
    element: <MainLayout />,
    role: "seller",
    children: [
      {
        path: "/seller/dashboard",
        element: <SellerDashboard />,
        role: "role",
      },
      {
        path: "/seller/add-product",
        element: <SellerAddProduct />,
        role: "role",
      },
    ],
  },
];
