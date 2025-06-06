export interface Claim {
  id: string;
  orderId: string;
  customerId: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  claimDate: string; // ISO 8601 date string
  resolutionDetails?: string;
}
