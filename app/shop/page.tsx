
import Link from "next/link";

const categories = [
  { name: "Electronics", slug: "electronics" },
  { name: "Jewellery", slug: "jewellery" },
  { name: "Men's Clothing", slug: "men-clothing" },
  { name: "Women's Clothing", slug: "women-clothing" },
];

export default function ShopPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-10">
      <h1 className="mb-8 text-3xl font-bold">Shop by Category</h1>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/shop/${category.slug}`}
            className="rounded-xl border p-6 transition hover:bg-gray-100"
          >
            <h2 className="text-xl font-semibold">{category.name}</h2>
            <p className="mt-2 text-gray-500">Explore collection →</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
