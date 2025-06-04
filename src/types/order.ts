export interface Order {
  id: string;
  customerName: string;
  orderDate: string; // Consider using Date type if date operations are needed
  status: "Pending" | "Shipped" | "Delivered" | "Cancelled";
  totalAmount: number;
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }>;
}
