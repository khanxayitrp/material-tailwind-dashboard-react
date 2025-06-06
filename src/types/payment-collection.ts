export interface PaymentCollection {
  id: string;
  orderId: string;
  paymentMethod: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  transactionDate: string; // ISO 8601 date string
}
