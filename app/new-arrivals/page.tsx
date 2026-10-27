import ProductCard from "../../components/ProductCard";
import type { Product } from "../types/product";

export default async function NewArrivalsPage() {
  let products: Product[] = [];

  try {
    const response = await fetch("https://fakestoreapi.com/products", {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    products = await response.json();
  } catch (error) {
    console.error("Failed to load products:", error);
  }

  const newArrivals = products;

  return (
    <main className="mx-auto max-w-7xl px-5 py-14 md:px-8">
      <h1 className="text-center text-3xl font-black uppercase sm:text-4xl">
        New Arrivals
      </h1>

      {newArrivals.length > 0 ? (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="py-10 text-center">
          Products could not be loaded. Please try again later.
        </p>
      )}
    </main>
  );
}
