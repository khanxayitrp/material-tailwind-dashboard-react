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
import { BrandManagement, BrandAdd, BrandEdit, CampaignAdd, CampaignEdit } from "@/pages"; // Import Brand & Campaign pages
import OrdersManagement from "@/pages/orders-management";
import ProductManagement from "@/pages/product-management";
import ClaimManagement from "@/pages/claim-management";
import CouponManagement from "@/pages/coupon-management";
import CampaignManagement from "@/pages/campaign-management";
import InventoryItems from "@/pages/inventory-items";
import NotificationManagement from "@/pages/notification-management";
import PaymentCollection from "@/pages/payment-collection";
import RefundReason from "@/pages/refund-reason";
import ProductCategories from "@/pages/product-categories";
import StoreManagement from "@/pages/store-management";
import OrderAdd from "@/pages/order-add"; // Import OrderAdd
import OrderEdit from "@/pages/order-edit"; // Import OrderEdit
import OrderDetail from "@/pages/order-detail"; // Import OrderDetail
import ProductCategoryAdd from "@/pages/product-category-add"; // Import ProductCategoryAdd
import ProductCategoryEdit from "@/pages/product-category-edit"; // Import ProductCategoryEdit
import ProductCategoryDetail from "@/pages/product-category-detail"; // Import ProductCategoryDetail
import StoreAdd from "@/pages/store-add"; // Import StoreAdd
import StoreEdit from "@/pages/store-edit"; // Import StoreEdit
import CustomerGroup from "@/pages/customer-group";
import Currencies from "@/pages/currencies";
import ProductAdd from "@/pages/product-add";
import ProductEdit from "@/pages/product-edit";
import ProductDetail from "@/pages/product-detail";
import type { ReactNode, JSX } from 'react'; // Import ReactNode and JSX

