import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
  DocumentChartBarIcon,
  CurrencyDollarIcon,
  CreditCardIcon,
  ArchiveBoxIcon,
  TicketIcon,
  ExclamationTriangleIcon, // Added ExclamationTriangleIcon
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import { BrandManagement, BrandAdd, BrandEdit, CampaignAdd, CampaignEdit, RefundReasonManagement, RefundReasonAdd, RefundReasonEdit, PaymentCollectionManagement, PaymentCollectionAdd, PaymentCollectionEdit, InventoryItemsManagement, InventoryItemAdd, InventoryItemEdit, CouponManagement, CouponAdd, CouponEdit, ClaimManagement, ClaimAdd, ClaimEdit } from "@/pages"; // Import all necessary pages
import OrdersManagement from "@/pages/orders-management";
import ProductManagement from "@/pages/product-management";
// import ClaimManagement from "@/pages/claim-management"; // Old one, replaced by Management component with same name
// import CouponManagement from "@/pages/coupon-management"; // Old one, replaced by Management component with same name
import CampaignManagement from "@/pages/campaign-management";
// import InventoryItems from "@/pages/inventory-items"; // Old one, replaced by Management
import NotificationManagement from "@/pages/notification-management";
// import PaymentCollection from "@/pages/payment-collection"; // Old one, replaced by Management
import RefundReason from "@/pages/refund-reason"; // This seems to be an old page component, ensure it's not confused with RefundReasonManagement
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
      {
        icon: <ExclamationTriangleIcon {...icon} />,
        name: "Claim Management",
        path: "/claims",
        element: <ClaimManagement />,
      },
      {
        icon: <ExclamationTriangleIcon {...icon} />,
        name: "Add Claim",
        path: "/claims/add",
        element: <ClaimAdd />,
        hidden: true,
      },
      {
        icon: <ExclamationTriangleIcon {...icon} />,
        name: "Edit Claim",
        path: "/claims/edit/:id",
        element: <ClaimEdit />,
        hidden: true,
      },
      {
        icon: <TicketIcon {...icon} />,
        name: "Coupon Management",
        path: "/coupons", // Standardized path
        element: <CouponManagement />,
      },
      {
        icon: <TicketIcon {...icon} />, // Placeholder icon
        name: "Add Coupon",
        path: "/coupons/add",
        element: <CouponAdd />,
        hidden: true,
      },
      {
        icon: <TicketIcon {...icon} />, // Placeholder icon
        name: "Edit Coupon",
        path: "/coupons/edit/:id",
        element: <CouponEdit />,
        hidden: true,
      },
      {
        icon: <ArchiveBoxIcon {...icon} />,
        name: "Inventory Items",
        path: "/inventory-items",
        element: <InventoryItemsManagement />,
      },
      {
        icon: <ArchiveBoxIcon {...icon} />, // Placeholder icon
        name: "Add Inventory Item",
        path: "/inventory-items/add",
        element: <InventoryItemAdd />,
        hidden: true,
      },
      {
        icon: <ArchiveBoxIcon {...icon} />, // Placeholder icon
        name: "Edit Inventory Item",
        path: "/inventory-items/edit/:id",
        element: <InventoryItemEdit />,
        hidden: true,
      },
      {
        icon: <CreditCardIcon {...icon} />,
        name: "Payment Collections",
        path: "/payment-collections", // Standardized path
        element: <PaymentCollectionManagement />,
      },
      {
        icon: <CreditCardIcon {...icon} />, // Placeholder icon
        name: "Add Payment Collection",
        path: "/payment-collections/add",
        element: <PaymentCollectionAdd />,
        hidden: true,
      },
      {
        icon: <CreditCardIcon {...icon} />, // Placeholder icon
        name: "Edit Payment Collection",
        path: "/payment-collections/edit/:id",
        element: <PaymentCollectionEdit />,
        hidden: true,
      },
      {
        icon: <CurrencyDollarIcon {...icon} />,
        name: "Refund Reasons",
        path: "/refund-reasons",
        element: <RefundReasonManagement />,
      },
      {
        icon: <CurrencyDollarIcon {...icon} />, // Placeholder icon
        name: "Add Refund Reason",
        path: "/refund-reasons/add",
        element: <RefundReasonAdd />,
        hidden: true,
      },
      {
        icon: <CurrencyDollarIcon {...icon} />, // Placeholder icon
        name: "Edit Refund Reason",
        path: "/refund-reasons/edit/:id",
        element: <RefundReasonEdit />,
        hidden: true,
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
