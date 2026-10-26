

import type { Product } from "../types/product";
import ProductCard from "./ProductCard";

type Props = {
  products: Product[];
};

export default function TopSelling({ products }: Props) {
  const TopSelling = [...products]
  .sort((a, b) => b.rating.count - a.rating.count)
  .filter((product) => product.id > 4)
  .slice(0, 4);

  return (
    <section className="mx-12 max-w-8xl px-3 py-14 md:px-8">
      <h2 className="text-center text-[48px]font-league font-black uppercase sm:text-4xl">
        Top Selling
      </h2>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {TopSelling.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-10 text-center">
        <button className="rounded-full border border-gray-300 px-12 py-3 text-sm hover:bg-gray-100">
          View All
        </button>
      </div>
    </section>
  );
}
