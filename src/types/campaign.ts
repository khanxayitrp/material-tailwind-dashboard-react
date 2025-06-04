export interface Campaign {
  id: string;
  name: string;
  startDate: string; // Consider using Date type
  endDate: string;   // Consider using Date type
  budget: number;
  status: "Planning" | "Active" | "Completed" | "Cancelled";
  description?: string;
  targetAudience?: string;
}
