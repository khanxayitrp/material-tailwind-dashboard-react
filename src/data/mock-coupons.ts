import { Coupon } from "../types/coupon";

export const mockCoupons: Coupon[] = [
  {
    id: "coupon_001",
    code: "SUMMER20",
    discountType: "percentage",
    discountValue: 20,
    expirationDate: "2024-08-31T23:59:59Z",
    isActive: true,
    description: "20% off all summer collection items.",
  },
  {
    id: "coupon_002",
    code: "SAVE10NOW",
    discountType: "fixed",
    discountValue: 10,
    expirationDate: "2024-07-15T23:59:59Z",
    isActive: true,
    description: "$10 off on orders over $50.",
  },
  {
    id: "coupon_003",
    code: "FREESHIP",
    discountType: "fixed", // Representing free shipping as a fixed value could be tricky.
                           // Often, free shipping is a separate flag or handled differently.
                           // For this example, let's assume it means $0 shipping cost,
                           // but its application logic would be more complex.
                           // Or, it could be a very high discount value for shipping specifically.
                           // Let's simplify and say it's a $5 discount, implying it covers typical shipping.
    discountValue: 5, // This is a simplification.
    expirationDate: "2024-12-31T23:59:59Z",
    isActive: false, // Example of an inactive coupon
    description: "Free standard shipping on all orders.",
  },
  {
    id: "coupon_004",
    code: "WELCOME15",
    discountType: "percentage",
    discountValue: 15,
    expirationDate: "2025-01-31T23:59:59Z",
    isActive: true,
    description: "15% off your first order.",
  },
];
