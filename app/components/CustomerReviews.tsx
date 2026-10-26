
"use client";

import { useState } from "react";

const reviews = [
  {
    name: "Sarah M.",
    review: "Great quality and comfortable clothes!",
  },
  {
    name: "Alex K.",
    review: "Fast delivery and perfect fitting.",
  },
  {
    name: "James L.",
    review: "Excellent products. I will order again.",
  },
  {
    name: "Emily R.",
    review: "Stylish designs and great value for money.",
  },
];

export default function CustomerReviews() {
  const [start, setStart] = useState(0);

  return (
    <section className="mx-auto max-w-7xl px-5 py-12">
      <h2 className="mb-8 text-5xl font-black font-league uppercase">
        Our Happy Customers
      </h2>

      <div className="grid grid-cols-1 font-roboto gap-5 md:grid-cols-3">
        {reviews.slice(start, start + 3).map((review) => (
          <div
            key={review.name}
            className="rounded-2xl border-black/0 shadow-sm  p-6"
          >
            <p className="mb-3 text-yellow-500">★★★★★</p>
            <h3 className="mb-2 font-bold">{review.name} </h3>
            <p className="text-gray-600">{review.review}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button
          onClick={() => setStart(Math.max(0, start - 1))}
          className="rounded-full border px-4 py-2"
        >
          ←
        </button>

        <button
          onClick={() =>
            setStart(start === reviews.length - 3 ? 0 : start + 1)
          }
          className="rounded-full border px-4 py-2"
        >
          →
        </button>
      </div>
    </section>
  );
}
