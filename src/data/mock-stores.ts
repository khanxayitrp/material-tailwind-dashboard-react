import { Store } from "../types/store";

export const mockStores: Store[] = [
  {
    id: "store_001",
    name: "Downtown Flagship",
    location: "123 Main St, Anytown",
    manager: "Jane Doe",
    contactEmail: "downtown@example.com",
    openingHours: "9 AM - 9 PM",
  },
  {
    id: "store_002",
    name: "Suburbia Mall Branch",
    location: "456 Mall Rd, Suburbia",
    manager: "John Smith",
    contactEmail: "suburbia@example.com",
    openingHours: "10 AM - 8 PM",
  },
  {
    id: "store_003",
    name: "Online Warehouse",
    location: "789 Industrial Pkwy, Anytown",
    contactEmail: "warehouse@example.com",
    openingHours: "24/7 Online",
  },
];
