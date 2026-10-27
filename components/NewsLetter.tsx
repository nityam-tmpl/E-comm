"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email.trim()) {
      alert("Thank you for subscribing!");
      setEmail("");
    }
  };

  return (
    <section className="relative z-10 mx-auto mt-4 -mb-16 max-w-7xl px-5">
      <div className="flex flex-col justify-between gap-8 rounded-3xl bg-black px-6 py-8 text-white md:flex-row md:items-center md:px-16 md:py-10">
        <h2 className="max-w-lg font-league text-[32px] font-bold uppercase leading-[1.1] md:text-4xl md:leading-tight">
  STAY UPTO DATE ABOUT OUR LATEST OFFERS
</h2>

        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col gap-3 md:max-w-sm"
        >
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-full bg-white px-5 py-3 text-sm text-black outline-none"
          />

          <button
            type="submit"
            className="w-full rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-gray-200"
          >
            Subscribe to Newsletter
          </button>
        </form>
      </div>
    </section>
  );
}
