import { Campaign } from "../types/campaign";

export const mockCampaigns: Campaign[] = [
  {
    id: "camp_001",
    name: "Holiday Sale 2023",
    startDate: "2023-11-15",
    endDate: "2023-12-25",
    budget: 5000,
    status: "Planning",
    description: "Year-end holiday discounts and promotions.",
    targetAudience: "All customers",
  },
  {
    id: "camp_002",
    name: "Summer Splash",
    startDate: "2023-06-01",
    endDate: "2023-08-31",
    budget: 3000,
    status: "Completed",
    description: "Promotions for summer collection.",
    targetAudience: "Ages 18-35",
  },
  {
    id: "camp_003",
    name: "New Product Launch - X1",
    startDate: "2024-01-10",
    endDate: "2024-02-10",
    budget: 7500,
    status: "Active",
    description: "Launch campaign for the new X1 gadget.",
    targetAudience: "Tech enthusiasts",
  },
];
