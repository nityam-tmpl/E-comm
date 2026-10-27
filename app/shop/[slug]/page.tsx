
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getProducts } from "../../../data/product";
import ProductCard from "../../../components/ProductCard";
import type { Product } from "../../types/product";

const categories: Record<string, string[]> = {
  electronics: [
    "smartphones",
    "laptops",
    "tablets",
    "mobile-accessories",
  ],
  jewellery: ["womens-jewellery"],
  "men-clothing": [
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
  ],
  "women-clothing": [
    "womens-dresses",
    "tops",
    "womens-shoes",
    "womens-bags",
    "womens-watches",
  ],
  beauty: ["beauty"],
  "skin-care": ["skin-care"],
  fragrances: ["fragrances"],
  furniture: ["furniture"],
  groceries: ["groceries"],
  "home-decoration": ["home-decoration"],
  "kitchen-accessories": ["kitchen-accessories"],
  "sports-accessories": ["sports-accessories"],
  sunglasses: ["sunglasses"],
  vehicles: ["vehicle", "motorcycle"],
};

const titles: Record<string, string> = {
  electronics: "Electronics",
  jewellery: "Jewellery",
  "men-clothing": "Men's Clothing",
  "women-clothing": "Women's Clothing",
  beauty: "Beauty",
  "skin-care": "Skin Care",
  fragrances: "Fragrances",
  furniture: "Furniture",
  groceries: "Groceries",
  "home-decoration": "Home Decoration",
  "kitchen-accessories": "Kitchen Accessories",
  "sports-accessories": "Sports Accessories",
  sunglasses: "Sunglasses",
  vehicles: "Vehicles",
};

type Props = {
  params: Promise<{ slug: string }>;
};

export default function CategoryPage({ params }: Props) {
  return (
    <Suspense
      fallback={<p className="p-10 text-center">Loading products...</p>}
    >
      <CategoryContent params={params} />
    </Suspense>
  );
}

async function CategoryContent({ params }: Props) {
  const { slug } = await params;

  if (!categories[slug]) {
    notFound();
  }

  let products: Product[] = [];

  try {
    products = await getProducts();
  } catch (error) {
    console.error("Failed to load products:", error);
  }

  const filteredProducts = products.filter((product) =>
    categories[slug].includes(product.category),
  );

  return (
    <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
      <h1 className="mb-8 font-league text-4xl font-black uppercase sm:text-5xl">
        {titles[slug]}
      </h1>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="py-10 text-center text-gray-600">
          Products could not be loaded, or no products are available in this
          category. Please try again later.
        </p>
      )}
    </main>
  );
}
