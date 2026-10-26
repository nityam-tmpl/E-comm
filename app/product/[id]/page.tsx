
import { notFound } from "next/navigation";
import type { Product } from "../../types/product";
import { reviews } from "../../data/reviews";
import ProductOptions from "./ProductOptions";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: Props) {
  const { id } = await params;

  

  const response = await fetch(
    `https://fakestoreapi.com/products/${id}`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    notFound();
  }

  const product: Product = await response.json();

  if (!product || !product.id) {
    notFound();
  }

  const productReviews = reviews.filter(
    (review) => review.productId === product.id
  );

  return (
    <ProductOptions
      product={product}
      productReviews={productReviews}
    />
  );
}
