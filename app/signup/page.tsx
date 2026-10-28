
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mars, Venus } from "lucide-react";
import { createClient } from "../../lib/supabase/client";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState<"Male" | "Female" | "">("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setMessage("Password must be at least 8 characters long.");
      return;
    }

    if (!gender) {
      setMessage("Please select your gender.");
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            gender,
          },
          emailRedirectTo: `${window.location.origin}/login`,
        },
      });

      if (error) {
        setMessage(error.message);
        return;
      }

      await supabase.auth.signOut();
      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error("Signup error:", error);
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong during signup."
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
          Create an Account
        </h1>

        <p className="mt-2 font-roboto text-sm leading-6 text-gray-700 sm:text-base">
          Join us and find your style.
        </p>

        <form
          onSubmit={handleSignup}
          className="mt-6 space-y-4 sm:mt-8 sm:space-y-5"
        >
          <div className="space-y-2">
            <label htmlFor="signup-name" className="font-league text-sm font-medium">
              Full Name
            </label>
            <input
              id="signup-name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              required
              className="min-h-12 w-full rounded-full border border-gray-300 bg-white px-4 py-3 text-base outline-none transition focus:border-black focus:ring-1 focus:ring-black sm:px-5"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="signup-email" className="font-league text-sm font-medium">
              Email Address
            </label>
            <input
              id="signup-email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
              className="min-h-12 w-full rounded-full border border-gray-300 bg-white px-4 py-3 text-base outline-none transition focus:border-black focus:ring-1 focus:ring-black sm:px-5"
            />
          </div>

          <fieldset className="space-y-2">
            <legend className="font-league text-sm font-medium">
              Gender
            </legend>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                aria-pressed={gender === "Male"}
                onClick={() => setGender("Male")}
                className={`flex min-h-24 flex-col items-center justify-center gap-2 rounded-2xl border p-3 transition ${
                  gender === "Male"
                    ? "border-black bg-black text-white shadow-md"
                    : "border-gray-300 bg-white text-gray-700 hover:border-black hover:bg-gray-50"
                }`}
              >
                <Mars size={28} strokeWidth={1.8} />
                <span className="font-roboto text-sm font-medium">Male</span>
              </button>

              <button
                type="button"
                aria-pressed={gender === "Female"}
                onClick={() => setGender("Female")}
                className={`flex min-h-24 flex-col items-center justify-center gap-2 rounded-2xl border p-3 transition ${
                  gender === "Female"
                    ? "border-black bg-black text-white shadow-md"
                    : "border-gray-300 bg-white text-gray-700 hover:border-black hover:bg-gray-50"
                }`}
              >
                <Venus size={28} strokeWidth={1.8} />
                <span className="font-roboto text-sm font-medium">Female</span>
              </button>
            </div>
          </fieldset>

          <div className="space-y-2">
            <label htmlFor="signup-password" className="font-league text-sm font-medium">
              Password
            </label>
            <input
              id="signup-password"
              type="password"
              placeholder="Minimum 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              minLength={8}
              required
              className="min-h-12 w-full rounded-full border border-gray-300 bg-white px-4 py-3 text-base outline-none transition focus:border-black focus:ring-1 focus:ring-black sm:px-5"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="signup-confirm-password" className="font-league text-sm font-medium">
              Confirm Password
            </label>
            <input
              id="signup-confirm-password"
              type="password"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
              required
              className="min-h-12 w-full rounded-full border border-gray-300 bg-white px-4 py-3 text-base outline-none transition focus:border-black focus:ring-1 focus:ring-black sm:px-5"
            />
          </div>

          {message && (
            <p role="alert" aria-live="polite" className="text-sm leading-5 text-red-600">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="min-h-12 w-full rounded-full bg-black px-5 py-3 text-base font-medium text-white transition hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center font-roboto text-sm leading-6 text-gray-600 sm:mt-8">
          Already have an account?{" "}
          <Link href="/login" className="inline-block min-h-8 font-semibold text-black underline underline-offset-4">
            Log In
          </Link>
        </p>
      </div>
    </main>
  );
}
