export interface Payment {
  id: string;
  orderId: string;
  paymentDate: string; // Consider using Date type
  amount: number;
  paymentMethod: "Credit Card" | "PayPal" | "Bank Transfer" | "Cash";
  status: "Pending" | "Completed" | "Failed" | "Refunded";
}
