"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-[18px]"
      noValidate
    >
      <label className="flex flex-col gap-2">
        <span className="text-[12px] font-semibold tracking-[0.26em] text-gray2 uppercase">
          Email
        </span>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-2 border-line bg-surface-2 px-4 py-[14px] text-[16px] text-paper outline-none focus:border-accent"
        />
      </label>
      <label className="flex flex-col gap-2">
        <span className="text-[12px] font-semibold tracking-[0.26em] text-gray2 uppercase">
          Password
        </span>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-2 border-line bg-surface-2 px-4 py-[14px] text-[16px] text-paper outline-none focus:border-accent"
        />
      </label>
      {error && (
        <div className="text-[12px] tracking-[0.12em] text-accent uppercase">
          {error}
        </div>
      )}
      <button
        type="submit"
        disabled={loading}
        className="mt-2 cursor-pointer border-none bg-accent p-4 font-display text-[18px] tracking-[0.14em] text-ink uppercase hover:bg-paper disabled:opacity-60"
      >
        {loading ? "Signing In…" : "Sign In ↗"}
      </button>
      <div className="text-center text-[12px] tracking-[0.18em] text-gray2 uppercase">
        Protected by Supabase Auth
      </div>
    </form>
  );
}
