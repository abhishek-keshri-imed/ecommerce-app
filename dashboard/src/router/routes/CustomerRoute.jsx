import { lazy } from "react";

const MainLayout = lazy(() => import("../../layouts/MainLayout"));
const CustomerDashboard = lazy(() => import("../../views/customer/CustomerDashboard"));

// Add other customer views here as you create them
// const MyOrders = lazy(() => import("../../views/customer/MyOrders"));

export const customerRoutes = [
    {
        path: "customer",
        element: <MainLayout />, 
        role: 'customer',
        children: [
            {
                path: 'dashboard',
                element: <CustomerDashboard />,
                role: 'customer' // Fixed: was 'admin'
            },
            /* {
                path: 'orders',
                element: <MyOrders />,
                role: 'customer'
            } 
            */
        ]
    }
];