// Define interfaces for the route structures
interface PageRoute {
  icon: JSX.Element; // The icons are JSX elements e.g. <HomeIcon ... />
  name: string;
  path: string;
  element: ReactNode; // Components like <Home /> are ReactNode or JSX.Element
  subRoutes?: PageRoute[]; // Add this for nested routes
  hidden?: boolean; // Optional property to hide the route
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
        // subRoutes: [
        //   {
        //     icon: <DocumentChartBarIcon {...icon} />,
        //     name: "Add Product",
        //     path: "/product/add",
        //     element: <ProductAdd />,
        //   },
        //   {
        //     icon: <DocumentChartBarIcon {...icon} />,
        //     name: "Edit Product",
        //     path: "/product/edit/:productId",
        //     element: <ProductEdit />,
        //   },
        //   {
        //     icon: <DocumentChartBarIcon {...icon} />,
        //     name: "Product Details",
        //     path: "/product/detail/:productId",
        //     element: <ProductDetail />,
        //   },
        // ]
      },
      {
        icon: <DocumentChartBarIcon {...icon} />,
        name: "Campaign Management",
        path: "/campaigns", // Corrected path
        element: <CampaignManagement />,
      },
      {
        icon: <DocumentChartBarIcon {...icon} />, // Placeholder icon
        name: "Add Campaign",
        path: "/campaigns/add",
        element: <CampaignAdd />,
        hidden: true,
      },
      {
        icon: <DocumentChartBarIcon {...icon} />, // Placeholder icon
        name: "Edit Campaign",
        path: "/campaigns/edit/:id",
        element: <CampaignEdit />,
        hidden: true,
      },
      // {
      //   icon: <DocumentChartBarIcon {...icon} />,
      //   name: "Claim Management",
      //   path: "/claim-management",
      //   element: <ClaimManagement />,
      // },
      // {
      //   icon: <DocumentChartBarIcon {...icon} />,
      //   name: "Coupon Management",
      //   path: "/coupon-management",
      //   element: <CouponManagement />,
      // },
      {
        icon: <DocumentChartBarIcon {...icon} />,
        name: "Inventory Items",
        path: "/inventory-items",
        element: <InventoryItems />,
      },
      {
        icon: <DocumentChartBarIcon {...icon} />,
        name: "Payment Collection",
        path: "/payment-collection",
        element: <PaymentCollection />,
      },
      // {
      //   icon: <DocumentChartBarIcon {...icon} />,
      //   name: "Refund Reason",
      //   path: "/refund-reason",
      //   element: <RefundReason />,
      // },
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
      // {
      //   icon: <DocumentChartBarIcon {...icon} />,
      //   name: "Customer Group",
      //   path: "/customer-group",
      //   element: <CustomerGroup />,
      // },
      // {
      //   icon: <DocumentChartBarIcon {...icon} />,
      //   name: "Currencies",
      //   path: "/currencies",
      //   element: <Currencies />,
      // },
      {
        icon: <DocumentChartBarIcon {...icon} />, // Placeholder icon
        name: "Add Product",
        path: "/product/add",
        element: <ProductAdd />,
        hidden: true, // Hide this route from the main navigation
      },
      {
        icon: <DocumentChartBarIcon {...icon} />, // Placeholder icon
        name: "Edit Product",
        path: "/product/edit/:productId",
        element: <ProductEdit />,
        hidden: true, // Hide this route from the main navigation
      },
      {
        icon: <DocumentChartBarIcon {...icon} />, // Placeholder icon
        name: "Product Details",
        path: "/product/detail/:productId",
        element: <ProductDetail />,
        hidden: true, // Hide this route from the main navigation
      },
      {
        icon: <DocumentChartBarIcon {...icon} />,
        name: "Brand Management",
        path: "/brands",
        element: <BrandManagement />,
      },
      {
        icon: <DocumentChartBarIcon {...icon} />, // Placeholder icon, won't be shown in sidebar
        name: "Add Brand",
        path: "/brands/add",
        element: <BrandAdd />,
        hidden: true,
      },
      {
        icon: <DocumentChartBarIcon {...icon} />, // Placeholder icon, won't be shown in sidebar
        name: "Edit Brand",
        path: "/brands/edit/:id",
        element: <BrandEdit />,
        hidden: true,
      },
      {
        icon: <DocumentChartBarIcon {...icon} />, // Or a more appropriate icon
        name: "Add Order", // This name is for internal reference or if not hidden
        path: "/orders/add", // Consistent with how product/add is structured
        element: <OrderAdd />,
        hidden: true, // To hide it from the sidebar navigation
      },
      {
        icon: <DocumentChartBarIcon {...icon} />, // Placeholder icon
        name: "Edit Order",
        path: "/orders/edit/:orderId", // Using :orderId as a URL parameter
        element: <OrderEdit />,
        hidden: true,
      },
      {
        icon: <DocumentChartBarIcon {...icon} />, // Placeholder icon
        name: "Order Details",
        path: "/orders/detail/:orderId", // Using :orderId as a URL parameter
        element: <OrderDetail />,
        hidden: true,
      },
      {
        icon: <DocumentChartBarIcon {...icon} />, // Or a more appropriate icon
        name: "Add Product Category",
        path: "/product-categories/add",
        element: <ProductCategoryAdd />,
        hidden: true,
      },
      {
        icon: <DocumentChartBarIcon {...icon} />,
        name: "Edit Product Category",
        path: "/product-categories/edit/:categoryId",
        element: <ProductCategoryEdit />,
        hidden: true,
      },
      {
        icon: <DocumentChartBarIcon {...icon} />,
        name: "Product Category Details",
        path: "/product-categories/detail/:categoryId",
        element: <ProductCategoryDetail />,
        hidden: true,
      },
      {
        icon: <DocumentChartBarIcon {...icon} />, // Or a more appropriate icon
        name: "Add Store",
        path: "/stores/add",
        element: <StoreAdd />,
        hidden: true,
      },
      {
        icon: <DocumentChartBarIcon {...icon} />,
        name: "Edit Store",
        path: "/stores/edit/:storeId",
        element: <StoreEdit />,
        hidden: true,
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
