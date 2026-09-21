import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function AdminPage() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;

  if (!claims) {
    redirect("/admin/login");
  }

  const { data: isAdmin, error } = await supabase.rpc("is_admin");

  if (error || !isAdmin) {
    redirect("/admin/login");
  }

  return (
    <main className="min-h-screen bg-[#f9f9f9] px-6 py-12 text-[#0b1020]">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#05cde5]">
          Handi-X Admin
        </p>

        <h1 className="mt-3 text-4xl font-bold">Portfolio Dashboard</h1>

        <p className="mt-3 text-[#0b1020]/60">
          Your admin authentication is working correctly.
        </p>
      </div>
    </main>
  );
}