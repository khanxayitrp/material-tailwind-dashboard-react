import { PaymentCollection } from "../types/payment-collection";

export const mockPaymentCollections: PaymentCollection[] = [
  {
    id: "pc_001",
    orderId: "ord_123",
    paymentMethod: "Credit Card",
    amount: 150.75,
    status: "completed",
    transactionDate: "2023-10-26T10:00:00Z",
  },
  {
    id: "pc_002",
    orderId: "ord_124",
    paymentMethod: "PayPal",
    amount: 89.99,
    status: "pending",
    transactionDate: "2023-10-27T11:30:00Z",
  },
  {
    id: "pc_003",
    orderId: "ord_125",
    paymentMethod: "Bank Transfer",
    amount: 200.00,
    status: "failed",
    transactionDate: "2023-10-27T14:15:00Z",
  },
  {
    id: "pc_004",
    orderId: "ord_126",
    paymentMethod: "Credit Card",
    amount: 45.50,
    status: "completed",
    transactionDate: "2023-10-28T09:05:00Z",
  },
];
