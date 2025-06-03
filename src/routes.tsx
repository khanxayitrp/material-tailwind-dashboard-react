import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
  DocumentChartBarIcon, // Added DocumentChartBarIcon
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import OrdersManagement from "@/pages/dashboard/orders-management";
import ProductManagement from "@/pages/dashboard/product-management";
import ClaimManagement from "@/pages/dashboard/claim-management";
import CouponManagement from "@/pages/dashboard/coupon-management";
import CampaignManagement from "@/pages/dashboard/campaign-management";
import InventoryItems from "@/pages/dashboard/inventory-items";
import NotificationManagement from "@/pages/dashboard/notification-management";
import PaymentCollection from "@/pages/dashboard/payment-collection";
import RefundReason from "@/pages/dashboard/refund-reason";
import ProductCategories from "@/pages/dashboard/product-categories";
import StoreManagement from "@/pages/dashboard/store-management";
import CustomerGroup from "@/pages/dashboard/customer-group";
import Currencies from "@/pages/dashboard/currencies";
import ProductAdd from "@/pages/dashboard/product-add";
import ProductEdit from "@/pages/dashboard/product-edit";
import ProductDetail from "@/pages/dashboard/product-detail";
import type { ReactNode, JSX } from 'react'; // Import ReactNode and JSX

// Define interfaces for the route structures
interface PageRoute {
  icon: JSX.Element; // The icons are JSX elements e.g. <HomeIcon ... />
  name: string;
  path: string;
  element: ReactNode; // Components like <Home /> are ReactNode or JSX.Element
}

interface RouteGroup {
  layout: string;
  pages: PageRoute[];
  title?: string; // title is optional
}

const icon = { // This object is spread onto Heroicon components
  className: "w-5 h-5 text-inherit",
};

// Apply the RouteGroup[] type to the routes array
export const routes: RouteGroup[] = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "tables",
        path: "/tables",
        element: <Tables />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "notifications",
        path: "/notifications",
        element: <Notifications />,
      },
      {
        icon: <DocumentChartBarIcon {...icon} />,
        name: "Orders Management",
        path: "/orders-management",
        element: <OrdersManagement />,
      },
      {
        icon: <DocumentChartBarIcon {...icon} />,
        name: "Product Management",
        path: "/product-management",
        element: <ProductManagement />,
      },
      {
        icon: <DocumentChartBarIcon {...icon} />,
        name: "Claim Management",
        path: "/claim-management",
        element: <ClaimManagement />,
      },
      {
        icon: <DocumentChartBarIcon {...icon} />,
        name: "Coupon Management",
        path: "/coupon-management",
        element: <CouponManagement />,
      },
      {
        icon: <DocumentChartBarIcon {...icon} />,
        name: "Campaign Management",
        path: "/campaign-management",
        element: <CampaignManagement />,
      },
      {
        icon: <DocumentChartBarIcon {...icon} />,
        name: "Inventory Items",
        path: "/inventory-items",
        element: <InventoryItems />,
      },
      {
        icon: <DocumentChartBarIcon {...icon} />,
        name: "Notification Management",
        path: "/notification-management",
        element: <NotificationManagement />,
      },
      {
        icon: <DocumentChartBarIcon {...icon} />,
        name: "Payment Collection",
        path: "/payment-collection",
        element: <PaymentCollection />,
      },
      {
        icon: <DocumentChartBarIcon {...icon} />,
        name: "Refund Reason",
        path: "/refund-reason",
        element: <RefundReason />,
      },
      {
        icon: <DocumentChartBarIcon {...icon} />,
        name: "Product Categories",
        path: "/product-categories",
        element: <ProductCategories />,
      },
      {
        icon: <DocumentChartBarIcon {...icon} />,
        name: "Store Management",
        path: "/store-management",
        element: <StoreManagement />,
      },
      {
        icon: <DocumentChartBarIcon {...icon} />,
        name: "Customer Group",
        path: "/customer-group",
        element: <CustomerGroup />,
      },
      {
        icon: <DocumentChartBarIcon {...icon} />,
        name: "Currencies",
        path: "/currencies",
        element: <Currencies />,
      },
      {
        icon: <DocumentChartBarIcon {...icon} />, // Placeholder icon
        name: "Add Product",
        path: "/product/add",
        element: <ProductAdd />,
      },
      {
        icon: <DocumentChartBarIcon {...icon} />, // Placeholder icon
        name: "Edit Product",
        path: "/product/edit/:productId",
        element: <ProductEdit />,
      },
      {
        icon: <DocumentChartBarIcon {...icon} />, // Placeholder icon
        name: "Product Details",
        path: "/product/detail/:productId",
        element: <ProductDetail />,
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;
