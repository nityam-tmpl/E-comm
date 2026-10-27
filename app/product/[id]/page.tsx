import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Product } from "../../types/product";
import { reviews } from "../../../data/reviews";
import ProductOptions from "../[id]/ProductOptions";
import RelatedProducts from "./RelatedProducts";

type Props = {
  params: Promise<{ id: string }>;
};

async function ProductContent({ params }: Props) {
  const { id } = await params;

  const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    notFound();
  }

  const product: Product = await response.json();

  if (!product?.id) {
    notFound();
  }

  const categoryResponse = await fetch(
    `https://fakestoreapi.com/products/category/${encodeURIComponent(
      product.category,
    )}`,
    { cache: "no-store" },
  );

  let relatedProducts: Product[] = [];

  if (categoryResponse.ok) {
    const categoryProducts: Product[] = await categoryResponse.json();

    relatedProducts = categoryProducts
      .filter((item) => item.id !== product.id)
      .slice(0, 4);
  }

  const productReviews = reviews.filter(
    (review) => review.productId === product.id,
  );

  return (
    <>
      <ProductOptions product={product} productReviews={productReviews} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RelatedProducts products={relatedProducts} />
      </div>
    </>
  );
}

export default function ProductPage({ params }: Props) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[400px] items-center justify-center font-roboto">
          <p className="text-gray-500">Loading product...</p>
        </div>
      }
    >
      <ProductContent params={params} />
    </Suspense>
  );
}
