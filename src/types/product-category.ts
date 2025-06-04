export interface ProductCategory {
  id: string;
  name: string;
  description?: string;
  productCount?: number; // Optional: number of products in this category
}
