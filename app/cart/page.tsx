
"use client";

import { useState } from "react";
import Link from "next/link";
import { Trash2, Tag, ArrowRight, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

const DISCOUNT_RATE = 0.2;
const DELIVERY_FEE = 15;

export default function CartPage() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoMessage, setPromoMessage] = useState("");

  const subtotal = cartItems.reduce((total, item) => {
    const price =
      item.product.price *
      (1 - item.product.discountPercentage / 100);

    return total + price * item.quantity;
  }, 0);

  const discount = subtotal * DISCOUNT_RATE;
  const deliveryFee = cartItems.length > 0 ? DELIVERY_FEE : 0;
  const total = subtotal - discount + deliveryFee;

  function applyPromo() {
    if (promoCode.trim().toUpperCase() === "SHOPCO") {
      setPromoApplied(true);
      setPromoMessage("Promo code applied!");
    } else {
      setPromoApplied(false);
      setPromoMessage("Invalid promo code.");
    }
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-black">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-black">Cart</span>
      </nav>

      <h1 className="mb-6 font-league text-3xl font-bold uppercase sm:mb-8 sm:text-4xl">
        Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-200 px-5 py-16 text-center sm:py-20">
          <ShoppingCart size={48} strokeWidth={1.5} />
          <h2 className="mt-5 font-league text-2xl font-bold">
            Your cart is empty
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Add some products to your cart to see them here.
          </p>
          <Link
            href="/"
            className="mt-6 rounded-full bg-black px-8 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[1.5fr_1fr] lg:gap-6">
          <section className="min-w-0 rounded-2xl border border-gray-200 p-3 sm:p-5">
            <div className="flex flex-col gap-5 sm:gap-6">
              {cartItems.map((item) => {
                const price =
                  item.product.price *
                  (1 - item.product.discountPercentage / 100);

                return (
                  <article
                    key={`${item.product.id}-${item.color}-${item.size}`}
                    className="flex min-w-0 gap-3 border-b border-gray-200 pb-5 last:border-b-0 last:pb-0 sm:gap-5 sm:pb-6"
                  >
                    <Link
                      href={`/product/${item.product.id}`}
                      className="flex h-28 w-24 shrink-0 items-center justify-center rounded-xl bg-[#F0EEED] p-2 sm:h-36 sm:w-32 sm:p-3"
                    >
                      <img
                        src={item.product.thumbnail}
                        alt={item.product.title}
                        className="h-full w-full object-contain"
                      />
                    </Link>

                    <div className="flex min-w-0 flex-1 flex-col justify-between gap-3">
                      <div className="flex min-w-0 items-start justify-between gap-2">
                        <div className="min-w-0">
                          <Link
                            href={`/product/${item.product.id}`}
                            className="line-clamp-2 font-league text-base font-bold sm:text-lg"
                          >
                            {item.product.title}
                          </Link>

                          <p className="mt-1 text-xs text-gray-600 sm:text-sm">
                            Size:{" "}
                            <span className="text-gray-500">
                              {item.size}
                            </span>
                          </p>

                          <p className="mt-1 text-xs text-gray-600 sm:text-sm">
                            Color:{" "}
                            <span className="text-gray-500">
                              {item.color}
                            </span>
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            removeFromCart(
                              item.product.id,
                              item.color,
                              item.size
                            )
                          }
                          aria-label={`Remove ${item.product.title} from cart`}
                          className="shrink-0 p-1 text-red-500 transition hover:text-red-700"
                        >
                          <Trash2 size={19} />
                        </button>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <p className="font-league text-xl font-bold sm:text-2xl">
                          ${(price * item.quantity).toFixed(2)}
                        </p>

                        <div className="flex h-9 items-center gap-4 rounded-full bg-[#F0EEED] px-3 sm:h-10 sm:gap-5 sm:px-4">
                          <button
                            type="button"
                            onClick={() =>
                              decreaseQuantity(
                                item.product.id,
                                item.color,
                                item.size
                              )
                            }
                            aria-label="Decrease quantity"
                            className="text-xl leading-none hover:text-gray-500"
                          >
                            −
                          </button>

                          <span className="min-w-3 text-center text-sm font-medium">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              increaseQuantity(
                                item.product.id,
                                item.color,
                                item.size
                              )
                            }
                            aria-label="Increase quantity"
                            className="text-xl leading-none hover:text-gray-500"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <aside className="min-w-0 rounded-2xl border border-gray-200 p-4 sm:p-6">
            <h2 className="font-league text-2xl font-bold">
              Order Summary
            </h2>

            <div className="mt-5 flex items-center justify-between gap-3">
              <span className="text-sm text-gray-500 sm:text-base">
                Subtotal
              </span>
              <span className="font-semibold">
                ${subtotal.toFixed(2)}
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
              <span className="text-sm text-gray-500 sm:text-base">
                Discount (20%)
              </span>
              <span className="font-semibold text-red-500">
                -${discount.toFixed(2)}
              </span>
            </div>

            {promoApplied && (
              <div className="mt-4 flex items-center justify-between gap-3">
                <span className="text-sm text-gray-500">
                  Promo code (SHOPCO)
                </span>
                <span className="font-semibold text-green-600">
                  Applied
                </span>
              </div>
            )}

            <div className="mt-4 flex items-center justify-between gap-3">
              <span className="text-sm text-gray-500 sm:text-base">
                Delivery Fee
              </span>
              <span className="font-semibold">
                ${deliveryFee.toFixed(2)}
              </span>
            </div>

            <div className="my-5 border-t border-gray-200" />

            <div className="flex items-center justify-between gap-3">
              <span className="font-medium">Total</span>
              <span className="font-league text-2xl font-bold">
                ${(total * (promoApplied ? 0.95 : 1)).toFixed(2)}
              </span>
            </div>

            <form
              className="mt-6 flex min-w-0 gap-2"
              onSubmit={(event) => {
                event.preventDefault();
                applyPromo();
              }}
            >
              <div className="flex min-w-0 flex-1 items-center gap-2 rounded-full bg-[#F0EEED] px-3 sm:px-4">
                <Tag size={18} className="shrink-0 text-gray-500" />
                <input
                  type="text"
                  value={promoCode}
                  onChange={(event) => {
                    setPromoCode(event.target.value);
                    setPromoMessage("");
                  }}
                  placeholder="Add promo code"
                  aria-label="Promo code"
                  className="w-full min-w-0 bg-transparent py-3 text-sm outline-none"
                />
              </div>

              <button
                type="submit"
                className="shrink-0 rounded-full bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800 sm:px-7"
              >
                Apply
              </button>
            </form>

            {promoMessage && (
              <p
                className={`mt-2 text-sm ${
                  promoApplied ? "text-green-600" : "text-red-500"
                }`}
              >
                {promoMessage}
              </p>
            )}

            <button
              type="button"
              onClick={() =>
                alert("Checkout will be connected in a later step.")
              }
              className="mt-6 flex w-full items-center justify-center gap-3 rounded-full bg-black px-5 py-4 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              Go to Checkout
              <ArrowRight size={18} />
            </button>
          </aside>
        </div>
      )}
    </main>
  );
}
