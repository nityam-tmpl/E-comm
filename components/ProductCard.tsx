import Link from "next/link";
import type { Product } from "../app/types/product";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  return (
    <Link href={`/product/${product.id}`} className="block">
      <div className="overflow-hidden rounded-xl  p-4 transition bg-[#F0EEED] hover:shadow-md">
        <div className="flex h-56 items-center justify-center p-4">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-contain"
          />
        </div>

        <h2 className="mt-4 line-clamp-1 font-semibold">{product.title}</h2>

        <p className="mt-2 text-lg font-bold">${product.price.toFixed(2)}</p>

        <p className="mt-1 text-sm text-yellow-500">
          ★ {product.rating.rate} ({product.rating.count} ratings)
        </p>
      </div>
    </Link>
  );
}
