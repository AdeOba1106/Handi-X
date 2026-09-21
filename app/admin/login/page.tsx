"use client";

import { type FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    const supabase = createClient();

    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      setErrorMessage(loginError.message);
      setLoading(false);
      return;
    }

    const { data: isAdmin, error: adminError } =
      await supabase.rpc("is_admin");

    if (adminError || !isAdmin) {
      await supabase.auth.signOut();
      setErrorMessage("This account does not have admin access.");
      setLoading(false);
      return;
    }

    setSuccessMessage("Login successful. Redirecting...");

    router.replace("/admin");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f9f9f9] px-6 py-12 text-[#0b1020]">
      <div className="w-full max-w-md rounded-2xl border border-[#0b1020]/10 bg-white p-8 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#05cde5]">
          Handi-X Admin
        </p>

        <h1 className="mt-3 text-3xl font-bold">Admin Login</h1>

        <p className="mt-2 text-sm text-[#0b1020]/60">
          Sign in to manage your portfolio projects.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium">
              Email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              autoComplete="email"
              className="w-full rounded-lg border border-[#0b1020]/15 px-4 py-3 outline-none focus:border-[#05cde5]"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              autoComplete="current-password"
              className="w-full rounded-lg border border-[#0b1020]/15 px-4 py-3 outline-none focus:border-[#05cde5]"
              placeholder="Enter your password"
            />
          </div>

          {errorMessage && (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              {errorMessage}
            </p>
          )}

          {successMessage && (
            <p className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-600">
              {successMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#0b1020] px-4 py-3 font-medium text-white transition hover:bg-[#05cde5] hover:text-[#0b1020] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}