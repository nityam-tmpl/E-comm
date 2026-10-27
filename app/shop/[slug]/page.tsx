import { Suspense } from "react";
import { getProducts } from "../../../data/product";
import ProductCard from "../../../components/ProductCard";
import { notFound } from "next/navigation";

const categories: Record<string, string> = {
  electronics: "electronics",
  jewellery: "jewelery",
  "men-clothing": "men's clothing",
  "women-clothing": "women's clothing",
};

const titles: Record<string, string> = {
  electronics: "Electronics",
  jewellery: "Jewellery",
  "men-clothing": "Men's Clothing",
  "women-clothing": "Women's Clothing",
};

type Props = {
  params: Promise<{ slug: string }>;
};

export default function CategoryPage({ params }: Props) {
  return (
    <Suspense fallback={<p className="p-10">Loading products...</p>}>
      <CategoryContent params={params} />
    </Suspense>
  );
}

async function CategoryContent({ params }: Props) {
  const { slug } = await params;

  if (!categories[slug]) {
    notFound();
  }

  const products = await getProducts();

  const filteredProducts = products.filter(
    (product) => product.category === categories[slug],
  );

  return (
    <main className="mx-auto max-w-7xl px-5 py-10">
      <h1 className="mb-8 text-5xl font-league uppercase font-bold">
        {titles[slug]}
      </h1>

      <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
