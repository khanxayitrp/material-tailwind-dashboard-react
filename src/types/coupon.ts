export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  expirationDate: string; // ISO 8601 date string
  isActive: boolean;
  description?: string;
}
