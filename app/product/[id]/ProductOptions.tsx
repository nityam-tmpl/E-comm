"use client";

import { useState } from "react";
import type { Product, CustomerReview } from "../../types/product";

type Props = {
  product: Product;
  productReviews: CustomerReview[];
};

const colors = [
  { name: "Black", value: "#000000" },
  { name: "White", value: "#FFFFFF" },
  { name: "Blue", value: "#2563EB" },
  { name: "Green", value: "#16A34A" },
];

const sizes = ["S", "M", "L", "XL", "XXL"];

const faqs = [
  {
    question: "What is the product made of?",
    answer:
      "Please check the product description for information about its material and features.",
  },
  {
    question: "How can I choose the right size?",
    answer:
      "Select the size that best suits your requirements from the available size options.",
  },
  {
    question: "Can I return this product?",
    answer:
      "Please check the store's return policy for eligibility and return instructions.",
  },
];

export default function ProductOptions({ product, productReviews }: Props) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("Black");
  const [selectedSize, setSelectedSize] = useState("M");
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeTab, setActiveTab] = useState("reviews");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const images = [product.image, product.image, product.image];

  return (
    <main className="font-roboto">
      {/* Product gallery and information */}
      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="flex h-[530px] min-h-0 gap-4">
          <div className="flex h-full w-20 shrink-0 flex-col gap-3">
            {images.map((image, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setSelectedImage(index)}
                aria-label={`View image ${index + 1}`}
                className={`flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-lg border p-2 ${
                  selectedImage === index ? "border-black" : "border-gray-200"
                }`}
              >
                <img
                  src={image}
                  alt={`${product.title} view ${index + 1}`}
                  className="h-full w-full object-contain"
                />
              </button>
            ))}
          </div>

          <div className="flex h-full min-w-0 flex-1 items-center justify-center overflow-hidden rounded-xl bg-gray-50 p-4 sm:p-6">
            <img
              src={images[selectedImage]}
              alt={product.title}
              className="h-full w-full object-contain"
            />
          </div>
        </div>

        <div className="flex min-h-[530px] flex-col">
          <p className="text-sm capitalize text-gray-500">{product.category}</p>

          <h1 className="mt-3 font-league text-3xl font-bold sm:text-4xl">
            {product.title}
          </h1>

          <div className="mt-4 flex items-center gap-2">
            <span className="text-lg text-amber-400">
              {"★".repeat(
                Math.max(0, Math.min(5, Math.round(product.rating.rate))),
              )}
              <span className="text-gray-200">
                {"★".repeat(
                  5 - Math.max(0, Math.min(5, Math.round(product.rating.rate))),
                )}
              </span>
            </span>

            <span className="text-sm text-gray-500">
              {product.rating.rate} ({product.rating.count} ratings)
            </span>
          </div>

          <p className="mt-5 text-2xl font-bold">${product.price.toFixed(2)}</p>

          <p className="mt-5 leading-7 text-gray-600">{product.description}</p>

          {/* Colors */}
          <div className="mt-6">
            <p className="mb-3 font-medium">Color: {selectedColor}</p>

            <div className="flex items-center gap-3">
              {colors.map((color) => (
                <button
                  key={color.name}
                  type="button"
                  title={color.name}
                  aria-label={`Select ${color.name}`}
                  onClick={() => setSelectedColor(color.name)}
                  className={`flex h-9 w-9 items-center justify-center rounded-full border ${
                    selectedColor === color.name
                      ? "border-black ring-2 ring-black ring-offset-2"
                      : "border-gray-300"
                  }`}
                >
                  <span
                    className="h-7 w-7 rounded-full border border-black/10"
                    style={{ backgroundColor: color.value }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div className="mt-6">
            <p className="mb-3 font-medium">Size: {selectedSize}</p>

            <div className="flex flex-wrap gap-3">
              {sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`min-w-12 rounded-md border px-4 py-2 ${
                    selectedSize === size
                      ? "border-black bg-black text-white"
                      : "border-gray-300 hover:border-black"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to cart */}
          <button
            type="button"
            onClick={() => setAddedToCart(!addedToCart)}
            className={`mt-3 w-full rounded-full px-6 py-4 font-medium text-white transition ${
              addedToCart ? "bg-green-700" : "bg-black hover:bg-gray-800"
            }`}
          >
            {addedToCart ? "Added to Cart ✓" : "Add to Cart"}
          </button>
        </div>
      </section>

      {/* Product details, reviews and FAQs */}
      <section className="w-full px-6 py-10 sm:px-10 lg:px-12">
        {/* Tabs */}
        <div className="grid grid-cols-3 border-b border-gray-200">
          <button
            type="button"
            onClick={() => setActiveTab("details")}
            className={`border-b-2 py-5 text-sm ${
              activeTab === "details"
                ? "border-black text-black"
                : "border-transparent text-gray-500"
            }`}
          >
            Product Details
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("reviews")}
            className={`border-b-2 py-5 text-sm ${
              activeTab === "reviews"
                ? "border-black text-black"
                : "border-transparent text-gray-500"
            }`}
          >
            Rating &amp; Reviews
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("faqs")}
            className={`border-b-2 py-5 text-sm ${
              activeTab === "faqs"
                ? "border-black text-black"
                : "border-transparent text-gray-500"
            }`}
          >
            FAQs
          </button>
        </div>

        {/* Product details */}
        {activeTab === "details" && (
          <div className="py-8">
            <h2 className="font-league text-2xl font-bold">Product Details</h2>

            <p className="mt-4 max-w-5xl leading-7 text-gray-600">
              {product.description}
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-sm text-gray-500">Category</p>
                <p className="mt-1 font-medium capitalize">
                  {product.category}
                </p>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-sm text-gray-500">Price</p>
                <p className="mt-1 font-medium">${product.price.toFixed(2)}</p>
              </div>
            </div>
          </div>
        )}

        {/* Customer reviews */}
        {activeTab === "reviews" && (
          <div className="py-6">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <h2 className="font-league text-xl font-bold">
                All Reviews{" "}
                <span className="font-roboto text-xs font-normal text-gray-500">
                  ({productReviews.length})
                </span>
              </h2>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  aria-label="Filter reviews"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100"
                >
                  <span className="text-lg">☷</span>
                </button>

                <button
                  type="button"
                  className="rounded-full bg-gray-100 px-5 py-3 text-xs"
                >
                  Latest
                </button>

                <button
                  type="button"
                  className="rounded-full bg-black px-6 py-3 text-xs text-white"
                >
                  Write a Review
                </button>
              </div>
            </div>

            {productReviews.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {productReviews.map((review) => (
                  <article
                    key={review.id}
                    className="rounded-2xl border border-gray-200 p-5 sm:p-6"
                  >
                    <div className="flex items-center justify-between">
                      <span className="tracking-wide text-amber-400">
                        {"★".repeat(
                          Math.max(0, Math.min(5, Math.round(review.rating))),
                        )}
                        <span className="text-gray-200">
                          {"★".repeat(
                            5 -
                              Math.max(
                                0,
                                Math.min(5, Math.round(review.rating)),
                              ),
                          )}
                        </span>
                      </span>

                      <span className="text-gray-400">···</span>
                    </div>

                    <div className="mt-2 flex items-center gap-2">
                      <h3 className="text-sm font-semibold">{review.name}</h3>

                      <span
                        title="Verified customer"
                        className="flex h-4 w-4 items-center justify-center rounded-full bg-green-600 text-xs text-white"
                      >
                        ✓
                      </span>
                    </div>

                    <p className="mt-3 text-sm leading-6 text-gray-500">
                      {review.comment}
                    </p>

                    <p className="mt-4 text-xs text-gray-500">
                      Posted by {review.name}
                    </p>
                  </article>
                ))}
              </div>
            ) : (
              <p className="py-10 text-center text-gray-500">
                No reviews available for this product yet.
              </p>
            )}

            <div className="mt-7 flex justify-center">
              <button
                type="button"
                className="rounded-full border border-gray-200 px-8 py-3 text-sm transition hover:bg-gray-50"
              >
                Load More Reviews
              </button>
            </div>
          </div>
        )}

        {/* FAQs */}
        {activeTab === "faqs" && (
          <div className="py-8">
            <h2 className="font-league text-2xl font-bold">
              Frequently Asked Questions
            </h2>

            <div className="mt-6 divide-y divide-gray-200">
              {faqs.map((faq, index) => (
                <div key={faq.question} className="py-5">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="flex w-full items-center justify-between gap-4 text-left font-medium"
                  >
                    <span>{faq.question}</span>
                    <span className="text-xl">
                      {openFaq === index ? "−" : "+"}
                    </span>
                  </button>

                  {openFaq === index && (
                    <p className="mt-3 leading-7 text-gray-600">{faq.answer}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
