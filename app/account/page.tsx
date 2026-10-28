import { redirect } from "next/navigation";
import { connection } from "next/server";
import Link from "next/link";
import { UserRound, Mars, Venus, ShoppingBag, ShieldCheck } from "lucide-react";
import { createClient } from "../../lib/supabase/server";
import { logout } from "./action";
export const instant = false
export default async function AccountPage() {
  await connection();
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, gender")
    .eq("id", user.id)
    .maybeSingle();

  const fullName =
    profile?.full_name || user.user_metadata?.full_name || "Customer";

  const gender = profile?.gender || user.user_metadata?.gender || "";

  const initials = fullName
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part: string) => part[0])
    .join("")
    .toUpperCase();

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="mb-8">
        <p className="font-roboto text-sm text-gray-500">Home / My Account</p>

        <h1 className="mt-3 font-league text-3xl font-bold uppercase sm:text-4xl">
          My Account
        </h1>

        <p className="mt-2 font-roboto text-gray-600">
          Your personal space to manage your SHOP.CO account.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-[240px_1fr]">
        <aside className="h-fit rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
          <h2 className="font-league text-lg font-bold">MY ACCOUNT</h2>

          <nav className="mt-4 space-y-2">
            <Link
              href="/account"
              className="flex items-center gap-3 rounded-xl bg-black px-4 py-3 font-roboto text-sm font-medium text-white"
            >
              <UserRound size={18} />
              My Profile
            </Link>

            <Link
              href="/cart"
              className="flex items-center gap-3 rounded-xl px-4 py-3 font-roboto text-sm text-gray-700 transition hover:bg-gray-100"
            >
              <ShoppingBag size={18} />
              My Cart
            </Link>
          </nav>

          <div className="mt-6 rounded-xl bg-gray-50 p-4">
            <ShieldCheck size={22} className="text-gray-700" />
            <p className="mt-2 font-league font-semibold">Your account</p>
            <p className="mt-1 font-roboto text-xs leading-5 text-gray-500">
              Your profile information is linked to your account.
            </p>
          </div>
        </aside>

        <div className="space-y-6">
          <section className="relative isolate overflow-hidden rounded-3xl border border-gray-200 bg-gradient-to-br from-white via-gray-50 to-gray-200 p-5 shadow-lg sm:p-8">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-12 -top-16 -z-10 h-56 w-56 rounded-full bg-white/80 blur-3xl"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-20 -left-10 -z-10 h-48 w-48 rounded-full bg-gray-300/60 blur-3xl"
            />

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-white bg-black text-2xl font-bold text-white shadow-lg ring-4 ring-white/70">
                {initials || <UserRound size={32} />}
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-roboto text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                  Welcome to SHOP.CO
                </p>

                <h2 className="mt-1 break-words font-league text-2xl font-bold sm:text-3xl">
                  {fullName}
                </h2>

                <p className="mt-1 break-all font-roboto text-sm text-gray-600">
                  {user.email}
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white bg-white/80 px-3 py-1.5 font-roboto text-xs font-medium text-gray-700 shadow-sm">
                    <ShieldCheck size={14} />
                    Account holder
                  </span>

                  {gender && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white bg-white/80 px-3 py-1.5 font-roboto text-xs font-medium text-gray-700 shadow-sm">
                      {gender === "Male" ? (
                        <Mars size={14} />
                      ) : (
                        <Venus size={14} />
                      )}
                      {gender}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </section>

          <section className="relative isolate overflow-hidden rounded-3xl border border-gray-200 bg-gradient-to-br from-white via-gray-50 to-gray-100 p-5 shadow-md transition duration-300 hover:shadow-xl sm:p-8">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 -z-10 h-48 w-48 rounded-full bg-gray-200/70 blur-3xl"
            />

            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-roboto text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                  Your details
                </p>

                <h2 className="mt-2 font-league text-xl font-bold uppercase sm:text-2xl">
                  Personal Information
                </h2>

                <p className="mt-1 font-roboto text-sm text-gray-500">
                  Your registered account information.
                </p>
              </div>

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-black text-white shadow-md">
                <UserRound size={21} />
              </div>
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white bg-white/80 p-4 shadow-sm backdrop-blur-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <p className="font-roboto text-xs font-medium uppercase tracking-wider text-gray-500">
                  Full Name
                </p>

                <p className="mt-2 break-words font-roboto text-base font-semibold text-gray-900">
                  {fullName}
                </p>
              </div>

              <div className="rounded-2xl border border-white bg-white/80 p-4 shadow-sm backdrop-blur-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <p className="font-roboto text-xs font-medium uppercase tracking-wider text-gray-500">
                  Email Address
                </p>

                <p className="mt-2 break-all font-roboto text-base font-semibold text-gray-900">
                  {user.email}
                </p>
              </div>

              <div className="rounded-2xl border border-white bg-white/80 p-4 shadow-sm backdrop-blur-sm transition hover:-translate-y-0.5 hover:shadow-md sm:col-span-2">
                <p className="font-roboto text-xs font-medium uppercase tracking-wider text-gray-500">
                  Gender
                </p>

                <div className="mt-2 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
                    {gender === "Male" ? (
                      <Mars size={21} />
                    ) : gender === "Female" ? (
                      <Venus size={21} />
                    ) : (
                      <UserRound size={21} />
                    )}
                  </div>

                  <p className="font-roboto text-base font-semibold text-gray-900">
                    {gender || "Not provided"}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-gray-200 pt-6">
              <form action={logout}>
                <button
                  type="submit"
                  className="min-h-12 rounded-full bg-black px-8 py-3 font-roboto text-sm font-medium text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-gray-800 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Log Out
                </button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
