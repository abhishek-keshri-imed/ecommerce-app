import { lazy } from "react";

const Home = lazy(() => import("../../views/pages/Home"));
const Profile = lazy(() => import("../../views/pages/Profile"));
const Cart = lazy(() => import("../../views/pages/Cart"));
const Checkout = lazy(() => import("../../views/pages/Checkout"));

const PrivateRoute = [
  { path: "/", element: <Home /> }, // No role means any logged-in user can see it
  { path: "/profile", element: <Profile />, role: "customer" },
  { path: "/cart", element: <Cart />, role: "customer" },
  { path: "/checkout", element: <Checkout />, role: "customer" },
];

export default PrivateRoute;