import { Order } from "../types/order";

export const mockOrders: Order[] = [
  {
    id: "ord_001",
    customerName: "Alice Wonderland",
    orderDate: "2023-10-26",
    status: "Shipped",
    totalAmount: 175.50,
    items: [
      { productId: "prod_001", productName: "Laptop Pro 15 inch", quantity: 1, price: 1299.99 },
      { productId: "prod_004", productName: "Smart Fitness Tracker", quantity: 1, price: 89.99 },
    ],
  },
  {
    id: "ord_002",
    customerName: "Bob The Builder",
    orderDate: "2023-10-25",
    status: "Pending",
    totalAmount: 49.90,
    items: [
      { productId: "prod_006", productName: "Stainless Steel Water Bottle", quantity: 2, price: 24.95 },
    ],
  },
  {
    id: "ord_003",
    customerName: "Charlie Brown",
    orderDate: "2023-10-24",
    status: "Delivered",
    totalAmount: 199.99,
    items: [
      { productId: "prod_005", productName: "Wireless Noise-Cancelling Headphones", quantity: 1, price: 199.99 },
    ],
  },
];
