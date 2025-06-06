import { RefundReason } from "../types/refund-reason";

export const mockRefundReasons: RefundReason[] = [
  {
    id: "rr_001",
    name: "Defective Product",
    description: "The product received was faulty or damaged.",
    isActive: true,
  },
  {
    id: "rr_002",
    name: "Wrong Item Shipped",
    description: "A different item than what was ordered was delivered.",
    isActive: true,
  },
  {
    id: "rr_003",
    name: "Changed Mind",
    description: "Customer no longer wants the product.",
    isActive: false,
  },
  {
    id: "rr_004",
    name: "Did Not Match Description",
    description: "Product did not match the online description or images.",
    isActive: true,
  },
];
