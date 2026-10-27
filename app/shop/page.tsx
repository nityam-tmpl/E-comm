
import Link from "next/link";

const categories = [
  { name: "Electronics", slug: "electronics" },
  { name: "Jewellery", slug: "jewellery" },
  { name: "Men's Clothing", slug: "men-clothing" },
  { name: "Women's Clothing", slug: "women-clothing" },
  { name: "Beauty", slug: "beauty" },
  { name: "Skin Care", slug: "skin-care" },
  { name: "Fragrances", slug: "fragrances" },
  { name: "Furniture", slug: "furniture" },
  { name: "Groceries", slug: "groceries" },
  { name: "Home Decoration", slug: "home-decoration" },
  { name: "Kitchen Accessories", slug: "kitchen-accessories" },
  { name: "Sports Accessories", slug: "sports-accessories" },
  { name: "Sunglasses", slug: "sunglasses" },
  { name: "Vehicles", slug: "vehicles" },
];

export default function ShopPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
      <h1 className="text-center font-league text-4xl font-black uppercase sm:text-5xl">
        Shop by Category
      </h1>

      <p className="mx-auto mt-4 max-w-2xl text-center text-gray-600">
        Explore our collection and find products that match your style.
      </p>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/shop/${category.slug}`}
            className="flex min-h-24 items-center justify-center rounded-2xl border border-gray-200 bg-[#F0EEED] p-4 text-center font-semibold transition hover:bg-gray-200 hover:shadow-md"
          >
            {category.name}
          </Link>
        ))}
      </div>
    </main>
  );
}
