
import type { Product } from "../app/types/product";

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(
    "https://dummyjson.com/products?limit=0",
    {
      next: { revalidate: 3600 },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: { products: Product[] } = await response.json();

  return data.products;
}
