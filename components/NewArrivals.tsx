import Link from "next/link";
import type { Product } from "../app/types/product";
import ProductCard from "./ProductCard";

type Props = {
  products: Product[];
};

export default function newArrivals({ products }: Props) {
  const newArrivals = products.slice(0, 4);

  return (
    <section className="mx-4 max-w-8xl px-0 py-14 sm:mx-12 sm:px-5">
      <h2 className="text-center text-[36px] font-league font-black uppercase sm:text-[48px]">
        New Arrivals
      </h2>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {newArrivals.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/new-arrivals"
          className="inline-block rounded-full border border-gray-300 px-12 py-3 text-sm hover:bg-gray-100"
        >
          View All
        </Link>
      </div>
    </section>
  );
}