import { lazy } from "react";
const SellerDashboard = lazy(() =>import("../../views/seller/SellerDashboard"));
const SellerAddProduct=lazy(() => import("../../views/seller/SellerAddProduct"));
const MainLayout = lazy(() => import("../../layouts/MainLayout"));
const SellerProduct = lazy(() => import("../../views/seller/SellerProduct"));
const SellerDiscount = lazy(() => import("../../views/seller/SellerDiscount"));
const SellerAddDiscount = lazy(() => import("../../views/seller/SellerAddDiscount"));
const Sellerorder = lazy(() => import("../../views/seller/Sellerorder"));
const SellerPayment = lazy(() => import("../../views/seller/SellerPayment"));
const SellerChatCustomer = lazy(() => import("../../views/seller/SellerChatCustomer"));
const SellerChatSupport = lazy(() => import("../../views/seller/SellerChatSupport"));
const SellerProfile = lazy(() => import("../../views/seller/SellerProfile"));
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
      {
        path: "/seller/payment",
        element: <SellerPayment />,
        role: "seller",
      },
      {
        path: "/seller/chat-customer",
        element: <SellerChatCustomer />,
        role: "seller",
      },
      {
        path: "/seller/chat-support",
        element: <SellerChatSupport />,
        role: "seller",
      },
      {
        path: "/seller/profile",
        element: <SellerProfile />,
        role: "seller",
      }
    ],
  },
];
