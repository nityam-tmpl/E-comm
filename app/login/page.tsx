
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "../../lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const supabase = createClient();

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setMessage("Login failed. Check your email and password.");
        return;
      }

      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error("Login error:", error);
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong during login."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative isolate flex min-h-[65svh] items-center justify-center overflow-hidden bg-black px-4 py-8 sm:min-h-[70svh] sm:px-6 sm:py-12">
      <video
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      >
        <source src="/videos/fashion.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 -z-10 bg-black/40" />

      <div className="relative z-10 w-full max-w-md rounded-2xl border border-white/30 bg-white/90 p-5 shadow-xl backdrop-blur-sm sm:p-8 md:p-10">
        <h1 className="font-league text-3xl font-bold uppercase leading-tight sm:text-4xl">
          Welcome Back
        </h1>

        <p className="mt-2 text-sm leading-6 text-gray-500 sm:text-base">
          Log in to your account to continue shopping.
        </p>

        <form
          onSubmit={handleLogin}
          className="mt-6 space-y-4 sm:mt-8 sm:space-y-5"
        >
          <div className="space-y-2">
            <label
              htmlFor="login-email"
              className="text-sm font-medium"
            >
              Email Address
            </label>

            <input
              id="login-email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
              className="min-h-12 w-full min-w-0 rounded-full border border-gray-300 bg-white px-4 py-3 text-base outline-none transition focus:border-black focus:ring-1 focus:ring-black sm:px-5"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="login-password"
              className="text-sm font-medium"
            >
              Password
            </label>

            <input
              id="login-password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              className="min-h-12 w-full min-w-0 rounded-full border border-gray-300 bg-white px-4 py-3 text-base outline-none transition focus:border-black focus:ring-1 focus:ring-black sm:px-5"
            />
          </div>

          {message && (
            <p
              role="alert"
              aria-live="polite"
              className="text-sm leading-5 text-red-600"
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="min-h-12 w-full rounded-full bg-black px-5 py-3 text-base font-medium text-white transition hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Logging In..." : "Log In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm leading-6 text-gray-600 sm:mt-8">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="inline-block min-h-8 font-semibold text-black underline underline-offset-4"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </main>
  );
}
