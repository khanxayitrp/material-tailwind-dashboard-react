export interface InventoryItem {
  id: string;
  productId: string;
  sku: string;
  quantity: number;
  location: string; // e.g., "Warehouse A, Shelf B-3"
  lastStockUpdate: string; // ISO 8601 date string
}
