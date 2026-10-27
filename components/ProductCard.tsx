
import Link from "next/link";
import type { Product } from "../app/types/product";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const discountedPrice =
    product.price * (1 - product.discountPercentage / 100);

  const filledStars = Math.max(
    0,
    Math.min(5, Math.floor(product.rating)),
  );

  return (
    <Link href={`/product/${product.id}`} className="block h-full">
      <div className="flex h-full flex-col overflow-hidden rounded-xl bg-[#F0EEED] p-4 transition hover:shadow-md">
        <div className="flex h-56 items-center justify-center p-4">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-full w-full object-contain"
          />
        </div>

        <h2 className="mt-4 line-clamp-2 min-h-12 font-semibold">
          {product.title}
        </h2>

        <div className="mt-2 flex min-h-8 flex-wrap items-center gap-x-2 gap-y-1">
          <p className="text-lg font-bold">
            ${discountedPrice.toFixed(2)}
          </p>

          <p className="text-sm text-gray-500 line-through">
            ${product.price.toFixed(2)}
          </p>

          <span className="rounded-full bg-red-100 px-2 py-1 text-xs text-red-600">
            -{Math.round(product.discountPercentage)}%
          </span>
        </div>

        <p className="mt-1 text-sm">
          <span className="text-yellow-500">
            {"★".repeat(filledStars)}
          </span>

          <span className="text-gray-300">
            {"★".repeat(5 - filledStars)}
          </span>

          <span className="ml-1 text-gray-600">
            {product.rating.toFixed(1)} (
            {product.reviews?.length ?? 0} reviews)
          </span>
        </p>
      </div>
    </Link>
  );
}
