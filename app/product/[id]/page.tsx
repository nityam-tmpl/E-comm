
import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Product } from "../../types/product";
import { reviews } from "../../../data/reviews";
import ProductOptions from "./ProductOptions";
import RelatedProducts from "./RelatedProducts";

type Props = {
  params: Promise<{ id: string }>;
};

type ApiReview = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
};

type ProductResponse = Product & {
  reviews?: ApiReview[];
};

type Review = {
  id: number;
  name: string;
  rating: number;
  comment: string;
  productId: number;
};

type ProductsResponse = {
  products: Product[];
};

export default function ProductPage({ params }: Props) {
  return (
    <Suspense
      fallback={
        <main className="px-5 py-16 text-center">
          Loading product...
        </main>
      }
    >
      <ProductContent params={params} />
    </Suspense>
  );
}

async function ProductContent({ params }: Props) {
  const { id } = await params;

  if (!/^\d+$/.test(id)) {
    notFound();
  }

  let product: ProductResponse;

  try {
    const response = await fetch(
      `https://dummyjson.com/products/${id}`,
      {
        next: { revalidate: 3600 },
      },
    );

    if (response.status === 404) {
      notFound();
    }

    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }

    product = (await response.json()) as ProductResponse;
  } catch (error) {
    console.error("Failed to load product:", error);

    throw error;
  }

  const apiReviews: Review[] = (product.reviews ?? []).map(
    (review, index) => ({
      id: product.id * 1000 + index,
      name: review.reviewerName,
      rating: review.rating,
      comment: review.comment,
      productId: product.id,
    }),
  );

  const localReviews: Review[] = reviews
    .filter((review) => review.productId === product.id)
    .map((review, index) => ({
      ...review,
      id: product.id * 2000 + index,
    }));

  const fallbackReviews: Review[] = [
    {
      id: product.id * 3000 + 1,
      name: "Aarav Sharma",
      rating: 5,
      comment: `I'm happy with this ${product.title}. The quality is good and it offers good value for money.`,
      productId: product.id,
    },
    {
      id: product.id * 3000 + 2,
      name: "Priya Verma",
      rating: 4,
      comment: `The ${product.title} looks good and matches the description. Overall, a good purchase.`,
      productId: product.id,
    },
    {
      id: product.id * 3000 + 3,
      name: "Rohan Mehta",
      rating: 5,
      comment: `I like this product and I'm satisfied with its overall quality.`,
      productId: product.id,
    },
  ];

  const productReviews: Review[] =
    localReviews.length > 0
      ? [...apiReviews, ...localReviews]
      : apiReviews.length > 0
        ? apiReviews
        : fallbackReviews;

  let relatedProducts: Product[] = [];

  try {
    const categoryResponse = await fetch(
      `https://dummyjson.com/products/category/${encodeURIComponent(
        product.category,
      )}?limit=5`,
      {
        next: { revalidate: 3600 },
      },
    );

    if (categoryResponse.ok) {
      const categoryData =
        (await categoryResponse.json()) as ProductsResponse;

      relatedProducts = categoryData.products
        .filter((item) => item.id !== product.id)
        .slice(0, 4);
    }
  } catch (error) {
    console.error("Failed to load related products:", error);
  }

  return (
    <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
      <ProductOptions
        product={product}
        productReviews={productReviews}
      />

      <RelatedProducts products={relatedProducts} />
    </main>
  );
}
