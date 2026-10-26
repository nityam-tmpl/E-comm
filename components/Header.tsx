"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Search, ShoppingCart, UserRound } from "lucide-react";

export default function Header() {
  const [showOffer, setShowOffer] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);

  const categories = [
    { name: "Electronics", href: "/shop/electronics" },
    { name: "Jewellery", href: "/shop/jewellery" },
    { name: "Men Clothing", href: "/shop/men-clothing" },
    { name: "Women Clothing", href: "/shop/women-clothing" },
  ];

  const closeMobileMenu = () => {
    setMenuOpen(false);
    setShopOpen(false);
  };

  return (
    <header className="bg-white">
      {showOffer && (
        <div className="relative flex items-center justify-center bg-black px-8 py-3 text-center font-sans text-[14px] text-white">
          <p>
            Sign up and get 20% off to your first order.{" "}
            <Link href="/account" className="underline">
              Sign Up Now
            </Link>
          </p>

          <button
            onClick={() => setShowOffer(false)}
            aria-label="Close offer"
            className="absolute right-4 text-lg"
          >
            ×
          </button>
        </div>
      )}

      <div className="page mx-auto flex max-w-[97%] items-center gap-4 py-5 sm:gap-6">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          className="text-2xl md:hidden"
        >
          ☰
        </button>

        <Link href="/" className="shrink-0">
          <Image
            src="/images/SHOP.CO.png"
            alt="SHOP.CO"
            width={160}
            height={40}
            priority
          />
        </Link>

        <nav className="ml-6 hidden items-center gap-6 font-roboto text-sm md:flex">
          <div
            className="relative"
            onMouseEnter={() => setShopOpen(true)}
            onMouseLeave={() => setShopOpen(false)}
          >
            <button
              onClick={() => setShopOpen(!shopOpen)}
              aria-expanded={shopOpen}
              className="flex items-center gap-1"
            >
              Shop
              <ChevronDown
                size={16}
                className={`transition-transform ${
                  shopOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {shopOpen && (
              <div className="absolute left-0 top-full z-50 w-52 rounded-xl border border-gray-100 bg-white p-2 shadow-lg">
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    href={category.href}
                    onClick={() => setShopOpen(false)}
                    className="block rounded-lg px-4 py-3 transition hover:bg-gray-100"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/on-sale">On Sale</Link>
          <Link href="/new-arrivals">New Arrivals</Link>
          <Link href="/brands">Brands</Link>
        </nav>

        <div className="ml-auto flex min-w-0 items-center gap-4 md:flex-1 md:gap-6">
          <label className="hidden min-w-0 flex-1 items-center gap-3 rounded-full bg-gray-100 px-4 py-3 sm:flex">
            <Search size={20} className="shrink-0 text-gray-500" />
            <input
              type="search"
              placeholder="Search for products..."
              aria-label="Search products"
              className="w-full min-w-0 bg-transparent text-sm outline-none"
            />
          </label>

          <Link href="/cart" aria-label="Shopping cart" className="shrink-0">
            <ShoppingCart size={24} strokeWidth={2} />
          </Link>

          <Link href="/account" aria-label="Account" className="shrink-0">
            <UserRound size={24} strokeWidth={2} />
          </Link>
        </div>
      </div>

      {menuOpen && (
        <nav className="flex flex-col gap-4 border-t px-5 py-4 text-sm md:hidden">
          <button
            onClick={() => setShopOpen(!shopOpen)}
            className="flex items-center justify-between"
            aria-expanded={shopOpen}
          >
            Shop
            <ChevronDown
              size={16}
              className={`transition-transform ${
                shopOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {shopOpen && (
            <div className="ml-4 flex flex-col gap-3 border-l pl-4">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  onClick={closeMobileMenu}
                  className="text-gray-600 transition hover:text-black"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          )}

          <Link href="/on-sale" onClick={closeMobileMenu}>
            On Sale
          </Link>

          <Link href="/new-arrivals" onClick={closeMobileMenu}>
            New Arrivals
          </Link>

          <Link href="/brands" onClick={closeMobileMenu}>
            Brands
          </Link>
        </nav>
      )}
    </header>
  );
}