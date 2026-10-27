
import type { Product } from "../../types/product";
import ProductCard from "../../../components/ProductCard";

type Props = {
  products: Product[];
};

export default function RelatedProducts({ products }: Props) {
  if (products.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 border-t border-gray-200 pt-10">
      <h2 className="text-center font-league text-4xl font-bold uppercase">
        You Might Also Like
      </h2>

      <div className="mt-8 mb-5 grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {products.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
