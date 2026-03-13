import {AiOutlineDashboard,AiOutlineShoppingCart,AiOutlineHeart,} from "react-icons/ai";
import { RiDiscountPercentLine } from "react-icons/ri";
import { BiCategory, BiLoaderCircle } from "react-icons/bi";
import { FiUsers, FiUser } from "react-icons/fi"; // Corrected import
import { MdPayment } from "react-icons/md";
import { BsChat } from "react-icons/bs";
import { MdProductionQuantityLimits } from "react-icons/md";
import { IoLogoWechat } from "react-icons/io5";

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
    title: "All Product",
    icon: <MdProductionQuantityLimits />,
    role: "seller",
    path: "/seller/products",
  },
  {
    id: 11,
    title: "Add Product",
    icon: <BiLoaderCircle />,
    role: "seller",
    path: "/seller/add-product",
  },
  {
    id: 12,
    title: "Discount Product",
    icon: <RiDiscountPercentLine />,
    role: "seller",
    path: "/seller/discount-product",
  },
  {
    id: 13,
    title: "Orders",
    icon: <AiOutlineShoppingCart />,
    role: "seller",
    path: "/seller/orders",
  },
  {
    id: 14,
    title: "Payment Request",
    icon: <MdPayment />,
    role: "seller",
    path: "/seller/payment",
  },
   {
    id: 15,
    title: "Chat-Customer",
    icon: <IoLogoWechat />,
    role: "seller",
    path: "/seller/chat-customer",
  },
{
    id: 16,
    title: "Chat-Support",
    icon: <IoLogoWechat />,
    role: "seller",
    path: "/seller/chat-support",
  },




  /* --- CUSTOMER ROUTES --- */
  {
    id: 17,
    title: "Dashboard",
    icon: <AiOutlineDashboard />,
    role: "customer",
    path: "/customer/dashboard",
  },
  {
    id: 17,
    title: "My Orders",
    icon: <AiOutlineShoppingCart />,
    role: "customer",
    path: "/customer/orders",
  },
  {
    id: 19,
    title: "Wishlist",
    icon: <AiOutlineHeart />,
    role: "customer",
    path: "/customer/wishlist",
  },
  {
    id: 20,
    title: "Profile",
    icon: <FiUser />,
    role: "customer",
    path: "/customer/profile",
  },
];
