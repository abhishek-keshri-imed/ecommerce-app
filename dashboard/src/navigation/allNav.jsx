import {AiOutlineDashboard,AiOutlineShoppingCart,AiOutlineHeart,} from "react-icons/ai";
import { BiCategory, BiLoaderCircle } from "react-icons/bi";
import { FiUsers, FiUser } from "react-icons/fi"; // Corrected import
import { MdPayment } from "react-icons/md";
import { BsChat } from "react-icons/bs";

export const allNav = [
  /* --- ADMIN ROUTES --- */
  {
    id: 1,
    title: "Dashboard",
    icon: <AiOutlineDashboard />,
    role: "admin",
    path: "/admin/dashboard",
  },
  {
    id: 2,
    title: "Orders",
    icon: <AiOutlineShoppingCart />,
    role: "admin",
    path: "/admin/orders",
  },
  {
    id: 3,
    title: "Category",
    icon: <BiCategory />,
    role: "admin",
    path: "/admin/categories",
  },
  {
    id: 4,
    title: "Sellers",
    icon: <FiUsers />,
    role: "admin",
    path: "/admin/sellers",
  },
  {
    id: 5,
    title: "Payment Request",
    icon: <MdPayment />,
    role: "admin",
    path: "/admin/payment-request",
  },
  {
    id: 6,
    title: "Deactive Sellers",
    icon: <FiUsers />,
    role: "admin",
    path: "/admin/deactive-sellers", // Removed /dashboard
  },
  {
    id: 7,
    title: "Seller Request",
    icon: <BiLoaderCircle />,
    role: "admin",
    path: "/admin/sellers-request", // Removed /dashboard
  },
  {
    id: 8,
    title: "Live Chat",
    icon: <BsChat />,
    role: "admin",
    path: "/admin/chat-sellers", // Removed /dashboard
  },
  /* --- SELLER ROUTES --- */
  {
    id: 9,
    title: "Dashboard",
    icon: <AiOutlineDashboard />,
    role: "seller",
    path: "/seller/dashboard",
  },
  {
    id: 10,
    title: "Add Product",
    icon: <BiLoaderCircle />,
    role: "seller",
    path: "/seller/dashboard/add-product",
  },
  {
    id: 11,
    title: "Orders",
    icon: <AiOutlineShoppingCart />,
    role: "seller",
    path: "/seller/dashboard/orders",
  },

  /* --- CUSTOMER ROUTES --- */
  {
    id: 12,
    title: "Dashboard",
    icon: <AiOutlineDashboard />,
    role: "customer",
    path: "/customer/dashboard",
  },
  {
    id: 13,
    title: "My Orders",
    icon: <AiOutlineShoppingCart />,
    role: "customer",
    path: "/customer/orders",
  },
  {
    id: 14,
    title: "Wishlist",
    icon: <AiOutlineHeart />,
    role: "customer",
    path: "/customer/wishlist",
  },
  {
    id: 15,
    title: "Profile",
    icon: <FiUser />,
    role: "customer",
    path: "/customer/profile",
  },
];
