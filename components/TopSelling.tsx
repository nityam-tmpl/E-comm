
"use client";

import { useState } from "react";
import type { Product } from "../app/types/product";
import ProductCard from "./ProductCard";

type Props = {
  products: Product[];
};

export default function TopSelling({ products }: Props) {
  const [showAll, setShowAll] = useState(false);

  const topSelling = [...products]
    .filter((product) => product.rating > 4)
    .sort((a, b) => b.rating - a.rating);

  const displayedProducts = showAll
    ? topSelling
    : topSelling.slice(0, 4);

  return (
    <section className="mx-4 max-w-8xl px-0 py-14 sm:mx-12 sm:px-3 md:px-8">
      <h2 className="text-center font-league text-[36px] font-black uppercase sm:text-[48px]">
        Top Selling
      </h2>

      {displayedProducts.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="mt-8 text-center text-gray-500">
          No products rated above 4 stars.
        </p>
      )}

      {topSelling.length > 4 && (
        <div className="mt-10 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="rounded-full border border-gray-300 px-12 py-3 text-sm transition hover:bg-gray-100"
          >
            {showAll ? "Show Less" : "View All"}
          </button>
        </div>
      )}
    </section>
  );
}
