import { Payment } from "../types/payment";

export const mockPayments: Payment[] = [
  {
    id: "pay_001",
    orderId: "ord_001",
    paymentDate: "2023-10-26",
    amount: 175.50,
    paymentMethod: "Credit Card",
    status: "Completed",
  },
  {
    id: "pay_002",
    orderId: "ord_002",
    paymentDate: "2023-10-25",
    amount: 49.90,
    paymentMethod: "PayPal",
    status: "Pending",
  },
  {
    id: "pay_003",
    orderId: "ord_003",
    paymentDate: "2023-10-24",
    amount: 199.99,
    paymentMethod: "Credit Card",
    status: "Completed",
  },
  {
    id: "pay_004",
    orderId: "ord_001", // Example of a second payment attempt or partial payment
    paymentDate: "2023-10-27",
    amount: 50.00,
    paymentMethod: "Credit Card",
    status: "Failed",
  }
];
