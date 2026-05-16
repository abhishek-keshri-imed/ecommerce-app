import {AiOutlineDashboard,AiOutlineShoppingCart,AiOutlineHeart,} from "react-icons/ai";
import { RiDiscountPercentLine } from "react-icons/ri";
import { BiCategory, BiLoaderCircle } from "react-icons/bi";
import { FiUsers, FiUser } from "react-icons/fi"; 
import { FiUserCheck } from "react-icons/fi";
import { MdPayment } from "react-icons/md";
import { BsChat } from "react-icons/bs";
import { MdProductionQuantityLimits } from "react-icons/md";
import { IoLogoWechat } from "react-icons/io5";
import { BiSolidDiscount } from "react-icons/bi";

export const allNav = [
  /* --- ADMIN ROUTES --- */
  {
    id: "A01",
    title: "Dashboard",
    icon: <AiOutlineDashboard />,
    role: "admin",
    path: "/admin/dashboard",
  },
  {
    id: "A02",
    title: "Orders",
    icon: <AiOutlineShoppingCart />,
    role: "admin",
    path: "/admin/orders",
  },
  {
    id: "A03",
    title: "Category",
    icon: <BiCategory />,
    role: "admin",
    path: "/admin/categories",
  },
  {
    id: "A04",
    title: "Sellers",
    icon: <FiUsers />,
    role: "admin",
    path: "/admin/sellers",
  },
  {
    id: "A05",
    title: "Payment Request",
    icon: <MdPayment />,
    role: "admin",
    path: "/admin/payment-request",
  },
  {
    id: "A06",
    title: "Deactive Sellers",
    icon: <FiUsers />,
    role: "admin",
    path: "/admin/deactive-sellers", // Removed /dashboard
  },
  {
    id: "A07",
    title: "Seller Request",
    icon: <FiUserCheck />,
    role: "admin",
    path: "/admin/sellers-request", // Removed /dashboard
  },
  {
    id: "A08",
    title: "Live Chat",
    icon: <BsChat />,
    role: "admin",
    path: "/admin/chat-sellers", // Removed /dashboard
  },
 

  /* --- SELLER ROUTES --- */
  {
    id: "S01",
    title: "Dashboard",
    icon: <AiOutlineDashboard />,
    role: "seller",
    path: "/seller/dashboard",
  },
  {
    id:  "S02",
    title: "All Product",
    icon: <MdProductionQuantityLimits />,
    role: "seller",
    path: "/seller/products",
  },
  {
    id:  "S03",
    title: "Add Product",
    icon: <BiLoaderCircle />,
    role: "seller",
    path: "/seller/add-product",
  },
  {
    id:  "S09",
    title: "Add Discount",
    icon: <BiSolidDiscount />,
    role: "seller",
    path: "/seller/add-discount",
  },
  {
    id:  "S04",
    title: "Discount Product",
    icon: <RiDiscountPercentLine />,
    role: "seller",
    path: "/seller/discount-product",
  },
  {
    id:  "S05",
    title: "Orders",
    icon: <AiOutlineShoppingCart />,
    role: "seller",
    path: "/seller/orders",
  },
  {
    id:  "S06",
    title: "Payment Request",
    icon: <MdPayment />,
    role: "seller",
    path: "/seller/payment",
  },
   {
    id:  "S07",
    title: "Chat-Customer",
    icon: <IoLogoWechat />,
    role: "seller",
    path: "/seller/chat-customer",
  },
{
    id:  "S08",
    title: "Chat-Support",
    icon: <IoLogoWechat />,
    role: "seller",
    path: "/seller/chat-support",
  },
  
  /* --- CUSTOMER ROUTES --- */
  {
    id: "C01",
    title: "Dashboard",
    icon: <AiOutlineDashboard />,
    role: "customer",
    path: "/customer/dashboard",
  },
  {
    id: "C02",
    title: "My Orders",
    icon: <AiOutlineShoppingCart />,
    role: "customer",
    path: "/customer/orders",
  },  
  {
    id: "C03",
    title: "Wishlist",
    icon: <AiOutlineHeart />,
    role: "customer",
    path: "/customer/wishlist",
  },
  {
    id: "C04",
    title: "Profile",
    icon: <FiUser />,
    role: "customer",
    path: "/customer/profile",
  },
];
