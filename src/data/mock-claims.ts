import { Claim } from "../types/claim";

export const mockClaims: Claim[] = [
  {
    id: "claim_001",
    orderId: "ord_123",
    customerId: "cust_abc",
    reason: "Product arrived damaged.",
    status: "pending",
    claimDate: "2023-10-27T09:15:00Z",
  },
  {
    id: "claim_002",
    orderId: "ord_120",
    customerId: "cust_def",
    reason: "Received wrong size.",
    status: "approved",
    claimDate: "2023-10-25T14:00:00Z",
    resolutionDetails: "Replacement item shipped. Tracking: XYZ12345",
  },
  {
    id: "claim_003",
    orderId: "ord_115",
    customerId: "cust_ghi",
    reason: "Item not as described online.",
    status: "rejected",
    claimDate: "2023-10-22T11:30:00Z",
    resolutionDetails: "Claim does not meet policy requirements. Item matches description.",
  },
  {
    id: "claim_004",
    orderId: "ord_128",
    customerId: "cust_jkl",
    reason: "Package never arrived.",
    status: "pending",
    claimDate: "2023-10-28T16:00:00Z",
  },
];
