import { Product } from "../types/product";

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(
    "https://fakestoreapi.com/products",
    { cache: "force-cache" }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}