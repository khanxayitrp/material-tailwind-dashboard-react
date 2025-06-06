import { InventoryItem } from "../types/inventory-item";

export const mockInventoryItems: InventoryItem[] = [
  {
    id: "inv_001",
    productId: "prod_abc",
    sku: "NIKE-SHOE-RED-10",
    quantity: 150,
    location: "Warehouse A, Shelf B-3",
    lastStockUpdate: "2023-10-20T08:00:00Z",
  },
  {
    id: "inv_002",
    productId: "prod_def",
    sku: "APPLE-IPHONE-15-BLK",
    quantity: 75,
    location: "Warehouse B, Section 2, Row 5",
    lastStockUpdate: "2023-10-25T14:30:00Z",
  },
  {
    id: "inv_003",
    productId: "prod_ghi",
    sku: "SONY-HEADPHONES-XM5",
    quantity: 200,
    location: "Central Depot, Area 7",
    lastStockUpdate: "2023-10-22T10:10:00Z",
  },
  {
    id: "inv_004",
    productId: "prod_jkl",
    sku: "SAMSUNG-TV-55QLED",
    quantity: 30,
    location: "Warehouse A, Shelf C-1",
    lastStockUpdate: "2023-10-28T11:00:00Z",
  },
];
