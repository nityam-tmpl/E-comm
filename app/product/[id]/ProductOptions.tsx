
"use client";

import { useState } from "react";
import type { Product, CustomerReview } from "../../types/product";

type Props = {
  product: Product;
  productReviews: CustomerReview[];
};

export default function ProductOptions({
  product,
  productReviews,
}: Props) {
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [selectedColor, setSelectedColor] = useState("Black");
  const [selectedSize, setSelectedSize] = useState("M");
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeTab, setActiveTab] = useState("reviews");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const colors = [
    { name: "Black", value: "#000000" },
    { name: "White", value: "#FFFFFF" },
    { name: "Blue", value: "#2563EB" },
    { name: "Green", value: "#16A34A" },
  ];

  const sizes = ["S", "M", "L", "XL", "XXL"];

  const faqs = [
    {
      question: "What is the return policy?",
      answer:
        "Please check the store's return policy for eligibility and return instructions.",
    },
    {
      question: "How can I track my order?",
      answer:
        "Order tracking details are usually provided after an order has been placed and dispatched.",
    },
    {
      question: "What sizes are available?",
      answer:
        "Choose from the available size options shown above. Size options are illustrative for this demo.",
    },
    {
      question: "Are different colors available?",
      answer:
        "Select a color swatch above to change the selected color. This demo does not load separate images for each color.",
    },
  ];

  const tabs = [
    { id: "details", label: "Product Details" },
    { id: "reviews", label: "Customer Reviews" },
    { id: "faqs", label: "FAQs" },
  ];

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Main Product Section */}
      <div className="grid items-stretch gap-8 md:grid-cols-2 md:gap-12">
        {/* Product Images */}
        <div className="grid h-[530px] grid-cols-[80px_minmax(0,1fr)] gap-4">
          <div className="grid grid-rows-3 gap-3">
            {[1, 2, 3].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setSelectedImage(product.image)}
                className="flex min-h-0 items-center justify-center overflow-hidden rounded-xl border border-gray-300 bg-white p-2 hover:border-black"
              >
                <img
                  src={product.image}
                  alt={`${product.title} thumbnail ${item}`}
                  className="h-full w-full object-contain"
                />
              </button>
            ))}
          </div>

          <div className="flex h-[530px] items-center justify-center rounded-2xl bg-gray-100 p-6">
            <img
              src={selectedImage}
              alt={product.title}
              className="h-full w-full object-contain"
            />
          </div>
        </div>

        {/* Product Information */}
        <div className="flex h-[530px] flex-col">
          <p className="text-sm capitalize text-gray-500">
            {product.category}
          </p>

          <h1 className="mt-2 font-league text-3xl font-bold sm:text-4xl">
            {product.title}
          </h1>

          <p className="mt-4 text-2xl font-semibold">
            ${product.price.toFixed(2)}
          </p>

          {/* Rating */}
          <p className="mt-3 text-yellow-500">
            {"★".repeat(Math.round(product.rating.rate))}
            <span className="text-gray-300">
              {"★".repeat(5 - Math.round(product.rating.rate))}
            </span>
            <span className="ml-2 text-gray-500">
              {product.rating.rate} ({product.rating.count} ratings)
            </span>
          </p>

          <p className="mt-4 line-clamp-4 font-roboto leading-6 text-gray-600">
            {product.description}
          </p>

          {/* Colors */}
          <div className="mt-6">
            <h2 className="font-semibold">
              Color: <span className="font-normal">{selectedColor}</span>
            </h2>

            <div className="mt-3 flex gap-3">
              {colors.map((color) => (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => setSelectedColor(color.name)}
                  aria-label={color.name}
                  title={color.name}
                  className={`flex h-10 w-10 items-center justify-center rounded-full border ${
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
          <div className="mt-5">
            <h2 className="font-semibold">
              Size: <span className="font-normal">{selectedSize}</span>
            </h2>

            <div className="mt-3 flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`rounded-lg border px-4 py-2 ${
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

          {/* Add to Cart */}
          <button
            type="button"
            onClick={() => setAddedToCart(!addedToCart)}
            className={`mt-auto w-full rounded-full px-6 py-4 font-semibold transition ${
              addedToCart
                ? "bg-green-600 text-white"
                : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            {addedToCart ? "Added to Cart ✓" : "Add to Cart"}
          </button>
        </div>
      </div>

      {/* Product Information Tabs */}
      <section className="mt-16 border-t border-gray-200 pt-8">
        {/* Tab Navigation */}
        <div className="grid grid-cols-3 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`border-b-2 px-2 py-4 text-center text-sm font-semibold transition sm:text-base ${
                activeTab === tab.id
                  ? "border-black text-black"
                  : "border-transparent text-gray-500 hover:text-black"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Product Details Tab */}
        {activeTab === "details" && (
          <div className="py-8">
            <h2 className="font-league text-2xl font-bold">
              Product Details
            </h2>

            <p className="mt-4 whitespace-pre-line font-roboto text-base leading-7 text-gray-600">
              {product.description}
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-sm text-gray-500">Category</p>
                <p className="mt-1 capitalize font-roboto font-medium">
                  {product.category}
                </p>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-sm text-gray-500">Price</p>
                <p className="mt-1 font-roboto font-medium">
                  ${product.price.toFixed(2)}
                </p>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-sm text-gray-500">Customer Rating</p>
                <p className="mt-1 font-roboto font-medium">
                  {product.rating.rate} out of 5
                </p>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-sm text-gray-500">Ratings Count</p>
                <p className="mt-1 font-roboto font-medium">
                  {product.rating.count}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Customer Reviews Tab */}
        {activeTab === "reviews" && (
          <div className="py-8">
            <h2 className="font-league text-2xl font-bold">
              Customer Reviews
            </h2>

            {productReviews.length > 0 ? (
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {productReviews.map((review) => (
                  <div
                    key={review.id}
                    className="rounded-xl border border-gray-200 p-5"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-league font-bold">
                        {review.name}
                      </h3>

                      <p className="whitespace-nowrap text-yellow-500">
                        {"★".repeat(review.rating)}
                        <span className="text-gray-300">
                          {"★".repeat(5 - review.rating)}
                        </span>
                      </p>
                    </div>

                    <p className="mt-3 font-roboto text-sm leading-6 text-gray-600">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-4 font-roboto text-gray-500">
                No reviews available for this product.
              </p>
            )}
          </div>
        )}

        {/* FAQs Tab */}
        {activeTab === "faqs" && (
          <div className="py-8">
            <h2 className="font-league text-2xl font-bold">
              Frequently Asked Questions
            </h2>

            <div className="mt-6 divide-y divide-gray-200">
              {faqs.map((faq, index) => (
                <div key={faq.question} className="py-4">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenFaq(openFaq === index ? null : index)
                    }
                    className="flex w-full items-center justify-between gap-4 text-left"
                  >
                    <span className="font-league font-semibold">
                      {faq.question}
                    </span>

                    <span className="text-xl">
                      {openFaq === index ? "−" : "+"}
                    </span>
                  </button>

                  {openFaq === index && (
                    <p className="mt-3 font-roboto leading-6 text-gray-600">
                      {faq.answer}
                    </p>
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
