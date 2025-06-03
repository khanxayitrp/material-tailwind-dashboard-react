export interface Product {
  id: string;
  name: string;
  category: string;
  price: number; // Changed to number for better data handling
  stock: number;
  description?: string; // Optional
  imageUrl?: string;    // Optional
  sku?: string;         // Added SKU
  supplier?: string;    // Added Supplier
}
