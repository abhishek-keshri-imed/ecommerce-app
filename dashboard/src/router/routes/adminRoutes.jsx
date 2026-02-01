// src/router/routes/adminRoutes.js

import { lazy } from "react";

// CATEGORY: Path Fixes (3 levels up)
const MainLayout = lazy(() => import("../../layouts/MainLayout"));
const AdminDashboard = lazy(() => import("../../views/admin/AdminDashboard"));
const AdminOrder = lazy(() => import("../../views/admin/AdminOrder"));
const AdminCategory = lazy(() => import("../../views/admin/AdminCategory"));
const AdminSeller = lazy(() => import("../../views/admin/AdminSeller"));
const SellerDetails = lazy(() => import("../../views/admin/SellerDetails"));
const AdminPaymentsProcess = lazy(() => import("../../views/admin/AdminPaymentProcess"));
const PaymentHistory=lazy(()=>import("../../views/admin/PaymentHistory"))
const NotFound=lazy(()=>import("../../views/NotFound"))
const AdminDeactivateSellers =lazy(()=> import ("../../views/admin/AdminDeactivateSeller"))
const DeactiveSellerDetails = lazy(() => import("../../views/admin/DeactiveSellerDetails"));
const AdminPendingSellers =lazy(()=> import ("../../views/admin/AdminPendingSeller"))
const PendingSellerDetails = lazy(() => import("../../views/admin/PendingSellerDetails"));
const  AdminSellerChat= lazy(()=> import("../../views/admin/AdminLiveChat.jsx"));

export const adminRoutes = [
    {
        path: 'admin',
        element: <MainLayout />,
        role: 'admin',
        children: [
            { path: 'dashboard', element: <AdminDashboard />, role: 'admin' },
            { path: 'orders', element: <AdminOrder />, role: 'admin' },
            { path: 'categories', element: <AdminCategory />, role: 'admin' },
            { path: 'sellers', element: <AdminSeller />, role: 'admin' },
            { path: 'seller/details/:sellerId', element: <SellerDetails />, role: 'admin' },
            { path: 'payment-request', element: <AdminPaymentsProcess />, role: 'admin' },
            { path: 'dashboard/payment-history', element: <PaymentHistory />, role: 'admin' },
            { path: 'deactive-sellers', element: <AdminDeactivateSellers />, role: 'admin' },
            { path: 'deactive-sellers/details/:sellerId', element: <DeactiveSellerDetails />, role: 'admin' },
            { path: 'sellers-request', element: <AdminPendingSellers />, role: 'admin' },
            { path: 'sellers-request/details/:sellerId', element: <PendingSellerDetails />, role: 'admin' },
            { path: 'chat-sellers', element: <AdminSellerChat />, role: 'admin' },
            /* --- CATCH-ALL FOR ADMIN SUB-ROUTES --- */
            { 
                path: '*', 
                element: <NotFound /> 
            }
        ]
    }
];