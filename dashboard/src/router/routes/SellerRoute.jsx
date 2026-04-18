import { lazy } from "react";
const SellerDashboard = lazy(() =>import("../../views/seller/SellerDashboard"));
const SellerAddProduct=lazy(() => import("../../views/seller/SellerAddProduct"));
const MainLayout = lazy(() => import("../../layouts/MainLayout"));
const SellerProduct = lazy(() => import("../../views/seller/SellerProduct"));
const SellerDiscount = lazy(() => import("../../views/seller/SellerDiscount"));
const SellerAddDiscount = lazy(() => import("../../views/seller/SellerAddDiscount"));
const Sellerorder = lazy(() => import("../../views/seller/Sellerorder"));

export const sellerRoutes = [
  {
    path: "seller",
    element: <MainLayout />,
    role: "seller",
    children: [
      {
        path: "/seller/dashboard",
        element: <SellerDashboard />,
        role: "seller",
      },
       {
        path: "/seller/products",
        element: <SellerProduct />,
        role: "seller",
      },
      {
        path: "/seller/add-product",
        element: <SellerAddProduct />,
        role: "seller",
      },
      {
        path: "/seller/discount-product",
        element: <SellerDiscount />,
        role: "seller",
      },
      {
        path: "/seller/add-discount",
        element: <SellerAddDiscount />,
        role: "seller",
      },
      {
        path: "/seller/orders",
        element: <Sellerorder />,
        role: "seller",
      },
    ],
  },
];
